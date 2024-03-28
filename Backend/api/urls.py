from django.urls import path
from .views import RegisterUser,UserLogin,CreateExeatRequestView,ListExeatsHistory,GetpendingExeats,UpdateExeatsInfo,UserpendingExeat,DeleteUserExeat
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('register/', RegisterUser.as_view()),
    path('login/',UserLogin.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('Exeatrequest/', CreateExeatRequestView.as_view()),
    path('ExeatHistory/', ListExeatsHistory.as_view()),
    path('AllpendingExeats/', GetpendingExeats.as_view()),
    path('update/<str:pk>/', UpdateExeatsInfo.as_view()),
    path('pending/', UserpendingExeat.as_view()),
    path('delete/<str:pk>/',DeleteUserExeat.as_view())
   
    
]
