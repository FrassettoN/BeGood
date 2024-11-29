# Create your models here.
from django.db import models
from myaccount.models import User
from datetime import date
import json


class SDG(models.Model):
    number = models.IntegerField(unique=True, primary_key=True, null=False, blank=False)
    title = models.CharField(unique=True, null=False, blank=False, max_length=39)

    def __str__(self):
        return f"{self.number} - {self.title}"


class Action(models.Model):

    DURATION_CHOICES = [
        ("day", "day"),
        ("week", "week"),
        ("month", "month"),
        ("year", "year"),
        ("once", "once"),
    ]

    LEVEL_CHOICES = [("easy", "easy"), ("medium", "medium"), ("hard", "hard")]

    title = models.CharField(max_length=25, null=False, blank=False, unique=True)
    caption = models.CharField(max_length=150, null=False, blank=False)
    duration = models.CharField(
        max_length=5, null=False, blank=False, choices=DURATION_CHOICES
    )
    SDGs = models.ManyToManyField(SDG)
    level = models.CharField(
        max_length=6, null=False, blank=False, choices=LEVEL_CHOICES
    )

    def __str__(self):
        return self.title

    def is_valid(self):
        if len(self.title) == 0 or len(self.caption) == 0:
            return False
        if len(self.title) > 25 or len(self.caption) > 150:
            return False
        return True


class UserAction(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    action = models.ForeignKey(to=Action, on_delete=models.CASCADE)
    is_saved = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_automated = models.BooleanField(default=False)
    last_activation = models.DateField(blank=False, null=False, default=date.today)
    completed_times = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.action.title}"

    def is_valid(self):
        if self.user not in User.objects.all():
            return False
        if self.action not in Action.objects.all():
            return False
        return True
