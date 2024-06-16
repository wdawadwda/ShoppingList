# ShoppingList
## *BACKEND*:

- ### *Quick start (terminal):*

### git clone at first and cd ShoppingList
## config file:
go to ./config/.configini, rename it to config.ini and fill variables

## run project:

1. Take a virtual environment: 
- python -m venv venv
2. Activate the environment:
- venv\scripts\activate
3. Install the libraries from requirements.txt:
- pip install -r requirements.txt
2. Create the database and put attrs to settings -> config.ini -> Database
3. Make migrations to the Database
- cd SiteOrder
- python manage.py makemigrations
- python manage.py migrate
4. Run the project
- python manage.py runserver

## ***Registration and authorization***
- ### *Create user ^/auth/users/*
>{\
    "username": "second_user",\
    "email": "omsinfo@yandex.ru",\
    "password": "second22222"\
}
- ### *Activation from email ^/auth/users/activation/* is switched-off 
>{\
    "uid": "MTk",\
    "token": "bvsym0-97353cdb8c40ba144876a14d1f489fd0"\
}
- ### *Login and get JWT /api/v1/token/*
>{\
    "username": "second_user",\
    "email": "omsinfo@yandex.ru",\
    "password": "second22222"\
}
- ### *Get user data via JWT access ^/auth/users/me/*
>{\
> "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2ODQ0MDMwLCJpYXQiOjE2OTY4NDM3MzAsImp0aSI6IjMxNDRlMDEwZDM3MzRjNmQ5N2MzNzExNWI2MDdiZjUzIiwidXNlcl9pZCI6MTl9.0ZX3SvB62Qm765tsbY4tsd3FiZ5YGR_ZYpce7aKb5KQ"\
> }
- ### *Get access JWT via refresh ^/api/v1/token/refresh/*
>{\
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NjkzMDEzMCwiaWF0IjoxNjk2ODQzNzMwLCJqdGkiOiI2NWFhODU2ZjcxMWQ0YTc5YWQ2YjU3YmRiYmEwOWI1ZCIsInVzZXJfaWQiOjE5fQ.tBY3JhoDQqicbQud_zg-Tdy4EO3bFt-Q4zGqTxVLpIU"\
>}

- ### *Change the theme ^/api/v1//user-settings/<int:pk>/* 
- (auto id default value). ['auto', 'dark', 'light']
>{\
    "user-theme": "dark"\
>}

- ### *SEND BILL from forms ^/api/v1//send-bill/* 
ContentType = multipart/form-data; \

METHODS = [POST]

>{\
    "bill": "img"\
    "user": id_user\
>}
> 
> return:\
> {\
    "message": "чек принят",\
    "AI": true,\
    "goods": [\
        {\
            "barcode": "500699",\
            "product_name": "ПАКЕТ МАЙКА СОСЕДИ 39/10*60",\
            "unit": "ШТ",\
            "price": "0.49",\
            "amount": "1.000",\
            "cost": "0.49"\
        },\
        {\
            "barcode": "66713",\
            "product_name": "БАНАН",\
            "unit": "КГ",\
            "price": "5.79",\
            "amount": "0.936",\
            "cost": "5.47"\
        },\
        {\
            "barcode": "4600682003212",\
            "product_name": "ПИВО БАЛТИКА №0 Б/А НЕФИЛЬТР.0.45Л",\
            "unit": "ШТ",\
            "price": "2.09;"\
        }\
    ],
    "text_OCR": "Э6Д №:500699 — СКНО : 54186 — *\nРПД №: 11 9178 ‚ 1С в\nМСС_Ё'; (7[(3781’›%… Т{ [‚;МП 1А 000703 Ё/\\Нік‘ : Ь%Ё)ЗЁ?)ЗЁ›’ЕЦ\\',: \\\n58 18 Ва п‚-'\"']Ёш.›кіЁЮ…/ 00006023\nПЛАТЕЖНЫЙ ЛОКУМЕНГ\n#Терминап №3\n#К ;.'аг‚}тгуу‹ Р _ 10-01-2024 \\_г„„д‘ё\nЁЧЬК:Ь. 82.238 ПРД_ТРН:0000002зэл ля, \\\nр ” : ` он *› =еетекеенеееееен ее н №\nЁЁЬзыді003018 ПАКЕТ МАЙКА СОСЕДИ 39/10*60 . 5ОМКЫ\nш 0.49 *1.000 =0,49\nб6713 БАНАН Кг\nЩ ) 5. 79 *0.936 =5,47\n4600682003212 ПИВО БАЛТИКА №0 Б/А НЕФИЛЬТР.О.45Л\n2.09 *1 000 ) =2,09\n4600582003212 ПИВО БАЛТИКА №0 Б/А НЕФИЛЬТР.0.45Л ;\n2.09 *1.000 =2?.05\n66039 КЛЕМЕНТИН 1КГ !\nд {.99 *0.674 =5.39 °\n66407 ХУРМА 1КГ )\n6.99 — *0.590 =4.12\n61059 ЯБЛОКО СВЕЖЕЕ РУБИН СТАР 1КГ\nЗ бвочка 60` сРУЕНКОй в0г\n72722 СЛАД. ‚ ТРУБ. 20 СГ Й и\n12122 СЛАД МУЧН}_49 35000 аа\n—н ненеееенееееенотеееынсыостеееенотенееенеыео\n1;Ншмг_:р карты: _ ш ЗАВоххххххх 4ОЬ\n#Начислено за 1екущую покугку: 0. 26Е\n#0статок бонусов ; 0`29%\nй… й о й - й - !\n#Фишки Чипсы Умный выбор: Щ )\n#Накоплено всего: о\nИО КОМЕ 8\nов РаАСНА| =30. 3.:\n\f"
}

- ### *ACCEPT CUSTOM CONFIRMED BILL TEXT ^/api/v1//accept-bill-text/* 
ContentType = application/json; \

METHODS = [POST]

>{   
    "user": 5,\
    "ai_model": "manual",\
    "bill_text": [\
        {\
            "barcode": "0000000000000",\
            "product_name": "ПАКЕТ МАЙКА СОСЕДИ 39/10*60",\
            "unit": "шт",\
            "price": "0.49",\
            "amount": "1.000",\
            "cost": "0.49"\
        },\
        {\
            "barcode": "66715",\
            "product_name": "БАНАН",\
            "unit": "кг",\
            "price": "5.79",\
            "amount": "0.936",\
            "cost": "5.42"\
        },\
        {\
            "barcode": "4600682003212",\
            "product_name": "ПИВО БАЛТИКА №0 6/А НЕФИЛЬТР.0.45Л",\
            "unit": "шт",\
            "price": "2.09"\
        }\
    ]\
}

- ### *GET BILL HISTORY ^/api/v1//bill-history/* 
ContentType = application/json; 

METHODS = [GET]

^/api/v1//bill-history/pk:int/ - get one bill by pk\
^/api/v1//bill-history/?user=<user_id>&date_from<date_from>&date_to=<date_to>

