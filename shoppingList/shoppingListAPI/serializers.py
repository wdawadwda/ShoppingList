from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import UserThemeModel

User = get_user_model()


class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_theme']