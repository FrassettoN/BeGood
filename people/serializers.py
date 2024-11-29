from rest_framework import serializers
from .models import *


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = "__all__"


class SharedActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedAction
        fields = "__all__"
