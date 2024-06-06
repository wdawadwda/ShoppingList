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

