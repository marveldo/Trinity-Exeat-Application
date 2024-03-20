from django.urls import path
from .views import RegisterUser,UserLogin,CreateExeatRequestView,ListExeatsHistory
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('register/', RegisterUser.as_view()),
    path('login/',UserLogin.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('Exeatrequest/', CreateExeatRequestView.as_view()),
    path('ExeatHistory/', ListExeatsHistory.as_view())
   
    
]
