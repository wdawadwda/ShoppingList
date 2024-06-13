from djoser.serializers import UserSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import BillModel

User = get_user_model()

class CustomUserSerializer(UserSerializer):
    # pass
    # user_theme = serializers.CharField(source='userprofile.user_theme', read_only=True)

    class Meta:
        model = User
        fields = ['email', 'is_staff', 'id', 'username', 'user_theme']

class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_theme']

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillModel
        fields = "__all__'"
