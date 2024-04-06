from django.contrib import admin
from django.urls import path , include
from api.views import CreateUserview
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.urls import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/",CreateUserview.as_view(), name="register"),
    path("api/token/",TokenObtainPairView.as_view(), name="token"),
    path("api/token/refresh/",TokenRefreshView.as_view(), name="refresh"),
    path("api-auth",include("rest_framework.urls")),
    path("api/", include("api.urls")),
]