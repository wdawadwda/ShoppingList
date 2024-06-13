from djoser.conf import User
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, authenticate

from .models import UserThemeModel
from .serializers import UserSettingsSerializer


from django.contrib.auth.models import BaseUserManager

# class UserManager(BaseUserManager):
#     def create_user(self, username, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', False)
#         extra_fields.setdefault('is_superuser', False)
#         if not username:
#             raise ValueError('Users must have a username')
#         if not email:
#             raise ValueError('Users must have an email address')
#         user = self.model(username=username, email=self.normalize_email(email), **extra_fields)
#         user.set_password(password)
#         user.save()
#         # Создаем профиль пользователя и заполняем поле user_theme
#         User.objects.create(user=user, user_theme='auto')
#         return user
#
#     def create_superuser(self, username, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         if not username:
#             raise ValueError('Users must have a username')
#         if not email:
#             raise ValueError('Users must have an email address')
#         user = self.model(username=username, email=self.normalize_email(email), **extra_fields)
#         user.set_password(password)
#         user.save()

class UserSettingsView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSettingsSerializer
