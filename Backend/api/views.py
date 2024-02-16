from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView,CreateAPIView
from .serializers import Codeserializer,Userserializer
from .models import Users
from .utils import Confirm_student_code, Confirm_admin_code
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.renderers import JSONRenderer

# Create your views here.

class Confirmregistercodes(GenericAPIView):

    serializer_class = Codeserializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)

        if serializer.is_valid(raise_exception = True):
            code = serializer.data.get('code')
            student_verification = Confirm_student_code(code)
            Admin_verification = Confirm_admin_code(code)
            res = {
                'Student': student_verification,
                'Admin' : Admin_verification
            }
            return Response(res)


class RegisterUser(CreateAPIView):
    queryset = Users.objects.all()
    serializer_class = Userserializer
    # renderer_classes = [JSONRenderer]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            code = serializer.validated_data['code']
            self.perform_create(code, serializer)
            user = serializer.instance
            refresh_token = RefreshToken.for_user(user)
            access_token = AccessToken.for_user(user)
            res = {
                'response' : "ok",
                "status" : "success",
                'fullname': user.fullname,
                "matric_no" : user.matric_no,
                "email" : user.email,
                "is_admin": user.is_admin,
                "is_staff" : user.is_staff,
                "refresh_token" : str(refresh_token),
                "access_token": str(access_token)
            }
            return Response(res)

    def perform_create(self,code, serializer):
        student_verification = Confirm_student_code(code)
        admin_verification = Confirm_admin_code(code)

        if student_verification == True :
            serializer.save()
        elif admin_verification == True:
            user = serializer.save()
            user.is_admin = True
            user.is_staff = True
            user.save()
        else : 
            return Response("Code isnt correct")
        
            
            




            


