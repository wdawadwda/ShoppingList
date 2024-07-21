from djoser.views import UserViewSet as DjoserUserCreateView
from rest_framework import status
from rest_framework.response import Response
from shoppingListAPI.serializers import CustomUserCreateSerializer


class UserCreateView(DjoserUserCreateView):
    serializer_class = CustomUserCreateSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer, *args, **kwargs):
        user = serializer.save()
        return user