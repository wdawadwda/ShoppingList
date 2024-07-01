import os
import re
from datetime import datetime, date, timedelta

import requests
from django.shortcuts import get_object_or_404
from djoser.conf import User
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from OCR.get_most_valid_text import text_recognize
from shoppingList.settings import BASE_DIR
from OCR.tess_OCR import text_from_tesseract_ocr
from .forms import BillForm
from .models import BillModel, ProductsListDataModel, CustomProductModel
from .serializers import UserSettingsSerializer, BillSerializer, CustomUserSerializer, ProductsListDataSerializer, \
    CustomProductSerializer
from django.contrib.auth.models import BaseUserManager
from django.conf import settings

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
            self.save_file(request=request)
            text_OCR, file_path = self.get_text_from_photo(pic_name=form.files['bill'])
            self.delete_bill_pic(file_path)

            try:
                goods, error = self.ask_AI(text_OCR)
                return Response({"error": error, 'message': "чек принят", "AI": True, "goods": goods})
            except Exception as ex:
                return Response({'error': str(ex), 'message': "чек принят", "AI": False, "goods": text_OCR})
        return Response({"error": form.errors, "message": "Не корректно заполнена форма"})

    def save_file(self, request):
        file = request.FILES['bill']
        file_path = os.path.join(settings.MEDIA_ROOT, file.name)
        with open(file_path, 'wb+') as f:
            for chunk in file.chunks():
                f.write(chunk)
        return file_path


    def get_text_from_photo(self, pic_name) -> [str, str]:
        file_path = f"{BASE_DIR}/media/{pic_name}"
        # return text_from_tesseract_ocr(file_path=file_path), file_path
        return text_recognize(file_path=file_path), file_path


    def ask_AI(self, text_OCR) -> [list, dict]:
        incorrect_picture_status = "некорректная картинка"

        goods = []
        good = {}
        categories = ['barcode', 'product_name', 'unit', 'price', 'amount', 'cost']
        categories_float = ['price', 'amount', 'cost']

        ai_prompt = f"Это некорректно распознанный OCR чек из магазина. Восстанови его и пришли в формате: штрих-код продукта; продукт; единица измерения; цена; количество; стоимость. Каждый следующий продукт с новой строки. Ответь без лишнего текста, только по сути. Если текст невозможно восстановить, выдай ответ: {incorrect_picture_status}. Вот текст, который нужно восстановить: "
        ai_text = ai_prompt + text_OCR

        response = requests.post(url="http://194.163.44.157/gpt_request", json={"request": ai_text, "tokens": 500})
        response = response.json()['answer']
        print(response)
        if re.findall(r'некорректная[\s]{0,}картинка', response):
            return [], incorrect_picture_status
        response = response.split("\n")
        for item in response:
            item = item.split("; ")
            for i in range(0, len(item)):
                if not item[i].startswith("'''"):
                    good[categories[i]] = item[i]
            goods.append(good)
            good = {}
        return goods, False

    def delete_bill_pic(self, file_path):
        if os.path.isfile(file_path):
            os.remove(file_path)
            print(f"Файл {file_path} удален")
        else:
            print(f"Файл {file_path} не найден")

class CustomBillTextView(generics.CreateAPIView, generics.ListAPIView):
    queryset = BillModel.objects.all()
    serializer_class = BillSerializer

class GetBillsHistoryView(generics.ListAPIView, generics.DestroyAPIView):
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
        elif kwargs.get('pk'):
            bills = BillModel.objects.filter(id=int(kwargs['pk']))
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

class TestSendBillView(generics.CreateAPIView):
    queryset = BillModel.objects.all()
    serializer_class = BillSerializer

"""
1. нужен эндпоинт на получение всех списков и конкретного по id

2. сделать возможность передачи другому пользователю
если список передан изначальный хозяин не может вносить изменения, но может отозвать
и тогда у 2 пользователя, теряется возможность вносить изменения и видеть список
т.е. нужно как-то обозначать кто может его редактировать в текущий момент

"""

class CustomProductView(generics.CreateAPIView, generics.DestroyAPIView, generics.UpdateAPIView,
                           generics.ListCreateAPIView):
    queryset = CustomProductModel.objects.all()
    serializer_class = CustomProductSerializer

    def get(self, request, *args, **kwargs):
        if kwargs.get('pk'):
            try:
                object = CustomProductModel.objects.get(id=kwargs['pk'])
                object = self.get_serializer(object)
                return Response(object.data)
            except Exception as ex:
                return Response({'error': True, 'details': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return self.list(request, *args, **kwargs)

class ProductsListDataView(generics.CreateAPIView, generics.DestroyAPIView, generics.UpdateAPIView,
                           generics.ListCreateAPIView):
    queryset = ProductsListDataModel.objects.all()
    serializer_class = ProductsListDataSerializer

    def get(self, request, *args, **kwargs):
        if kwargs.get('pk'):
            try:
                object = ProductsListDataModel.objects.get(id=kwargs['pk'])
                object = self.get_serializer(object)
                return Response(object.data)
            except Exception as ex:
                return Response({'error': True, 'details': str(ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        elif request.query_params.get('user_id'):
            user_id = request.query_params['user_id']
            objects = ProductsListDataModel.objects.filter(owner_id=user_id)

            page = self.paginate_queryset(objects)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = self.get_serializer(objects, many=True)
            return Response(serializer.data)

        else:
            return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        request_data = request.data
        checking_queryset = ProductsListDataModel.objects.filter(name=request_data['name'], owner_id=request_data['owner_id'])
        if not list(checking_queryset.values()):
            return self.create(request, *args, **kwargs)
        else:
            return Response({'details': 'products list data model with this name already exists'})
