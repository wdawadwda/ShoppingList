from django.urls import path
from .views import CustomUserView, AcceptCustomBillTextView

from .views import UserSettingsView, BillView

urlpatterns = [
    # path('api/register/', CreateUserView.as_view(), name='create_user'),
    path('user-settings/<int:pk>/', UserSettingsView.as_view(), name='userSettings'),
    path('send-bill/', BillView.as_view(), name='Bill'),
    path('accept-bill-text/<int:pk>/', AcceptCustomBillTextView.as_view(), name='acceptCustomBillTextView'),

]
