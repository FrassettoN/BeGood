# Python
import re

# Django
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import update_last_login
from django.contrib.auth.hashers import make_password
from django.middleware import csrf

# Rest Framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError

# Simple JWT
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.settings import api_settings

# dj-rest-auth
from dj_rest_auth.views import LoginView, LogoutView, PasswordChangeView

# Files
from backend.settings import SIMPLE_JWT, DEBUG
from .serializers import UserSerializer
from .models import User

from .utils import (
    get_tokens_for_user,
    set_refresh_cookie,
    refresh_access,
    validate_username,
    validate_email,
    validate_full_name,
    validate_password,
    normalize_email,
)

from actions.utils import refresh_actions, actions_progress
from learn.utils import learn_progress
from actions.models import Action
from actions.serializers import ActionSerializer


@api_view(["GET"])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def get_user_profile(request):
#     actions = actions_progress(request.user)
#     lessons = learn_progress(request.user)
#     serialized = UserSerializer(request.user, many=False)
#     data = {"info": serialized.data, "actions": actions, "lessons": lessons}
#     return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user_info = UserSerializer(request.user, many=False).data
    actions = actions_progress(request.user)
    lessons = learn_progress(request.user)

    actions_created = Action.objects.filter(author=request.user).all()
    actions_created = ActionSerializer(actions_created, many=True).data

    data = {
        "info": user_info,
        "actions": actions,
        "lessons": lessons,
        "actionsCreated": actions_created,
    }
    return Response(data)


@permission_classes([AllowAny])
@api_view(["POST"])
def signup_user(request):
    data = request.data

    full_name = data.get("fullName")
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    privacy_policy = data.get("privacyPolicy", None)

    message = False

    # Validate
    if not privacy_policy:
        message = {"detail": "You have to accept the Privacy Policy to use our service"}

    is_username_valid = validate_username(username)
    if not is_username_valid:
        message = {"detail": is_username_valid}

    is_email_valid = validate_email(email, "signUp")
    if not is_email_valid:
        message = {"detail": is_email_valid}

    is_full_name_valid = validate_full_name(full_name)
    if not is_full_name_valid:
        message = {"detail": is_email_valid}

    is_password_valid = validate_password(password)
    if not is_password_valid:
        message = {"detail": is_password_valid}

    if message:
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create(
            full_name=full_name,
            username=username,
            email=normalize_email(email),
            password=make_password(password),
        )
        update_last_login(None, user)
    except Exception as e:
        print(e)
        message = {"detail": "User already exists"}

    if message:
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(user, many=False)
    data = {"message": "User created!"}
    return Response(data, status=status.HTTP_201_CREATED)


class CustomLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        csrf.get_token(request)

        request.data["username"] = normalize_email(request.data["email"])
        remember_me = request.data.get("rememberMe")
        try:
            response = super().post(request, *args, **kwargs)
        except ValidationError:
            data = {"detail": "Incorrect Email or Password"}
            return Response(data, status=status.HTTP_401_UNAUTHORIZED)

        user_data = response.data.get("user")
        if not user_data:
            data = {"detail": "Something went wrong :("}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(id=user_data.get("pk")).first()
        if not user.is_active:
            data = {"detail": "This account is not active!"}
            return Response(data, status=status.HTTP_404_NOT_FOUND)

        refresh_actions(user)
        user_tokens = get_tokens_for_user(user)

        if remember_me:
            set_refresh_cookie(response, user_tokens["refresh"])

        response.data["tokens"] = {
            "access": user_tokens["access"],
            "refresh": user_tokens["refresh"] if remember_me else "",
        }

        return response


class CustomLogoutView(LogoutView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        response.delete_cookie("refresh_token")
        return response


class CustomPasswordChangeView(PasswordChangeView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        csrf.get_token(request)
        return response


class RefreshLogin(APIView):
    def post(self, request):
        response = Response()
        refresh_cookie = request.COOKIES.get(SIMPLE_JWT["REFRESH_COOKIE"])

        if refresh_cookie is None:
            data = {"detail": "Refresh token not present"}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

        data = refresh_access(refresh_cookie)
        if api_settings.ROTATE_REFRESH_TOKENS and refresh_cookie:
            response = set_refresh_cookie(response, data["refresh"])

        update_last_login(None, request.user)
        refresh_actions(request.user)
        csrf.get_token(request)
        response.data = {"tokens": data}
        return response


@permission_classes([IsAuthenticated])
@api_view(["POST"])
def update_account_view(request, interaction):
    data = request.data
    user = request.user
    response = Response()
    message = False

    if interaction == "profile":
        full_name = data.get("fullName", None)
        email = data.get("email", None)
        username = data.get("username", None)
        bio = data.get("bio", None)

        # Validate
        is_full_name_valid = validate_full_name(full_name)
        if not is_full_name_valid:
            message = {"detail": is_full_name_valid}

        is_username_valid = validate_username(username)
        if not is_username_valid:
            message = {"detail": is_username_valid}

        is_email_valid = validate_email(email, "update")
        if not is_email_valid:
            message = {"detail": is_email_valid}

        try:
            user.full_name = full_name
            user.email = email
            user.username = username
            user.bio = bio
            user.save()
            data = {"message": "Profile Updated!"}
        except:
            message = {"detail": "Something went wrong. We are sorry"}

    if interaction == "password":
        old_password = data.get("oldPassword", None)
        new_password = data.get("newPassword", None)
        confirm_password = data.get("confirmPassword", None)

        # Validate

        authentication = authenticate(email=user, password=old_password)
        if not authentication:
            message = {"detail": "Wrong password"}

        else:
            if new_password != confirm_password:
                message = {"detail": "Password do not match"}
            else:
                try:
                    user.set_password(new_password)
                    user.save()
                    data = {"message": "Password Updated!"}
                except:
                    message = {"detail": "Something went wrong. We are sorry"}

    if interaction == "delete":
        password = data.get("password", None)

        # Validate
        authentication = authenticate(email=user, password=password)
        if not authentication:
            message = {"detail": "Wrong password"}
        else:
            try:
                response.delete_cookie("refresh_token")
                user.delete()
                response.data = {
                    "message": "Account Deleted. We are sorry to see you leaving, but thanks for your support!"
                }
                response.status = status.HTTP_202_ACCEPTED
                return response
            except:
                message = {"detail": "Something went wrong. We are sorry"}

    if message:
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    return Response(data, status=status.HTTP_202_ACCEPTED)
