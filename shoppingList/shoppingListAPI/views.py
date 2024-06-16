import os
from datetime import datetime, date, timedelta

import requests
from djoser.conf import User
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from shoppingList.settings import BASE_DIR
from OCR.tess_OCR import text_from_tesseract_ocr
from .forms import BillForm
from .models import BillModel
from .serializers import UserSettingsSerializer, BillSerializer, CustomUserSerializer
from django.contrib.auth.models import BaseUserManager

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
            text_OCR, file_path = self.get_text_from_photo(pic_name=form.files['bill'])
            self.delete_bill_pic(file_path)

            try:
                goods = self.ask_AI(text_OCR)
                return Response({'message': "чек принят", "AI": True, "goods": goods, 'text_OCR': text_OCR})
            except Exception as ex:
                return Response({'error': str(ex), 'message': "чек принят", "AI": False, "goods": text_OCR, 'text_OCR': text_OCR})
        return Response({"message": "Не корректно заполнена форма", "errors": form.errors})

    def get_text_from_photo(self, pic_name) -> [str, str]:
        file_path = f"{BASE_DIR}/media/{pic_name}"
        return text_from_tesseract_ocr(file_path=file_path), file_path


    def ask_AI(self, text_OCR) -> list:
        goods = []
        good = {}
        categories = ['barcode', 'product_name', 'unit', 'price', 'amount', 'cost']
        categories_float = ['price', 'amount', 'cost']

        ai_prompt = "Это некорректно распознанный OCR чек из магазина. Восстанови его и пришли в формате: штрих-код продукта; продукт; единица измерения; цена; количество; стоимость. Каждый следующий продукт с новой строки. Ответь без лишнего текста, только по сути. Вот текст, который нужно восстановить: "
        ai_text = ai_prompt + text_OCR

        response = requests.post(url="http://194.163.44.157/gpt_request", json={"request": ai_text, "tokens": 100})
        response = response.json()['answer']
        print(response)
        response = response.split("\n")
        for item in response:
            item = item.split("; ")
            for i in range(0, len(item)):
                if not item[i].startswith("'''"):
                    good[categories[i]] = item[i]
            goods.append(good)
            good = {}
        return goods

    def delete_bill_pic(self, file_path):
        if os.path.isfile(file_path):
            os.remove(file_path)
            print(f"Файл {file_path} удален")
        else:
            print(f"Файл {file_path} не найден")

class CustomBillTextView(generics.CreateAPIView, generics.ListAPIView):
    queryset = BillModel.objects.all()
    serializer_class = BillSerializer

class GetBillsHistoryView(generics.ListAPIView):
    queryset = BillModel.objects.all()
    serializer_class = BillSerializer

    def get(self, request, *args, **kwargs):

        params = {}
        if request.query_params.get('user'):
            params['user'] = request.query_params['user']
        if request.query_params.get('date_from'):
            date = self.normalize_date(request.query_params['date_from'])
            if not date['error']:
                params['date_from'] = date['date']
        if request.query_params.get('date_to'):
            date = self.normalize_date(request.query_params['date_to'])
            if not date['error']:
                params['date_to'] = date['date'] + timedelta(days=1)

        if params:
            bills = BillModel.objects.filter(date__range=(params['date_from'], params['date_to']), user=params['user'])
        else:
            bills = self.get_queryset()
        return self.list(bills, *args, **kwargs)

    def list(self, bills, *args, **kwargs):
        page = self.paginate_queryset(bills)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(bills, many=True)
        return Response(serializer.data)

    def normalize_date(self, date):
        formats = ['%Y-%m-%d %H:%M:%S.%f', '%Y-%m-%d', '%y-%m-%d', '%d-%m-%Y', '%d-%m-%y']
        for format in formats:
            try:
                return {'error': False, 'date': datetime.strptime(str(date), format)}
            except Exception as ex:
                print(ex)
        return {'error': ex, "date": None}



