from rest_framework import serializers
from .models import *


class ActionSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Action
        fields = "__all__"
        extra_fields = ["author_name"]

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(ActionSerializer, self).get_field_names(
            declared_fields, info
        )
        if hasattr(self.Meta, "extra_fields"):
            expanded_fields.extend(self.Meta.extra_fields)
        return expanded_fields
