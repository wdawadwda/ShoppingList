from djoser.serializers import UserSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import BillModel, ProductsListDataModel, CustomProductModel

User = get_user_model()

class CustomUserSerializer(UserSerializer):

    class Meta:
        model = User
        fields = ['email', 'is_staff', 'id', 'username', 'user_theme', 'ready_to_accept_lists']

class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_theme']

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillModel
        fields = "__all__"

class ProductsListDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductsListDataModel
        fields = '__all__'

class CustomProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomProductModel
        fields = '__all__'
