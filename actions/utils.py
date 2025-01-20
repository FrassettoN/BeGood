from .models import UserAction, Action, SDG
from datetime import date, timedelta
from django.core.exceptions import ValidationError
import math

LEVEL_EXP = 100


def give_user_exp(user_action):
    user = user_action.user
    difficulty = user_action.action.level
    duration = user_action.action.duration
    difficulty_to_exp = {
        "easy": 10,
        "medium": 25,
        "hard": 50,
    }

    exp = difficulty_to_exp.get(difficulty, 0)
    exp *= durations_to_days(duration)

    # Update experience
    user.exp += exp

    # Update Level
    while user.exp / (user.level * LEVEL_EXP) >= 1:
        user.exp -= user.level * LEVEL_EXP
        user.level += 1

    user.save()


def durations_to_days(duration):
    duration_mapping = {
        "day": 1,
        "week": 7,
        "month": 30,
        "year": 365,
    }
    return duration_mapping.get(duration, 0)


def calculate_time_passed(date_1, date_2):
    date_1 = date(date_1.year, date_1.month, date_1.day)
    date_2 = date(date_2.year, date_2.month, date_2.day)
    time_passed = {}
    time_passed["year"] = date_2.year - date_1.year
    time_passed["month"] = time_passed["year"] * 12 + (date_2.month - date_1.month)
    time_passed["day"] = (date_2 - date_1).days

    # Code taken (but understood) from https://stackoverflow.com/questions/14191832/how-to-calculate-difference-between-two-dates-in-weeks-in-python
    monday_1 = date_1 - timedelta(date_1.weekday())
    monday_2 = date_2 - timedelta(date_2.weekday())
    time_passed["week"] = int((monday_2 - monday_1).days / 7)

    return time_passed


def refresh_actions(user):
    user_actions = UserAction.objects.filter(user=user, is_saved=True).all()

    for user_action in user_actions:
        action = user_action.action
        action_days = durations_to_days(action.duration)
        time_passed = calculate_time_passed(user_action.last_activation, date.today())
        if time_passed[action.duration] >= 1:
            user_action.is_active = True

            # Automated Action
            if user_action.is_automated:
                for time in range(time_passed[action.duration]):
                    user_action.completed_times += 1
                    give_user_exp(user_action)
                user_action.is_active = False

            user_action.last_activation = date.today()
            user_action.save()


# Create a list to summarize user's progress with actions and SDGs (completed times)
# The first element of the list is the total number of actions completed
# Each list's index mathes the corrisponding SDG
def actions_progress(user):
    # Initialize variables
    total_actions = 0
    sdgs_progress = [0 for num in range(0, 18)]

    user_actions = UserAction.objects.filter(user=user).all()

    for user_action in user_actions:
        total_actions += user_action.completed_times
        SDGs = user_action.action.SDGs.all()
        for SDG in SDGs:
            sdgs_progress[SDG.number] += user_action.completed_times

    sdgs_progress[0] = total_actions
    return sdgs_progress


def validate_action(data):
    errors = []

    title = data.get("title")
    if not title:
        errors.append("Title is required")
    elif len(title) > 25:
        errors.append("Max length for title is 25 characters")
    elif Action.objects.filter(title=title).exists():
        errors.append("An Action with this title already exists!")

    caption = data.get("caption")
    if not caption:
        errors.append("Caption is required")
    elif len(caption) > 150:
        errors.append("Max length for caption is 150 characters")

    description = data.get("description")
    if not description:
        errors.append("Description is required")

    SDGs_numbers = data.get("SDGs")
    SDGs = []
    if not isinstance(SDGs_numbers, list):
        errors.append("SDGs must be a list of numbers.")
    else:
        for SDG_number in SDGs_numbers:
            if not (
                isinstance(SDG_number, int)
                or (isinstance(SDG_number, str) and SDG_number.isdigit())
            ):
                errors.append(f"{SDG_number} is not a valid SDG ID.")
            elif not SDG.objects.filter(number=SDG_number).exists():
                errors.append(f"SDG with ID {SDG_number} does not exist.")
            else:
                SDGs.append(SDG.objects.get(number=SDG_number))

    duration = data.get("duration")
    if not duration:
        errors.append("Duration is required")
    else:
        valid_duration_choices = [choice[0] for choice in Action.DURATION_CHOICES]
        if duration not in valid_duration_choices:
            errors.append(f"{duration} is not a valid duration choice.")

    level = data.get("level")
    if not level:
        errors.append("Level is required")
    else:
        valid_level_choices = [choice[0] for choice in Action.LEVEL_CHOICES]
        if level not in valid_level_choices:
            errors.append(f"{level} is not a valid level choice.")

    if errors:
        raise ValidationError(errors)

    action = {
        "title": title,
        "caption": caption,
        "description": description,
        "SDGs": SDGs,
        "duration": duration,
        "level": level,
    }
    return action
