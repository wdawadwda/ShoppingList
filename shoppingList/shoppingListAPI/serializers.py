from django.contrib.auth.password_validation import validate_password
from djoser.serializers import UserSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from rest_framework.settings import api_settings
from django.core import exceptions as django_exceptions
from djoser.conf import settings

from .models import CustomUser

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

# class CustomUserCreateSerializer(BaseUserCreateSerializer):
#     password = serializers.CharField(style={"input_type": "password"}, write_only=True)
#
#     default_error_messages = {
#         "cannot_create_user": settings.CONSTANTS.messages.CANNOT_CREATE_USER_ERROR
#     }
#
#     class Meta:
#         model = CustomUser
#         fields = tuple(User.REQUIRED_FIELDS) + (
#             settings.LOGIN_FIELD,
#             settings.USER_ID_FIELD,
#             "password",
#         )
#
#     def validate(self, attrs):
#         user = User(**attrs)
#         password = attrs.get("password")
#
#         try:
#             validate_password(password, user)
#         except django_exceptions.ValidationError as e:
#             serializer_error = serializers.as_serializer_error(e)
#             raise serializers.ValidationError(
#                 {"password": serializer_error[api_settings.NON_FIELD_ERRORS_KEY]}
#             )
#         return attrs
#
#     def validate_username(self, value):
#         if User.objects.filter(username=value).exists():
#             raise serializers.ValidationError({
#                 "en": "A user with that username already exists.",
#                 "ru": "Пользователь с таким username уже существует"
#             })
#         return value
#
#     def validate_email(self, value):
#
#         if User.objects.filter(email=value).exists():
#             raise serializers.ValidationError({
#                 "en": "user with this email already exists.",
#                 "ru": "Пользователь с таким email уже существует"
#             })
#         return value

from djoser.serializers import UserCreateSerializer as DjoserUserCreateSerializer

class CustomUserCreateSerializer(DjoserUserCreateSerializer):
    pass
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Пользователь с таким email уже существует.")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Пользователь с таким именем уже существует.")
        return value
