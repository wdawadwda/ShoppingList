from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView, TokenObtainPairView

from shoppingListAPI.views import CustomUserView, TestUserCreateView
# from views_common.create_user import UserCreateView


urlpatterns = [
    path('admin/', admin.site.urls),

    # path('auth/', include('djoser.urls.authtoken')),
    # path('auth/', include('djoser.urls.jwt')),
    path('auth/users/me/', CustomUserView.as_view(), name='custom_user_me'),
    # path('auth/', include('djoser.urls')),

    # path('auth/', include('djoser.urls.jwt')),
    # path('auth/', include('rest_framework.urls')),

    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('api/v1/', include('shoppingListAPI.urls')),
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns += [
#     path('auth/test-create-user/', TestUserCreateView.as_view(), name='test_create_user'),
# ]

# if settings.DEBUG:
#     urlpatterns += static(settings.SITE_URL, document_root=settings.SITE_ROOT)
