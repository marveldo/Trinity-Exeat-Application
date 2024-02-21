from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

class CustomJWTAuthentication(JWTAuthentication):
    def get_serializer(self):
        return MyTokenObtainPairSerializer()