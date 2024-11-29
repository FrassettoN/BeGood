from django.contrib import admin
from .models import *


@admin.register(SDG)
class SDGAdmin(admin.ModelAdmin):
    list_display = ("number", "title")
    ordering = ("number",)


@admin.register(Action)
class ActionAdmin(admin.ModelAdmin):
    list_display = ("title", "duration", "level")
    list_filter = ("duration", "level", "SDGs")


@admin.register(UserAction)
class UserActionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "action",
        "is_saved",
        "is_active",
        "is_automated",
        "completed_times",
    )
    list_filter = ("user", "action")
