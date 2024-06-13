from djoser.conf import User
from djoser.serializers import UserSerializer
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, authenticate, get_user_model
from .forms import BillForm
from .models import BillModel
from .serializers import UserSettingsSerializer, BillSerializer, CustomUserSerializer

from django.contrib.auth.models import BaseUserManager

# User = get_user_model()

class CustomUserView(APIView):
    def get(self, request, *args, **kwargs):
        print("ME")
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        if not username:
            raise ValueError('Users must have a username')
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(username=username, email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save()
        # Создаем профиль пользователя и заполняем поле user_theme
        User.objects.create(user=user, user_theme='auto')
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if not username:
            raise ValueError('Users must have a username')
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(username=username, email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save()

class UserSettingsView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSettingsSerializer

class BillView(generics.ListCreateAPIView):
    queryset = BillModel.objects.all()
    serializer_class = BillSerializer

    def post(self, request, *args, **kwargs):
        form = BillForm(request.POST, request.FILES)
        print(request.data)
        if form.is_valid():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': "чек сохранен"})
        return Response({"message": "Не корректно заполнена форма"})

