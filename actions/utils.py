from .models import UserAction
from datetime import date, timedelta
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
