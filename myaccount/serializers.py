from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "full_name", "email", "level", "exp", "bio"]


class FollowingUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "level", "exp", "bio"]
