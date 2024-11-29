# Django
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """
    User model: email, full_name, bio, experience, level
    """

    email = models.EmailField(unique=True, blank=False, null=False)
    full_name = models.CharField(max_length=100, null=False, blank=False)
    bio = models.CharField(max_length=200, null=True, blank=True)
    exp = models.IntegerField(null=False, default=0)
    level = models.IntegerField(null=False, default=1)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "password"]

    def is_valid(self):
        # Fields not present
        if (
            not self.full_name
            or not self.username
            or not self.email
            or not self.password
        ):
            return False

        # Fields too short
        if (
            len(self.email) == 0
            or len(self.username) == 0
            or len(self.full_name) == 0
            or len(self.password) < 8
        ):
            return False

        # Fields too long
        if len(self.username) > 150 or len(self.full_name) > 150:
            return False

        # Email already exists
        if len(User.objects.filter(email=self.email).all()) > 1:
            return False

        return True
