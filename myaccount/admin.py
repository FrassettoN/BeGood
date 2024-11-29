from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "full_name", "email", "is_active", "level", "exp")
    list_filter = ("level", "is_active", "last_login", "date_joined")
