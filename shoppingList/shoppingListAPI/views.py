from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import CustomTokenObtainPairSerializer

User = get_user_model()

class CreateUserView(APIView):
    def post(self, request, format=None):
        data = request.data
        serializer = CustomTokenObtainPairSerializer(data=data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token = serializer.validated_data['access']
            return Response(data={'user_id': user.pk, 'token': token, 'status': 'success'}, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
