import re
from backend.settings import SIMPLE_JWT
from rest_framework_simplejwt.serializers import RefreshToken
from .models import User
from actions.models import UserAction, Action
from datetime import date
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.settings import api_settings


def refresh_access(refresh_cookie):
    """
    Refresh user's access by creating a new access token from refresh cookie.
    """
    try:
        if refresh_cookie is None:
            raise ValueError

        refresh = RefreshToken(refresh_cookie)
        data = {"access": str(refresh.access_token)}

        if api_settings.ROTATE_REFRESH_TOKENS:
            if api_settings.BLACKLIST_AFTER_ROTATION:
                try:
                    # Attempt to blacklist the given refresh token
                    refresh_cookie.blacklist()
                except AttributeError:
                    # If blacklist app not installed, `blacklist` method will
                    # not be present
                    pass

                refresh.set_jti()
                refresh.set_exp()

            data["refresh"] = str(refresh)

        return data

    except ValueError:
        return None


def set_refresh_cookie(response, value):
    expires = int(SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds())
    response.set_cookie(
        key=SIMPLE_JWT["REFRESH_COOKIE"],
        value=value,
        expires=expires,
        secure=SIMPLE_JWT["REFRESH_COOKIE_SECURE"],
        httponly=SIMPLE_JWT["REFRESH_COOKIE_HTTP_ONLY"],
        samesite=SIMPLE_JWT["REFRESH_COOKIE_SAMESITE"],
    )

    return response


def get_tokens_for_user(user):
    """Get user's refresh and access cookies and return them in a dict."""
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


email_regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"


def validate_username(username):
    if not username or len(username) == 0 or len(username) > 150:
        return "Invalid Username"

    if re.match(email_regex, username):
        return "Username can't be an email"

    return True


def validate_email(email, purpose):
    if (
        not email
        or len(email) == 0
        or len(email) > 150
        or not re.match(email_regex, email)
    ):
        return "Invalid Email"

    users_using_email = User.objects.filter(email=email).all()
    if purpose == "signUp" and len(users_using_email) > 0:
        return "A user with this email already exists"
    if purpose == "update" and len(users_using_email) > 1:
        return "A user with this email already exists"

    return True


def validate_full_name(full_name):
    if not full_name or len(full_name) == 0 or len(full_name) > 150:
        return "Invalid Full Name"

    return True


def validate_password(password):
    if not password:
        return "Invalid password"

    if len(password) < 8:
        return "Password too short"

    return True


def normalize_email(email):
    """
    Normalize email by lowering it and deleting white spaces.
    (django.contrib.auth.base_user BaseUserManager normalize_email() lowers
    only email domain)
    """
    try:
        return email.lower().strip()
    except AttributeError:
        return None
