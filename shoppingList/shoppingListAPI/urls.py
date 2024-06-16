from django.urls import path
from .views import CustomUserView, CustomBillTextView, GetBillsHistoryView

from .views import UserSettingsView, BillView

urlpatterns = [
    # path('api/register/', CreateUserView.as_view(), name='create_user'),
    path('user-settings/<int:pk>/', UserSettingsView.as_view(), name='userSettings'),
    path('send-bill/', BillView.as_view(), name='Bill'),
    path('accept-bill-text/', CustomBillTextView.as_view(), name='acceptCustomBillTextView'),
    path('bill-history/<int:pk>/', GetBillsHistoryView.as_view(), name='getBillsHistoryView'),
    path('bill-history/', GetBillsHistoryView.as_view(), name='getBillsHistoryView'),

]
