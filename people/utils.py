from .models import *


def share_action(user_action):
    action_shared = ActionShared.objects.filter(
        user=user_action.user, action=user_action.action
    )
