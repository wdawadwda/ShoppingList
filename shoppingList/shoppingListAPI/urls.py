from django.urls import path
from .views import CustomUserView, CustomBillTextView, GetBillsHistoryView, TestSendBillView, ProductsListDataView, \
    CustomProductView

from .views import UserSettingsView, BillView
from .views_common.create_user import UserCreateView

urlpatterns = [
    # path('api/register/', CreateUserView.as_view(), name='create_user'),
    path('user-settings/<int:pk>/', UserSettingsView.as_view(), name='userSettings'),
    path('send-bill/', BillView.as_view(), name='Bill'),
    path('accept-bill-text/', CustomBillTextView.as_view(), name='acceptCustomBillTextView'),

    path('bill-history/<int:pk>/', GetBillsHistoryView.as_view(), name='getBillsHistoryView'),
    path('bill-history/', GetBillsHistoryView.as_view(), name='getBillsHistoryView'),

    path('test-send-bill/', TestSendBillView.as_view(), name='getBillsHistoryView'),

    path('products-list-data/<int:pk>/', ProductsListDataView.as_view(), name='productsListDataView'),
    path('products-list-data/', ProductsListDataView.as_view(), name='productsListDataView'),

    path('custom-product/<int:pk>/', CustomProductView.as_view(), name='customProduct'),
    path('custom-product/', CustomProductView.as_view(), name='customProduct'),

    path('auth/test-create-user/', UserCreateView.as_view({
        'get': 'list',
        'post': 'create'
    })),

]
