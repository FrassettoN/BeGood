import datetime
import json
from datetime import datetime

from django.shortcuts import render
from django.utils.timezone import now

# Rest Framework
from rest_framework import status
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import APIView

# User Model and Serializer
from myaccount.models import User
from myaccount.serializers import UserSerializer, FollowingUserSerializer
from actions.models import Action
from actions.serializers import ActionSerializer
from actions.utils import calculate_time_passed

from actions.utils import actions_progress
from learn.utils import learn_progress

from .models import *
from .serializers import *


# GET PEOPLE
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_people(request):
    users = User.objects.all()
    users = users.exclude(username=request.user.username)
    serializer = FollowingUserSerializer(users, many=True)
    return Response(serializer.data)


# GET PERSON
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def visit_person(request, username):
    person = User.objects.filter(username=username).first()
    actions = actions_progress(person)
    lessons = learn_progress(person)
    following_rel = Follower.objects.filter(follower=request.user, followed=person)
    following = True if following_rel else False
    serializer = FollowingUserSerializer(person, many=False)
    data = {
        "info": serializer.data,
        "actions": actions,
        "lessons": lessons,
        "isFollowing": following,
    }
    return Response(data)


# GET FOLLOWING
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_following(request):
    users_followed = [
        follower_rel.followed for follower_rel in request.user.follower_rel.all()
    ]
    serializer = FollowingUserSerializer(users_followed, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_following(request):
    users_followed = [
        follower_rel.followed for follower_rel in request.user.follower_rel.all()
    ]

    serializer = FollowingUserSerializer(users_followed, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_feed(request):
    users_followed = [
        follower_rel.followed for follower_rel in request.user.follower_rel.all()
    ]
    data = []
    users_followed.append(request.user)
    for user in users_followed:
        for shared_action in SharedAction.objects.filter(author=user).all():

            # Delete Outdated Shared Actions
            time_passed = calculate_time_passed(shared_action.date, datetime.now())
            if time_passed["week"] >= 1:
                shared_action.delete()
                continue

            data.append(
                {
                    "author": shared_action.author.username,
                    "action": ActionSerializer(shared_action.action, many=False).data,
                    "datetime": shared_action.date,
                }
            )

    data = sorted(data, key=lambda d: d["datetime"], reverse=True)
    return Response(data)


# GET FOLLOWERS
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_followers(request):
    users_following = [
        followed_rel.follower for followed_rel in request.user.followed_rel.all()
    ]
    serializer = FollowingUserSerializer(users_following, many=True)
    return Response(serializer.data)


# SEARCH
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_person(request, query):
    searched_users = User.objects.filter(username__icontains=query).exclude(
        id=request.user.id
    )[:5]
    serializer = FollowingUserSerializer(searched_users, many=True)
    return Response(serializer.data)


# INTERACT WITH PERSON
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def interact_with_person(request, username, interaction):

    followed = User.objects.filter(username=username).first()

    if not followed:
        return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    user_follow = Follower.objects.filter(
        follower=request.user, followed=followed
    ).first()

    try:
        if interaction == "follow":
            if not user_follow:
                following = Follower.objects.create(
                    follower=request.user, followed=followed
                )
                following.save()
                serialized = FollowerSerializer(following, many=False)
                return Response(serialized.data)
            else:
                return Response(
                    {"detail": "Already following"},
                    status=status.HTTP_304_NOT_MODIFIED,
                )

        if interaction == "unfollow":
            if not user_follow:
                return Response(
                    {"detail": "Not following"},
                    status=status.HTTP_406_NOT_ACCEPTABLE,
                )
            else:
                user_follow.delete()
                return Response(
                    {"detail": "User unfollowed"}, status=status.HTTP_200_OK
                )

        else:
            return Response(
                {"detail": "Wrong interaction type"}, status=status.HTTP_400_BAD_REQUEST
            )
    # Stupid comment
    except:
        return Response(
            {"detail": "An error occurred while handling your request"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def share_content(request, content_type, id):
    try:
        if content_type == "action":
            action = Action.objects.filter(id=id).first()

            if not action:
                return Response(
                    {"detail": "Action not found"}, status=status.HTTP_404_NOT_FOUND
                )

            shared_action = SharedAction.objects.filter(
                author=request.user, action=action
            ).first()

            if shared_action:
                shared_action.date = now()
            else:
                shared_action = SharedAction.objects.create(
                    author=request.user, action=action
                )
            shared_action.save()
            return Response({"detail": "Action shared!"}, status=status.HTTP_200_OK)

    except:
        return Response(
            {"detail": "An error occurred while handling your request"},
            status=status.HTTP_400_BAD_REQUEST,
        )
