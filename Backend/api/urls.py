from django.urls import path
from .views import Confirmregistercodes,RegisterUser

urlpatterns = [
    path('', Confirmregistercodes.as_view()),
    path('register/', RegisterUser.as_view())
]