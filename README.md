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

<hr>

## *** Registration and authorization ***
- ### Create user ^/auth/users/
```json
{
    "username": "second_user",
    "email": "omsinfo@yandex.ru",
    "password": "second22222"
}
```
- ### Activation from email ^/auth/users/activation/ is switched-off 
```json
{
    "uid": "MTk",
    "token": "bvsym0-97353cdb8c40ba144876a14d1f489fd0"
}
```
- ### Login and get JWT /api/v1/token/
```json
{
    "username": "second_user",
    "email": "omsinfo@yandex.ru",
    "password": "second22222"
}
```
- ### Get user data via JWT access ^/auth/users/me/
```json
{
 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2ODQ0MDMwLCJpYXQiOjE2OTY4NDM3MzAsImp0aSI6IjMxNDRlMDEwZDM3MzRjNmQ5N2MzNzExNWI2MDdiZjUzIiwidXNlcl9pZCI6MTl9.0ZX3SvB62Qm765tsbY4tsd3FiZ5YGR_ZYpce7aKb5KQ"\
}
```
- ### Get access JWT via refresh ^/api/v1/token/refresh/
```json
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NjkzMDEzMCwiaWF0IjoxNjk2ODQzNzMwLCJqdGkiOiI2NWFhODU2ZjcxMWQ0YTc5YWQ2YjU3YmRiYmEwOWI1ZCIsInVzZXJfaWQiOjE5fQ.tBY3JhoDQqicbQud_zg-Tdy4EO3bFt-Q4zGqTxVLpIU"
}
```

- ### Change the theme ^/api/v1//user-settings/<int:pk>/
- (auto id default value). ['auto', 'dark', 'light']
```json
{
    "user-theme": "dark"
}
```
<hr>

## *** BILLS ***
- ### SEND BILL from forms ^/api/v1//send-bill/ 
ContentType = multipart/form-data; \

METHODS = [POST]
```json
{
    "bill": "img",
    "user": id_user
}
```
return
```json
{
    "message": "чек принят",
    "AI": true,
    "goods": [
        {
            "barcode": "500699",
            "product_name": "ПАКЕТ МАЙКА СОСЕДИ 39/10*60",
            "unit": "ШТ",
            "price": "0.49",
            "amount": "1.000",
            "cost": "0.49"
        },
        {
            "barcode": "66713",
            "product_name": "БАНАН",
            "unit": "КГ",
            "price": "5.79",
            "amount": "0.936",
            "cost": "5.47"
        },
        {
            "barcode": "4600682003212",
            "product_name": "ПИВО БАЛТИКА №0 Б/А НЕФИЛЬТР.0.45Л",
            "unit": "ШТ",
            "price": "2.09;"
        }
    ],
}
```

- ### ACCEPT CUSTOM CONFIRMED BILL TEXT ^/api/v1//accept-bill-text/ 
ContentType = application/json; \

METHODS = [POST]
```json
{   
    "user": 5,
    "ai_model": "manual",
    "bill_text": [
        {
            "barcode": "0000000000000",
            "product_name": "ПАКЕТ МАЙКА СОСЕДИ 39/10*60",
            "unit": "шт",
            "price": "0.49",
            "amount": "1.000",
            "cost": "0.49"
        },
        {
            "barcode": "66715",
            "product_name": "БАНАН",
            "unit": "кг",
            "price": "5.79",
            "amount": "0.936",
            "cost": "5.42"
        },
        {
            "barcode": "4600682003212",
            "product_name": "ПИВО БАЛТИКА №0 6/А НЕФИЛЬТР.0.45Л",
            "unit": "шт",
            "price": "2.09"
        }
    ]
}
```

- ### GET BILL HISTORY ^/api/v1//bill-history/
ContentType = application/json; 

METHODS = [GET, DELETE]

^/api/v1//bill-history/pk:int/ - get one bill by pk\
^/api/v1//bill-history/?user=<user_id>&date_from<date_from>&date_to=<date_to>
^/api/v1//bill-history/pk:int/ - DELETE one bill by pk\

- ### SEND BILL (TEST)
^/api/v1/test-send-bill/

<hr>

## *** CUSTOM PRODUCTS *** 

MODEL
```python
  barcode = models.CharField(max_length=50, blank=True, null=True)
  name_en = models.CharField(max_length=150, blank=True, null=True)
  name_ru = models.CharField(max_length=150, blank=True, null=True)
  unit = models.CharField(max_length=20, choices=[('kg', 'Kg'), ('piece', 'Piece'), ('g', 'G')])
  svgKey = models.CharField(max_length=20, blank=False, null=False)
  category_ru = models.CharField(max_length=20, blank=True, null=True)
  category_en = models.CharField(max_length=20, blank=True, null=True)
  isPushed = models.BooleanField(default=False)
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

```


#### POST ^/api/v1/api/v1/custom-product/
body
```json
{
    "user": 2,
  
    "barcode": "000000",
    "name": {
        "en": "Milk 2,8 in plastic bag",
        "ru": "Молоко 2,8 в пласт бутылке"
    },
    "category": {
        "en": "milk",
        "ru": "молоко"
    },
    "unit": "kg",
    "svgKey": "string",
    "isPushed": "true"
}
```
<hr>

#### GET (all) ^/api/v1/api/v1/custom-product/
body
```json
{
    "user": 2
}
```

return list of all objects
```json
[
    {
        "id": 8,
        "barcode": "000000",
        "name": {
            "en": "aMilk 2,8 in plastic bag",
            "ru": "dМолоко 2,8 в пласт бутылке"
        },
        "unit": "kg",
        "svgKey": "string",
        "category": {
            "ru": "молоко",
            "en": "milk"
        },
        "isPushed": true,
        "user": 2
    },
    {
        "id": 9,
        "barcode": "000000",
        "name": {
            "en": "Milk 2,8 in plastic bag",
            "ru": "Молоко 2,8 в пласт бутылке"
        },
        "unit": "kg",
        "svgKey": "string",
        "category": {
            "ru": "молоко",
            "en": "milk"
        },
        "isPushed": true,
        "user": 2
    }
]
```
<hr>

#### GET (by id) ^/api/v1/api/v1/custom-product/id:int/
body
```json
{
    "user": 2
}
```
there is such a record and it contains a link to the user who created it, or to the user with whom this list was shared, it returns:
```json
{
    "id": 9,
    "barcode": "000000",
    "name": {
        "en": "Milk 2,8 in plastic bag",
        "ru": "Молоко 2,8 в пласт бутылке"
    },
    "unit": "kg",
    "svgKey": "string",
    "category": {
        "ru": "молоко",
        "en": "milk"
    },
    "isPushed": true,
    "user": 2
}
```
else:
```json
[]
```
<hr>

#### PUT (update) ^/api/v1/api/v1/custom-product/id:int/
body
```json
{
    "user": 2,

    "barcode": "0000005",
		"name": {
				"en": "daed rabbit",
				"ru": "мертвый кролик"
		},
		"category": {
				"en": "6milk",
				"ru": "6молоко"
		},
    "unit": "kg",
    "svgKey": "6string",
    "isPushed": "true"
}
```
<hr>

#### PATCH (update) ^/api/v1/api/v1/custom-product/id:int/
body
```json
{
    "user": 1,

    "isPushed": "true",
    "name": {
        "en": "ejwhfbaweads"
    }
}
```
#### DELETE ^/api/v1/api/v1/custom-product/id:int/
body
```json
{
	"user": 2
}
```
<hr>

## *** PRODUCT LIST DATA *** 

MODEL
```python
  name = models.CharField(max_length=50, unique=True, blank=False, null=False)
  products = models.JSONField(blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(blank=True, null=True)
  owner_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='owned_lists')
  owner_permissions_read = models.BooleanField(default=True)
  owner_permissions_write = models.BooleanField(default=True)
  owner_permissions_admin = models.BooleanField(default=True)
  shared_with_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='shared_lists', blank=True, null=True)
  shared_with_permissions_read = models.BooleanField(blank=True, null=True)
  shared_with_permissions_write = models.BooleanField(blank=True, null=True)
  shared_with_permissions_admin = models.BooleanField(blank=True, null=True)
```
<hr>

#### POST ^/api/v1/products-list-data/
```json
{
  "owner_id": 2,
  "name": "test_list",
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
            "isPushed": "true"
        }
  ]
}
```
<hr>

#### GET (all) ^/api/v1/products-list-data
not body
response:
```json
[
    {
        "id": 1,
        "name": "second_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-06-27T19:58:19.469081+03:00",
        "updated_at": "2024-07-04T18:45:18.761776+03:00",
        "owner_permissions_read": true,
        "owner_permissions_write": false,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": true,
        "shared_with_permissions_write": true,
        "shared_with_permissions_admin": false,
        "owner_id": 1,
        "shared_with_id": 1
    },
    {
        "id": 2,
        "name": "77777h66dd_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-06-27T19:59:01.461024+03:00",
        "updated_at": "2024-07-04T19:52:08.428740+03:00",
        "owner_permissions_read": true,
        "owner_permissions_write": false,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": true,
        "shared_with_permissions_write": true,
        "shared_with_permissions_admin": false,
        "owner_id": 1,
        "shared_with_id": 1
    },
    {
        "id": 3,
        "name": "77777h66dd_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-06-27T20:01:08.963187+03:00",
        "updated_at": "2024-07-04T20:04:17.291915+03:00",
        "owner_permissions_read": true,
        "owner_permissions_write": true,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": true,
        "shared_with_permissions_write": true,
        "shared_with_permissions_admin": true,
        "owner_id": 1,
        "shared_with_id": 2
    },
    {
        "id": 4,
        "name": "th5_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-06-27T20:02:16.591297+03:00",
        "updated_at": null,
        "owner_permissions_read": true,
        "owner_permissions_write": true,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": null,
        "shared_with_permissions_write": null,
        "shared_with_permissions_admin": null,
        "owner_id": 1,
        "shared_with_id": 1
    },
    {
        "id": 5,
        "name": "th6_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-06-27T20:29:28.189929+03:00",
        "updated_at": null,
        "owner_permissions_read": true,
        "owner_permissions_write": true,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": null,
        "shared_with_permissions_write": null,
        "shared_with_permissions_admin": null,
        "owner_id": 1,
        "shared_with_id": null
    },
    {
        "id": 6,
        "name": "th66_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-07-01T15:45:32.072613+03:00",
        "updated_at": null,
        "owner_permissions_read": true,
        "owner_permissions_write": true,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": null,
        "shared_with_permissions_write": null,
        "shared_with_permissions_admin": null,
        "owner_id": 2,
        "shared_with_id": null
    },
    {
        "id": 7,
        "name": "th66d_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-07-01T15:59:43.590764+03:00",
        "updated_at": null,
        "owner_permissions_read": true,
        "owner_permissions_write": true,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": null,
        "shared_with_permissions_write": null,
        "shared_with_permissions_admin": null,
        "owner_id": 2,
        "shared_with_id": null
    },
    {
        "id": 8,
        "name": "th66d_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-07-01T16:00:30.021036+03:00",
        "updated_at": null,
        "owner_permissions_read": true,
        "owner_permissions_write": true,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": null,
        "shared_with_permissions_write": null,
        "shared_with_permissions_admin": null,
        "owner_id": 1,
        "shared_with_id": null
    },
    {
        "id": 10,
        "name": "th66dd_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-07-01T16:00:48.242640+03:00",
        "updated_at": null,
        "owner_permissions_read": true,
        "owner_permissions_write": true,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": null,
        "shared_with_permissions_write": null,
        "shared_with_permissions_admin": null,
        "owner_id": 1,
        "shared_with_id": null
    },
    {
        "id": 11,
        "name": "5th66dd_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-07-04T13:19:51.801167+03:00",
        "updated_at": null,
        "owner_permissions_read": true,
        "owner_permissions_write": true,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": null,
        "shared_with_permissions_write": null,
        "shared_with_permissions_admin": null,
        "owner_id": 1,
        "shared_with_id": null
    },
    {
        "id": 12,
        "name": "77777h66dd_list",
        "products": [
            {
                "quantity": 40,
                "category": {
                    "en": "milk",
                    "ru": "молоко"
                },
                "name": {
                    "en": "Rabbit",
                    "ru": "Кролик мертвый в пакете"
                },
                "svgKey": "string",
                "isPushed": "TRUE"
            },
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-07-04T20:02:11.569309+03:00",
        "updated_at": "2024-07-04T20:03:56.188434+03:00",
        "owner_permissions_read": true,
        "owner_permissions_write": true,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": null,
        "shared_with_permissions_write": null,
        "shared_with_permissions_admin": null,
        "owner_id": 1,
        "shared_with_id": null
    },
    {
        "id": 13,
        "name": "test_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-07-04T21:03:20.271841+03:00",
        "updated_at": null,
        "owner_permissions_read": true,
        "owner_permissions_write": true,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": null,
        "shared_with_permissions_write": null,
        "shared_with_permissions_admin": null,
        "owner_id": 1,
        "shared_with_id": null
    },
    {
        "id": 14,
        "name": "test_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-07-04T21:03:56.013027+03:00",
        "updated_at": null,
        "owner_permissions_read": true,
        "owner_permissions_write": true,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": null,
        "shared_with_permissions_write": null,
        "shared_with_permissions_admin": null,
        "owner_id": 2,
        "shared_with_id": null
    }
]
```
<hr>

#### GET (by id) ^/api/v1/products-list-data/id:int/
body:
```json
{
    "user": 2
}
```
response:
```json
{
    "error": false,
    "owner": {
        "id": 16,
        "name": "test_list",
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
                "isPushed": "true"
            }
        ],
        "created_at": "2024-07-04T21:18:22.502065+03:00",
        "updated_at": null,
        "owner_permissions_read": true,
        "owner_permissions_write": true,
        "owner_permissions_admin": true,
        "shared_with_permissions_read": null,
        "shared_with_permissions_write": null,
        "shared_with_permissions_admin": null,
        "owner_id": 2,
        "shared_with_id": null
    },
    "shared": []
}
```
or 
```json
{
    "error": true,
    "details": {
        "ru": "У этого пользователя нет записи с этим id",
        "en": "The user does not have a record with this ID"
    }
}
```
<hr>

#### GET ^/api/v1/products-list-data?user_id=2
without body

return all records by user id trow 'owner' and 'shared' keys
```json
{
    "owner": [
        {
            "id": 6,
            "name": "th66_list",
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
                    "isPushed": "true"
                }
            ],
            "created_at": "2024-07-01T15:45:32.072613+03:00",
            "updated_at": null,
            "owner_permissions_read": true,
            "owner_permissions_write": true,
            "owner_permissions_admin": true,
            "shared_with_permissions_read": null,
            "shared_with_permissions_write": null,
            "shared_with_permissions_admin": null,
            "owner_id": 2,
            "shared_with_id": null
        }
    ],
    "shared": [
        {
            "id": 3,
            "name": "77777h66dd_list",
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
                    "isPushed": "true"
                }
            ],
            "created_at": "2024-06-27T20:01:08.963187+03:00",
            "updated_at": "2024-07-04T20:04:17.291915+03:00",
            "owner_permissions_read": true,
            "owner_permissions_write": true,
            "owner_permissions_admin": true,
            "shared_with_permissions_read": true,
            "shared_with_permissions_write": true,
            "shared_with_permissions_admin": true,
            "owner_id": 1,
            "shared_with_id": 2
        }
    ]
}
```
<hr>

#### PUT (update) ^/api/v1/products-list-data/id:int/
```json
{
	"user": 2,

    "owner_id": 2,
    "name": "test_test",
	"products": [
        {
            "quantity": 40,
            "category": {
                "en": "milk",
                "ru": "молоко"
            },
            "name": {
                "en": "Rabbit",
                "ru": "Кролик мертвый в пакете"
            },
            "svgKey": "string",
            "isPushed": "TRUE"
        },
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
            "isPushed": "true"
        }
  ]
}
```
response:
```json
{
    "id": 15,
    "name": "test_test",
    "products": [
        {
            "quantity": 40,
            "category": {
                "en": "milk",
                "ru": "молоко"
            },
            "name": {
                "en": "Rabbit",
                "ru": "Кролик мертвый в пакете"
            },
            "svgKey": "string",
            "isPushed": "TRUE"
        },
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
            "isPushed": "true"
        }
    ],
    "created_at": "2024-07-04T21:09:00.738579+03:00",
    "updated_at": "2024-07-04T21:10:13.670725+03:00",
    "owner_permissions_read": true,
    "owner_permissions_write": true,
    "owner_permissions_admin": true,
    "shared_with_permissions_read": null,
    "shared_with_permissions_write": null,
    "shared_with_permissions_admin": null,
    "owner_id": 2,
    "shared_with_id": null
}
```
or
```json
{
    "error": true,
    "details": {
        "ru": "У этого пользователя нет записи с этим id",
        "en": "The user does not have a record with this ID"
    }
}
```
<hr>

#### PATCH (update) ^/api/v1/api/v1/custom-product/id:int/
```json
{
    "user": 2,

    "owner_permissions_read": true,
    "owner_permissions_write": true,
    "shared_with_id": 1,
    "shared_with_permissions_read": true,
    "shared_with_permissions_write": true,
    "shared_with_permissions_admin": true
}
```
response:
```json
{
    "id": 15,
    "name": "test_test",
    "products": [
        {
            "quantity": 40,
            "category": {
                "en": "milk",
                "ru": "молоко"
            },
            "name": {
                "en": "Rabbit",
                "ru": "Кролик мертвый в пакете"
            },
            "svgKey": "string",
            "isPushed": "TRUE"
        },
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
            "isPushed": "true"
        }
    ],
    "created_at": "2024-07-04T21:09:00.738579+03:00",
    "updated_at": "2024-07-04T21:10:28.801438+03:00",
    "owner_permissions_read": true,
    "owner_permissions_write": true,
    "owner_permissions_admin": true,
    "shared_with_permissions_read": true,
    "shared_with_permissions_write": true,
    "shared_with_permissions_admin": true,
    "owner_id": 2,
    "shared_with_id": 1
}
```
or 
```json
{
    "error": true,
    "details": {
        "ru": "У этого пользователя нет записи с этим id",
        "en": "The user does not have a record with this ID"
    }
}
```
#### DELETE ^/api/v1/api/v1/products-list-data/id:int/
body json
```json
{
	"user": 2
}
```
response status 204
or
```json
{
    "error": true,
    "details": {
        "ru": "У этого пользователя нет записи с этим id",
        "en": "The user does not have a record with this ID"
    }
}
```
