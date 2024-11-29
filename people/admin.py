from django.contrib import admin
from .models import *


@admin.register(Follower)
class FollowersAdmin(admin.ModelAdmin):
    list_display = ("follower", "followed")
    list_filter = ("followed", "follower")


@admin.register(SharedAction)
class SharedActionAdmin(admin.ModelAdmin):
    list_display = ("author", "action", "date")
    list_filter = ("author", "action", "date")
