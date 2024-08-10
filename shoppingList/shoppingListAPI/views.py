import os
import re
from datetime import datetime, date, timedelta
import requests
from django.db.models.functions import Lower
from django.forms import model_to_dict
from djoser.conf import User
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from OCR.get_most_valid_text import text_recognize
from shoppingList.settings import BASE_DIR
from OCR.tess_OCR import text_from_tesseract_ocr
from django.db.models import Q

from .custom_exception_handler.custom_exception_handler import translate_text
from .forms import BillForm
from .models import BillModel, ProductsListDataModel, CustomProductModel, CustomUser
from .serializers import UserSettingsSerializer, BillSerializer, CustomUserSerializer, ProductsListDataSerializer, \
    CustomProductSerializer, CustomUserCreateSerializer
from django.contrib.auth.models import BaseUserManager
from django.conf import settings
from .custom_errors import *

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
            raise ValueError('Userммs must have an email address')
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

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)

class BillView(generics.ListCreateAPIView):
    queryset = BillModel.objects.all()
    serializer_class = BillSerializer

    def post(self, request, *args, **kwargs):
        if not request.data.get('user'):
            return error_builder(ru_en_dict=user_id_not_specified)
        user_exists, _ = check_user_id_exists(id=request.data['user'])
        if not user_exists:
            return error_builder(ru_en_dict=user_does_not_exists)
        form = BillForm(request.POST, request.FILES)
        print(request.data)
        if form.is_valid():
            self.save_file(request=request)
            text_OCR, file_path = self.get_text_from_photo(pic_name=form.files['bill'])
            self.delete_bill_pic(file_path)

            try:
                goods, error, correct_picture = self.ask_AI(text_OCR)
                if correct_picture:
                    return Response({"error": error, 'message': "чек принят", "AI": True, "goods": goods}, status=status.HTTP_201_CREATED)
                else:
                    return error_builder(ru_en_dict=incorrect_picture) #Response({"error": error, 'message': "чек принят", "AI": True, "goods": goods}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as ex:
                return Response({'error': str(ex), 'message': "чек принят", "AI": False, "goods": text_OCR})
        return Response({"error": form.errors, "detail": {"ru": "Не корректно заполнена форма", "en": "The form is filled out incorrectly"}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
        incorrect_image_regex = r"[Нн]екорректная[\s]{0,}[Кк]артинка|НЕКОРРЕКТНАЯ[\s]{0,}КАРТИНКА"
        if re.findall(incorrect_image_regex, response):
            return [], incorrect_picture_status, False
        response = response.split("\n")
        for item in response:
            item = item.split("; ")
            for i in range(0, len(item)):
                if not item[i].startswith("'''"):
                    good[categories[i]] = item[i]
            goods.append(good)
            good = {}
        return goods, False, True

    def delete_bill_pic(self, file_path):
        if os.path.isfile(file_path):
            os.remove(file_path)
            print(f"Файл {file_path} удален")
        else:
            print(f"Файл {file_path} не найден")

class CustomBillTextView(generics.CreateAPIView, generics.ListAPIView):
    queryset = BillModel.objects.all()
    serializer_class = BillSerializer

    def post(self, request, *args, **kwargs):
        if not request.data.get('user'):
            return error_builder(ru_en_dict=user_id_not_specified)
        user_exists, _ = check_user_id_exists(id=request.data['user'])
        if not user_exists:
            return error_builder(ru_en_dict=user_does_not_exists)
        if not request.data.get('bill_text'):
            return error_builder(ru_en_dict=bill_text_cannot_be_empty)
        return self.create(request, *args, **kwargs)


class GetBillsHistoryView(generics.ListAPIView, generics.DestroyAPIView):
    queryset = BillModel.objects.all()
    serializer_class = BillSerializer

    def get(self, request, *args, **kwargs):

        params = {}

        if request.query_params.get('user'):
            exists, _ = check_user_id_exists(id=request.query_params['user'])
            if not exists:
                return error_builder(ru_en_dict=user_does_not_exists)
        else:
            return error_builder(ru_en_dict=user_id_not_specified)

        if not kwargs.get('pk'):
            if 'date_from' in request.query_params.keys() or 'date_to' in request.query_params.keys():
                params['user'] = request.query_params['user']

                if request.query_params.get('date_from'):
                    date = self.normalize_date(request.query_params['date_from'])
                    if not date['error']:
                        params['date_from'] = date['date']
                    else:
                        return error_builder(ru_en_dict=incorrect_date_format)
                else:
                    return error_builder(ru_en_dict=date_from_not_specified)

                if request.query_params.get('date_to'):
                    date = self.normalize_date(request.query_params['date_to'])
                    if not date['error']:
                        params['date_to'] = date['date'] + timedelta(days=1)
                    else:
                        return error_builder(ru_en_dict=incorrect_date_format)
                else:
                    params['date_to'] = datetime.now()

        if params:
            bills = BillModel.objects.filter(date__range=(params['date_from'], params['date_to']), user=params['user'])
            # if not bills:
            #     return error_builder(ru_en_dict=the_user_has_no_records_between_dates)

        elif kwargs.get('pk'):
            bills = BillModel.objects.filter(id=int(kwargs['pk']))
            # if not bills:
            #     return error_builder(ru_en_dict=the_user_does_not_have_a_record)
        else:
            bills = BillModel.objects.filter(user=request.query_params['user'])
            # if not bills:
            #     return error_builder(ru_en_dict=the_user_does_have_any_record)
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
        return {'error': 'does not match date format', "date": None}

    def delete(self, request, *args, **kwargs):
        if not kwargs.get('pk'):
            return error_builder(ru_en_dict=no_record_pk_specified)
        if not request.query_params.get('user_id'):
            return error_builder(ru_en_dict=user_id_not_specified)
        exists, _ = check_user_id_exists(request.query_params['user_id'])
        if not exists:
            return error_builder(ru_en_dict=user_does_not_exists)
        user_has_record = BillModel.objects.filter(user=request.query_params['user_id'], id=kwargs['pk'])
        if not user_has_record:
            return error_builder(ru_en_dict=there_is_no_record_with_this_id)
        return self.destroy(request, *args, **kwargs)


class TestSendBillView(generics.CreateAPIView):
    queryset = BillModel.objects.all()
    serializer_class = BillSerializer

class CustomProductView(generics.CreateAPIView, generics.DestroyAPIView, generics.UpdateAPIView, generics.ListCreateAPIView):
    queryset = CustomProductModel.objects.all()
    serializer_class = CustomProductSerializer

    def get(self, request, *args, **kwargs):
        if not request.query_params.get('user'):
            return error_builder(ru_en_dict=user_id_not_specified)

        user = request.query_params['user']
        serializer_data = []
        if kwargs.get('pk'):
            try:
                try:
                    object = CustomProductModel.objects.get(id=kwargs['pk'], user=user)
                except:
                    return error_builder(ru_en_dict=the_user_does_not_have_a_record)
                object = self.get_serializer(object)
                object = self.transform_data(from_db=object.data) if object.data else []
                return Response(object)
            except Exception as ex:
                return Response({'error': True, 'detail': {'ru': str(ex), 'en': str(ex)}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            queryset = CustomProductModel.objects.filter(user=user)
            serializer = self.get_serializer(queryset, many=True)
            for item in range(len(serializer.data)):
                serializer_data.append(self.transform_data(from_db=serializer.data[item]))
            return Response(serializer_data)

    def post(self, request, *args, **kwargs):
        if not request.data.get('user'):
            return error_builder(ru_en_dict=user_id_not_specified)
        data = request.data
        user_exists, _ = check_user_id_exists(id=request.data['user'])
        if not user_exists:
            return error_builder(ru_en_dict=user_does_not_exists)

        exists, _ = self.check_exists(name=data['name'], user=data['user'], lower=True)
        if not exists:
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
                'detail': this_custom_product_exists_already
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, *args, **kwargs):
        if not request.query_params.get('user'):
            return error_builder(ru_en_dict=user_id_not_specified)
        user_exists, _ = check_user_id_exists(id=request.query_params.get('user'))
        if not user_exists:
            return error_builder(ru_en_dict=user_does_not_exists)

        queryset = CustomProductModel.objects.filter(id=kwargs['pk'], user=request.query_params['user'])
        return self.destroy(request, *args, **kwargs) if queryset else error_does_not_have_a_record()

    def put(self, request, *args, **kwargs):
        if not request.query_params.get('user'):
            return error_builder(ru_en_dict=user_id_not_specified)
        user_exists, _ = check_user_id_exists(id=request.query_params.get('user'))
        if not user_exists:
            return error_builder(ru_en_dict=user_does_not_exists)

        queryset = CustomProductModel.objects.filter(id=kwargs['pk'], user=request.query_params['user'])
        if queryset:
            if self.exists_besides_current_one(request=request, **kwargs):
                return error_builder(ru_en_dict=this_custom_product_exists_already)
        else:
            return error_does_not_have_a_record()
        request.data['user'] = int(request.query_params['user'])
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        if not request.query_params.get('user'):
            return error_builder(ru_en_dict=user_id_not_specified)
        user_exists, _ = check_user_id_exists(id=request.query_params.get('user'))
        if not user_exists:
            return error_builder(ru_en_dict=user_does_not_exists)

        queryset = CustomProductModel.objects.filter(id=kwargs['pk'], user=request.query_params['user'])
        if queryset:
            if self.exists_besides_current_one(request=request, **kwargs):
                return error_builder(ru_en_dict=this_custom_product_exists_already)
        else:
            return error_does_not_have_a_record()
        return self.partial_update(request, *args, **kwargs) if queryset else error_does_not_have_a_record()

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
    
    def check_exists(self, name, user, lower=False):
        exists = {
            "ru": False,
            "en": False
        }
        if name.get('ru'):
            if not lower:
                exists['ru'] = CustomProductModel.objects.filter(name_ru=name['ru'], user=user).exists()
            else:
                exists['ru'] = CustomProductModel.objects.annotate(name_ru_lower=Lower('name_ru')).filter(name_ru_lower=name['ru'].lower(), user=user).exists()

        if name.get('en'):
            if not lower:
                exists['en'] = CustomProductModel.objects.filter(name_en=name['en'], user=user).exists()
            else:
                exists['en'] = CustomProductModel.objects.annotate(name_en_lower=Lower('name_en')).filter(name_en_lower=name['en'].lower(), user=user).exists()

        if exists['ru'] or exists['en'] :
            return True, exists
        else:
            return False, exists

    def exists_besides_current_one(self, request, **kwargs):
        if request.data.get('name'):
            name_ru_low = request.data['name']['ru'].lower() if request.data['name'].get('ru') else ""
            name_en_low = request.data['name']['en'].lower() if request.data['name'].get('en') else ""

            if name_ru_low or name_en_low:

                exists_besides_current_one = CustomProductModel.objects.annotate(
                    name_ru_lower=Lower('name_ru'),
                    name_en_lower=Lower('name_en')
                ).filter(
                    Q(name_ru_lower=name_ru_low) | Q(name_en_lower=name_en_low),
                    user=request.query_params['user']
                ).exclude(
                    id=kwargs['pk']
                ).exists()

                exists_from_check_exists, _ = self.check_exists(
                    name=request.data['name'],
                    user=request.query_params['user'],
                    lower=True
                )

                if exists_besides_current_one or exists_from_check_exists:
                    return True
        return False

class ProductsListDataView(generics.CreateAPIView, generics.DestroyAPIView, generics.UpdateAPIView, generics.ListCreateAPIView):
    queryset = ProductsListDataModel.objects.all()
    serializer_class = ProductsListDataSerializer
    """
    object = {
        "name": "test_list",
        "owner": {
            "owner_id": 1,
            "owner_name": "ruslan"
        },
        "shared": {
            "shared_id": 2,
            "shared_name": "denis"
        },
        "isShared": True,
        "sharedType": "read | write",
        "products": [
            {
                "quantity": 40,
                "category": {
                    "en": "milk",
                    "ru": "молоко"
                },
                "name": {
                    "en": "Milk 2,8 in plastic bag",
                    "ru": "Молоко 2,8 в пласт бутылке"
                },
                "svgKey": "string",
                "isPushed": "TRUE"
            },
            {
                ...
            }
        ]
    }"""

    def get(self, request, *args, **kwargs):
        if not request.query_params.get('user'):
            return self.list(request, *args, **kwargs)
        user_exists, _ = check_user_id_exists(id=request.query_params['user'])
        if not user_exists:
            return error_builder(ru_en_dict=user_does_not_exists)

        if kwargs.get('pk'):
            user = request.query_params['user']
            try:
                try:
                    object_owner = ProductsListDataModel.objects.get(id=kwargs['pk'], owner_id=user)
                    object_owner = self.get_serializer(object_owner).data
                except:
                    object_owner = {}
                try:
                    object_shared = ProductsListDataModel.objects.get(id=kwargs['pk'], shared_id=user)
                    object_shared = self.get_serializer(object_shared).data
                except:
                    object_shared = {}
                object_owner = self.repack_ProductsListData(object_owner)
                object_shared = self.repack_ProductsListData(object_shared)
                return Response({'error': False, 'owner': object_owner, 'shared': object_shared}) if object_shared or object_owner else Response(
                    {
                        'error': True,
                        'detail': the_user_does_not_have_a_record
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            except Exception as ex:
                return Response(
                    {
                        'error': True,
                        'detail': {
                            'ru': str(ex),
                            'en': translate_text(str(ex))
                        }
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )


        elif request.query_params.get('user'):
            user = request.query_params['user']
            if not check_user_id_exists(id=user)[0]:
                return error_builder(ru_en_dict=user_does_not_exists)
            objects_owner = ProductsListDataModel.objects.filter(owner_id=user)
            if not objects_owner:
                return error_builder(ru_en_dict=the_user_does_have_any_record)
            objects_owner = self.get_serializer(objects_owner, many=True)
            objects_shared = ProductsListDataModel.objects.filter(shared_id=user)
            objects_shared = self.get_serializer(objects_shared, many=True)
            return Response(
                {
                    'owner': self.repack_ProductsListData_many(objects_owner.data),
                    'shared': self.repack_ProductsListData_many(objects_shared.data)
                }
            )

        else:
            return self.list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(self.repack_ProductsListData_many(serializer.data))

    def post(self, request, *args, **kwargs):
        # checking_queryset = ProductsListDataModel.objects.filter(name=request.data['name'], owner_id=request.data['owner_id'])
        if not request.data.get('owner_id'):
            return error_builder(ru_en_dict=user_id_not_specified)

        name_lower = request.data['name'].lower()
        checking_queryset = ProductsListDataModel.objects.annotate(name_lower=Lower('name')).filter(name_lower=name_lower, owner_id=request.data['owner_id'])
        if not list(checking_queryset.values()):
            try:
                user = CustomUser.objects.get(id=request.data['owner_id'])
            except:
                return error_builder(ru_en_dict={'ru': 'Пользователь не существует', 'en': 'User does not exist'})
            name = model_to_dict(user)['username']
            request_data = request.data
            request_data['owner_name'] = name
            serializer = self.get_serializer(data=request_data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            repacked_object = self.repack_ProductsListData(serializer.data)
            return Response(repacked_object, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return error_builder(ru_en_dict=list_with_this_name_already_exists, http_status=status.HTTP_409_CONFLICT)

    def patch(self, request, *args, **kwargs):
        if not request.query_params.get('user'):
            return error_builder(ru_en_dict=user_id_not_specified)
        user = int(request.query_params['user'])

        # data validation
        validation, error = self.update_validations(request, user, **kwargs)
        if not validation:
            return error

        request.data['updated_at'] = datetime.now()
        try:
            queryset = ProductsListDataModel.objects.get(id=kwargs['pk'])
        except:
            return error_does_not_have_a_record()
        return self.update_common(queryset, user, request, method='patch', *args, **kwargs)

    def put(self, request, *args, **kwargs):
        if not request.query_params.get('user'):
            return error_builder(ru_en_dict=user_id_not_specified)

        user = int(request.query_params['user'])

        # data validation
        validation, error = self.update_validations(request, user, **kwargs)
        if not validation:
            return error

        request.data['updated_at'] = datetime.now()
        try:
            queryset = ProductsListDataModel.objects.get(id=kwargs['pk'])
        except:
            return error_does_not_have_a_record()
        return self.update_common(queryset, user, request, method='put', *args, **kwargs)

    def update_validations(self, request, user, **kwargs):
        # does user exist
        user_exists, user_object = check_user_id_exists(id=user)
        if not user_exists:
            return False, error_builder(ru_en_dict=user_does_not_exists)

        if request.data.get('owner_id') and request.data['owner_id'] != user:
            return False, error_builder(ru_en_dict=user_ids_dont_match)
            pass

        # are user ready to accept the list transfer
        if not shared_with_accepts(request.data):
            return False, error_builder(ru_en_dict=the_user_has_limited)

        # does user have permissions to update
        permission, error = self.valid_permission(kwargs['pk'], user, request)
        if not permission:
            return False, error

        # does list name exists exclude this pk
        exists_besides_current, error = self.exists_besides_current_one(request=request, **kwargs)
        if exists_besides_current:
            return False, error

        return True, None

    def update_common(self, queryset, user, request, method='put', *args, **kwargs):
        serializer = self.get_serializer(queryset)

        if serializer.data['owner_id'] == user: #and (serializer.data['shared_type'] == 'read' or not serializer.data['is_shared']):
            match method.lower():
                case 'put':
                    if serializer.data['shared_type'] == 'read' or not serializer.data['is_shared']:
                        request_data = self.unpack_ProductsListData(request.data)
                        return self.update(request, *args, **kwargs)
                case 'patch':
                    request_data, error = self.check_and_fill_in_the_data(request.data, user)
                    return error_builder(ru_en_dict=error) if error else self.partial_update(request, *args, **kwargs)
                # case 'delete': return self.destroy(request, *args, **kwargs)

        elif (serializer.data['shared_id'] == user and serializer.data['shared_type'] == 'write' and serializer.data['is_shared']) or (serializer.data['shared_id'] == user and not request.data['is_shared']):
            match method.lower():
                case 'put': return self.update(request, *args, **kwargs)
                case 'patch':
                    request_data, error = self.check_and_fill_in_the_data(request.data, user)
                    return error_builder(ru_en_dict=error) if error else self.partial_update(request, *args, **kwargs)

        else:
            return error_not_have_permissions()
        return Response({"error": "Update not allowed"}, status=403)

    def update(self, request, *args, **kwargs):
        pass
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        unpacked_request_data = self.unpack_ProductsListData(request.data)
        serializer = self.get_serializer(instance, data=unpacked_request_data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(self.repack_ProductsListData(serializer.data))

    def delete(self, request, *args, **kwargs):
        if not request.query_params.get('user'):
            return error_builder(ru_en_dict=user_id_not_specified)
        user_exists, _ = check_user_id_exists(id=request.query_params['user'])
        if not user_exists:
            return error_builder(ru_en_dict=user_does_not_exists)

        queryset = ProductsListDataModel.objects.filter(id=kwargs['pk'], owner_id=request.query_params['user'])
        return self.destroy(request, *args, **kwargs) if queryset else error_does_not_have_a_record()

    def repack_ProductsListData_many(self, objects_list):
        for number in range(len(objects_list)):
            objects_list[number] = self.repack_ProductsListData(objects_list[number])
        return objects_list

    def repack_ProductsListData(self, object) -> dict:
        remove_keys = []
        object['owner'] = {}
        object['shared'] = {}
        for key in object.keys():
            if key in ['owner_id', 'owner_name']:
                object['owner'][key] = object[key]
                remove_keys.append(key)
            elif key in ['shared_id', 'shared_name']:
                object['shared'][key] = object[key]
                remove_keys.append(key)
        for key in remove_keys:
            object.pop(key)
        return object if object['owner'] or object['shared'] else {}

    def unpack_ProductsListData(self, object) -> dict:
        remove_keys = []
        for key in list(object.keys()):
            if key in ['owner', 'shared']:
                remove_keys.append(key)
                for sub_key in object[key]:
                    object[sub_key] = object[key][sub_key]
        for key in remove_keys:
            object.pop(key)
        return object

    def check_and_fill_in_the_data(self, request_data, requested_user):
        if 'is_shared' not in  request_data:
            return request_data, is_shared_is_not_specified
        if 'is_shared' in request_data and not request_data['is_shared']:
            if 'shared' not in request_data:
                request_data['shared'] = {}
            request_data['shared']['shared_id'] = None
            request_data['shared']['shared_name'] = None
            request_data['shared_type'] = None
            return request_data, {}
        if 'is_shared' in request_data and request_data['is_shared']:
            if not request_data.get('shared') or not request_data['shared']:
                return request_data, shared_data_missing
            if request_data.get('shared') and not request_data['shared'].get('shared_id'):
                return request_data, shared_id_data_missing
            if request_data['shared']['shared_id'] == requested_user:
                return request_data, user_cannot_pass_the_list_to_himself
            if not request_data.get('shared_type') or not request_data['shared_type']:
                request_data['shared_type'] = 'read'
            if not request_data.get('shared_name') or not request_data['shared_name']:
                user_exists, user_object = check_user_id_exists(id=request_data['shared']['shared_id'])
                if not user_exists:
                    return request_data, user_shared_id_does_not_exist
                else:
                    request_data['shared']['shared_name'] = user_object['username']
        return request_data, {}

    def exists_besides_current_one(self, request, **kwargs):
        try:
            list_object = ProductsListDataModel.objects.get(id=kwargs['pk'])
            list_object = model_to_dict(list_object)
            owner_id = list_object['owner_id']
        except Exception as ex:
            print("views.ProductsListDataView.exists_besides_current_one", ex)
            return False, error_builder(ru_en_dict={'en': str(ex), 'ru': translate_text(ex.args[0])})

        if request.data.get('name'):
            name_low = request.data['name'].lower()
            if name_low:

                exists_besides_current_one = ProductsListDataModel.objects.annotate(
                    name_lower=Lower('name')
                ).filter(
                    name_lower=name_low,
                    owner_id = int(owner_id)
                ).exclude(
                    id=kwargs['pk']
                ).exists()

                if exists_besides_current_one:
                    return True, error_builder(ru_en_dict=list_with_this_name_already_exists)
        return False, None

    def valid_permission(self, pk, user, request):
        try:
            queryset = ProductsListDataModel.objects.get(id=pk)

            custom_list = model_to_dict(queryset)
            if custom_list.get('owner_id') and custom_list['owner_id'] and custom_list['owner_id'] == user:
                return True, None
            if custom_list.get('shared_id') and custom_list['shared_id'] == user:
                if custom_list.get('is_shared') and custom_list['is_shared'] and custom_list.get('shared_type') and custom_list['shared_type'] == "write":
                    return True, None
                if 'is_shared' in request.data and request.data['is_shared'] == False and custom_list.get('shared_type') and custom_list['shared_type'] == 'read':
                    return True, None
        except Exception as ex:
            print('view.ProductsListDataView.valid_permission', ex)
            return False, error_builder(ru_en_dict=there_is_no_record_with_this_id)
        return False, error_builder(ru_en_dict=not_enough_rights)


def shared_with_accepts(request_data):
    if request_data.get('shared_id'):
        shared_with_user = User.objects.get(id=request_data['shared_id'])
        if shared_with_user:
            shared_with_user_object = CustomUserSerializer(shared_with_user).data['ready_to_accept_lists']
            if shared_with_user_object:
                return True
        return False
    return True

def error_not_have_permissions():
    return Response(
        {
            'error': True,
            'detail': not_enough_rights
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )

def error_does_not_have_a_record():
    return Response(
        {
            'error': True,
            'detail': the_user_does_not_have_a_record
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )

def error_builder(ru_en_dict:dict, http_status=None):
    return Response(
        {
            'error': True,
            'detail': {
                'ru': ru_en_dict['ru'],
                'en': ru_en_dict['en']
            }
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR if not http_status else http_status
    )

def check_user_id_exists(id:int|str) -> [bool, dict]:
    try:
        user_queryset = CustomUser.objects.get(id=id)
        return True, model_to_dict(user_queryset)
    except:
        return False, {}

class TestUserCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CustomUserCreateSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


