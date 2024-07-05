import os
import re
from datetime import datetime, date, timedelta
from django.db.models import Q

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

class CustomProductView(generics.CreateAPIView, generics.DestroyAPIView, generics.UpdateAPIView, generics.ListCreateAPIView):
    queryset = CustomProductModel.objects.all()
    serializer_class = CustomProductSerializer

    def get(self, request, *args, **kwargs):
        user = request.query_params['user']
        serializer_data = []
        if kwargs.get('pk'):
            try:
                try:
                    object = CustomProductModel.objects.get(id=kwargs['pk'], user=user)
                except:
                    return Response([])
                object = self.get_serializer(object)
                object = self.transform_data(from_db=object.data) if object.data else []
                return Response(object)
            except Exception as ex:
                return Response({'error': True, 'details': {'ru': str(ex), 'en': str(ex)}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            queryset = CustomProductModel.objects.filter(user=user)
            serializer = self.get_serializer(queryset, many=True)
            for item in range(len(serializer.data)):
                serializer_data.append(self.transform_data(from_db=serializer.data[item]))
            return Response(serializer_data)

    def post(self, request, *args, **kwargs):
        data = request.data
        if not self.check_exists(name=data['name'], user=data['user']):
            data_to_db = self.transform_data(to_db=data)
            serializer = self.get_serializer(data=data_to_db)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            data_from_db = self.transform_data(from_db=serializer.data)
            return Response(data_from_db, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response(
                {
                'error': True,
                'details' :{
                    'en': 'This list name exists already',
                    'ru': 'Список с таким именем уже существует'
                }
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, *args, **kwargs):
        queryset = CustomProductModel.objects.filter(id=kwargs['pk'], user=request.query_params['user'])
        return self.destroy(request, *args, **kwargs) if queryset else error_does_not_have_a_record()

    def put(self, request, *args, **kwargs):
        queryset = CustomProductModel.objects.filter(id=kwargs['pk'], user=request.query_params['user'])
        return self.update(request, *args, **kwargs) if queryset else error_does_not_have_a_record()

    def update(self, request, *args, **kwargs):
        request_data = self.transform_data(to_db=request.data)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request_data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}
        serializer_data = self.transform_data(from_db=serializer.data)
        return Response(serializer_data)

    def patch(self, request, *args, **kwargs):
        queryset = CustomProductModel.objects.filter(id=kwargs['pk'], user=request.query_params['user'])

        return self.partial_update(request, *args, **kwargs) if queryset else error_does_not_have_a_record()

    def transform_data(self, *args, **kwargs):
        if kwargs.get('to_db'):
            data = kwargs['to_db']
            data_to_db = {}
            for key, item in data.items():
                if type(item) == dict:
                    for subkey, subitem in data[key].items():
                        data_to_db[f"{key}_{subkey}"] = subitem
                else:
                    data_to_db[key] = item
            return data_to_db
        elif kwargs.get('from_db'):
            data = kwargs['from_db']
            data_from_db = {}
            for key, item in data.items():
                if '_en' in key or '_ru' in key:
                    main_key = key.split("_")[0]
                    if not data_from_db.get(main_key):
                        data_from_db[main_key] = {}
                    data_from_db[main_key][key.split("_")[1]] = item
                else:
                    data_from_db[key] = item
            return data_from_db
    
    def check_exists(self, name, user):
        exists = {}
        if name.get('ru'):
            exists['ru'] = True if list(CustomProductModel.objects.filter(name_ru=name['ru'], user=user).values()) else False
        if name.get('en'):
            exists['en'] = True if list(CustomProductModel.objects.filter(name_en=name['en'], user=user).values()) else False
        return True if exists['ru'] or exists['en'] else False

class ProductsListDataView(generics.CreateAPIView, generics.DestroyAPIView, generics.UpdateAPIView, generics.ListCreateAPIView):
    queryset = ProductsListDataModel.objects.all()
    serializer_class = ProductsListDataSerializer

    def get(self, request, *args, **kwargs):
        if kwargs.get('pk'):
            user = request.query_params['user']
            try:
                try:
                    object_owner = ProductsListDataModel.objects.get(id=kwargs['pk'], owner_id=user)
                    object_owner = self.get_serializer(object_owner).data
                except:
                    object_owner = []
                try:
                    object_shared = ProductsListDataModel.objects.get(id=kwargs['pk'], shared_with_id=user)
                    object_shared = self.get_serializer(object_shared).data
                except:
                    object_shared = []

                return Response({'error': False, 'owner': object_owner, 'shared': object_shared}) if object_shared or object_owner else Response(
                    {
                        'error': True,
                        'details': {
                            'ru': 'У этого пользователя нет записи с этим id',
                            'en': 'The user does not have a record with this ID'
                        }
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            except Exception as ex:
                return Response(
                    {
                        'error': True,
                        'details': {
                            'ru': str(ex),
                            'en': str(ex)
                        }
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )


        elif request.query_params.get('user'):
            user = request.query_params['user']
            objects_owner = ProductsListDataModel.objects.filter(owner_id=user)
            objects_owner = self.get_serializer(objects_owner, many=True)
            objects_shared = ProductsListDataModel.objects.filter(shared_with_id=user)
            objects_shared = self.get_serializer(objects_shared, many=True)
            return Response({'owner': objects_owner.data, 'shared': objects_shared.data})

        else:
            return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        request_data = request.data
        checking_queryset = ProductsListDataModel.objects.filter(name=request_data['name'], owner_id=request_data['owner_id'])
        if not list(checking_queryset.values()):
            return self.create(request, *args, **kwargs)
        else:
            # return Response({'details': 'products list data model with this name already exists'})
            return error_builder(ru_en_dict={'ru': 'Список с этим именем уже существует', 'en': 'Products list data model with this name already exists'})

    def patch(self, request, *args, **kwargs):
        user = int(request.query_params['user'])
        request.data['updated_at'] = datetime.now()
        try:
            queryset = ProductsListDataModel.objects.get(id=kwargs['pk'])
        except:
            return error_does_not_have_a_record()
        return self.update_common(queryset, user, request, method='patch', *args, **kwargs)

    def put(self, request, *args, **kwargs):
        user = int(request.query_params['user'])
        request.data['updated_at'] = datetime.now()
        try:
            queryset = ProductsListDataModel.objects.get(id=kwargs['pk'])
        except:
            return error_does_not_have_a_record()
        return self.update_common(queryset, user, request, method='put', *args, **kwargs)

    def update_common(self, queryset, user, request, method='put', *args, **kwargs):
        serializer = self.get_serializer(queryset)

        if serializer.data['owner_id'] == user:
            if serializer.data['owner_permissions_write']:
                match method.lower():
                    case 'put': return self.update(request, *args, **kwargs)
                    case 'patch': return self.partial_update(request, *args, **kwargs)
                    case 'delete': return self.destroy(request, *args, **kwargs)
            else:
                return error_not_have_permissions()

        elif serializer.data['shared_with_id'] == user:
            if serializer.data['shared_with_permissions_write']:
                match method.lower():
                    case 'put': return self.update(request, *args, **kwargs)
                    case 'patch': return self.partial_update(request, *args, **kwargs)
                    case 'delete': return self.destroy(request, *args, **kwargs)
            else:
                return error_not_have_permissions()

        else:
            return error_does_not_have_a_record()

    def delete(self, request, *args, **kwargs):
        data = request.data
        queryset = ProductsListDataModel.objects.filter(id=kwargs['pk'])
        if queryset:
            return self.update_common(queryset, request.data['user'], request, method='delete', *args, **kwargs)
        else:
            return error_does_not_have_a_record()

        # return self.destroy(request, *args, **kwargs) if queryset else error_does_not_have_a_record()

def error_not_have_permissions():
    return Response(
        {
            'error': True,
            'details': {
                'ru': 'Недостаточно прав',
                'en': 'Not enough rights'
            }
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )

def error_does_not_have_a_record():
    return Response(
        {
            'error': True,
            'details': {
                'ru': 'У этого пользователя нет записи с этим id',
                'en': 'The user does not have a record with this ID'
            }
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )

def error_builder(ru_en_dict:dict):
    return Response(
        {
            'error': True,
            'details': {
                'ru': ru_en_dict['ru'],
                'en': ru_en_dict['en']
            }
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )
