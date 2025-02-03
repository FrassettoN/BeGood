# Create your models here.
from django.db import models
from myaccount.models import User
from actions.models import Action
from django.utils.timezone import now


class Follower(models.Model):
    STATUS = [("accepted", "accepted"), ("pending", "pending"), ("refused", "refused")]

    follower = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="followed_rel"
    )
    followed = models.ForeignKey(
        to=User, on_delete=models.CASCADE, related_name="follower_rel"
    )

    def __str__(self):
        return f"{self.follower.username} -> {self.followed.username}"


class SharedAction(models.Model):
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    action = models.ForeignKey(to=Action, on_delete=models.CASCADE)
    date = models.DateTimeField(blank=False, null=False, default=now)

    def __str__(self):
        return f"{self.action.title} shared by {self.author.username} on {self.date}"
