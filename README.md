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

```


#### POST ^/api/v1/api/v1/custom-product/
```json
{
    "barcode": "000000",
    "name_en": "Milk of my Dreams, 450g",
    "name_ru": "Молоко моих грез, 450 г",
    "unit": "kg",
    "svgKey": "svg",
    "category_ru": "Молоко",
    "category_en": "Milk",
    "isPushed": true
}
```
#### GET (all) ^/api/v1/api/v1/custom-product/
#### GET (by id) ^/api/v1/api/v1/custom-product/id:int/
#### PUT (update) ^/api/v1/api/v1/custom-product/id:int/
```json
{
    "barcode": "000000",
    "name_en": "Milk of my Dreams, 450g",
    "name_ru": "Молоко моих грез, 450 г",
    "unit": "kg",
    "svgKey": "svg",
    "category_ru": "Молоко",
    "category_en": "Milk",
    "isPushed": true
}
```
#### PATCH (update) ^/api/v1/api/v1/custom-product/id:int/
```json
{
    "isPushed": false
}
```
#### DELETE ^/api/v1/api/v1/custom-product/id:int/

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


#### POST ^/api/v1/products-list-data/
```json
{
  "owner_id": 1,
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
  ]
}
```
#### GET (all) ^/api/v1/products-list-data
#### GET (by id) ^/api/v1/products-list-data/id:int/
#### PUT (update) ^/api/v1/products-list-data/id:int/
```json
{
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
  ]
}
  
```
#### PATCH (update) ^/api/v1/api/v1/custom-product/id:int/
```json
{
    "owner_permissions_write": false,
		"shared_with_id": 1,
		"shared_with_permissions_read": true,
		"shared_with_permissions_write": true,
		"shared_with_permissions_admin": false
}
```
#### DELETE ^/api/v1/api/v1/products-list-data/id:int/

