from django.urls import path

from .views import UserSettingsView

urlpatterns = [
    # path('api/register/', CreateUserView.as_view(), name='create_user'),
    path('user-settings/<int:pk>/', UserSettingsView.as_view(), name='userSettings'),

]
