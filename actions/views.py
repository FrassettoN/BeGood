from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from .serializers import ActionSerializer
from .models import Action, UserAction, SDG
from myaccount.models import User
from learn.models import Course, Topic, Lesson
from .utils import give_user_exp, validate_action
from datetime import date, timedelta, datetime
from django.db import IntegrityError, transaction
from django.db.models import Q
from django.http import Http404
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404


import os
import json


@api_view(["GET"])
def fill_database(request):
    with open("./data/sdgs.json", "r") as file:
        sdgs_data = json.load(file)

    for sdg in sdgs_data:
        try:
            SDG.objects.create(number=sdg["number"], title=sdg["title"])
        except IntegrityError:
            print(f"{sdg['number']} already present")

    with open("./data/actions.json", "r") as file:
        actions_data = json.load(file)

    for action in actions_data:
        try:
            action_db = Action.objects.create(
                title=action["title"],
                caption=action["caption"],
                duration=action["duration"],
                level=action["level"],
            )
            action_db.SDGs.set(SDG.objects.filter(number__in=action["SDGs"]))

        except IntegrityError as e:
            print(f"{action['title']} already present")

    with open("./data/courses.json", "r") as file:
        courses_data = json.load(file)

    for course in courses_data:
        try:
            course_db = Course.objects.create(
                number=course["number"],
                title=course["title"],
                caption=course["caption"],
                description=course["description"],
                SDG=SDG.objects.filter(number=course["SDG"]).first(),
            )
        except IntegrityError as e:
            print(str(e))
            print(f"{course['title']} already present")

    with open("./data/topics.json", "r") as file:
        topics_data = json.load(file)

    for topic in topics_data:
        try:
            topic_db = Topic.objects.create(
                title=topic["title"],
                description=topic["description"],
                caption=topic["caption"],
                number=topic["number"],
                course=Course.objects.filter(number=topic["course"]).first(),
            )
        except IntegrityError as e:
            print(str(e))
            print(f"{topic['title']} already present")

    with open("./data/lessons.json", "r") as file:
        lessons_data = json.load(file)

    for lesson in lessons_data:
        try:
            lesson_db = Lesson.objects.create(
                title=lesson["title"],
                description=lesson["description"],
                resource_type=lesson["resource_type"],
                link=lesson["link"],
                number=lesson["number"],
                topic=Topic.objects.filter(number=lesson["topic"]).first(),
            )
        except IntegrityError as e:
            print(str(e))
            print(f"{lesson['title']} already present")

    return Response("All right")


# Create your views here.
@api_view(["GET"])
def get_action(request, id):
    try:
        action = get_object_or_404(Action, id=id)
        serialized = ActionSerializer(action, many=False)
        return Response(serialized.data)
    except Http404:
        return Response(
            {"detail": "Action not found!"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_saved_actions(request):
    user_actions = UserAction.objects.filter(user=request.user, is_saved=True).all()
    # Take actions from relation
    actions = []
    for user_action in user_actions:
        action = user_action.action
        actions.append(action)

    serialized = ActionSerializer(actions, many=True)
    return Response(serialized.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_ongoing_actions(request):
    user_actions = UserAction.objects.filter(
        user=request.user, is_active=True, is_saved=True
    ).all()
    # Take actions from relation
    actions = []
    for user_action in user_actions:
        action = user_action.action
        actions.append(action)

    serialized = ActionSerializer(actions, many=True)
    return Response(serialized.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_automated_actions(request):
    user_actions = UserAction.objects.filter(
        user=request.user, is_active=False, is_saved=True, is_automated=True
    ).all()
    # Take actions from relation
    actions = []
    for user_action in user_actions:
        action = user_action.action
        actions.append(action)

    serialized = ActionSerializer(actions, many=True)
    return Response(serialized.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_new_actions(request):
    user_actions = UserAction.objects.filter(
        user=request.user, is_saved=True
    ).values_list("action_id", flat=True)
    followed = list(request.user.followed_rel.values_list("followed_id", flat=True))
    followed.append(request.user.id)

    actions = Action.objects.filter(Q(public=True) | Q(author_id__in=followed)).exclude(
        id__in=user_actions
    )

    serialized = ActionSerializer(actions, many=True)
    return Response(serialized.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def interact_with_action(request, id, interaction):
    action = Action.objects.filter(id=id).first()

    if not action:
        return Response(
            {"detail": "Action not found"}, status=status.HTTP_404_NOT_FOUND
        )

    user_action = UserAction.objects.filter(user=request.user, action=action).first()

    duration = action.duration
    days = (
        1
        if duration == "day"
        else 7 if duration == "week" else 30 if duration == "month" else 365
    )

    try:
        if interaction == "save":
            if user_action:
                user_action.is_saved = True
                user_action.is_active = True
            else:
                user_action = UserAction.objects.create(
                    user=request.user, action=action, is_saved=True
                )

        elif interaction == "remove":
            user_action.is_saved = False
            user_action.is_active = False
            user_action.is_automated = False

        elif interaction == "complete":
            user_action.completed_times += 1
            user_action.is_active = False
            give_user_exp(user_action)

        elif interaction == "failed":
            user_action.is_active = False
            user_action.user.exp -= 25

        elif interaction == "automate":
            if user_action.is_automated:
                user_action.is_automated = False
            else:
                # Complete the action
                user_action.completed_times += 1
                user_action.is_active = False
                give_user_exp(user_action)
                user_action.is_automated = True

        else:
            return Response(
                {"detail": "Wrong interaction type"}, status=status.HTTP_400_BAD_REQUEST
            )

        user_action.save()
    except:
        return Response(
            {"detail": "An error occurred while handling your request"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    serialized = ActionSerializer(action, many=False)
    return Response(serialized.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_action(request):
    data = request.data["details"]
    user = request.user

    try:
        action = validate_action(data)
        new_action = Action.objects.create(
            author=user,
            title=action["title"],
            caption=action["caption"],
            description=action["description"],
            level=action["level"],
            duration=action["duration"],
        )
        new_action.SDGs.set(action["SDGs"])
        new_action.save()
        serialized = ActionSerializer(action, many=False)
        return Response(serialized.data)
    except ValidationError as e:
        return Response({"details": e}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def modify_action(request, id):
    data = request.data["details"]
    user = request.user
    action = get_object_or_404(Action, id=id)

    if action.author != user:
        return Response(
            {"details": "You are not the author of this action!"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    try:
        modified_action = validate_action(data, exclude_id=id)

        with transaction.atomic():
            # Update action fields
            action.title = modified_action["title"]
            action.caption = modified_action["caption"]
            action.description = modified_action["description"]
            action.level = modified_action["level"]
            action.duration = modified_action["duration"]

            # Update SDGs only if they've changed
            # Use number field instead of id for SDGs
            current_sdgs = set(action.SDGs.values_list("number", flat=True))
            new_sdgs = set(modified_action["SDGs"])

            if current_sdgs != new_sdgs:
                action.SDGs.set(modified_action["SDGs"])

            action.save()

        serialized = ActionSerializer(action, many=False)
        return Response(serialized.data)
    except ValidationError as e:
        print(e)
        return Response({"details": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return Response(
            {"details": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])  # Changed from GET to DELETE for proper RESTful design
@permission_classes([IsAuthenticated])
def delete_action(request, id):
    """
    Delete an action. Only the author of the action can delete it.
    """
    action = get_object_or_404(Action, id=id)
    user = request.user

    # Check if the user is the author of the action
    if action.author != user:
        return Response(
            {"details": "You are not the author of this action!"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    try:
        # Delete related UserAction records first to maintain referential integrity
        UserAction.objects.filter(action=action).delete()

        # Now delete the action
        action.delete()

        return Response(
            {"details": "Action deleted successfully"}, status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {"details": f"An error occurred while deleting the action: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_actions_by_author(request, username):
    author = get_object_or_404(User, username=username)
    actions = Action.objects.filter(author=author).all()
    serialized = ActionSerializer(actions, many=True)
    return Response(serialized.data)
