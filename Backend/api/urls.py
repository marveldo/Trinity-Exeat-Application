from django.urls import path
from .views import Confirmregistercodes,RegisterUser,UserLogin
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('', Confirmregistercodes.as_view()),
    path('register/', RegisterUser.as_view()),
    path('login/',UserLogin.as_view()),
    path('refresh/', TokenRefreshView.as_view())
]