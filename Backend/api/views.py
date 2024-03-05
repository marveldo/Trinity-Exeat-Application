from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView,CreateAPIView
from .serializers import Codeserializer,Userserializer,CreateExeatSerializer
from .models import Users,ExeatRequest
from .utils import Confirm_student_code, Confirm_admin_code, CustomizingAccess, CustomizingRefresh
from rest_framework.renderers import JSONRenderer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class UserLogin(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

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
            refresh_token = CustomizingRefresh.for_user(user)
            access_token = CustomizingAccess.for_user(user)
            res = {
                "refresh" : str(refresh_token),
                "access": str(access_token)
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
        
class CreateExeatRequestView(CreateAPIView):
    queryset = ExeatRequest.objects.all()
    serializer_class = CreateExeatSerializer
    permission_classes = [IsAuthenticated]
   
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            created = self.perform_create(serializer)
            if created == True:
                res = {
                'status': 'succesful',
                'code' : status.HTTP_201_CREATED
               }
                return Response(res)
            else :
                return Response("You already Have a pending request", status=status.HTTP_400_BAD_REQUEST)
    def perform_create(self, serializer):
        try:
            latest_request = ExeatRequest.objects.filter(user = self.request.user).latest()
            if latest_request.pending == True :
               return False
            else :
               user = self.request.user
               self.handle_saves(user, serializer)
               return True
        except:
            user = self.request.user
            self.handle_saves(user, serializer)
            return True
    def handle_saves(self, user, serializer):
        request_made = serializer.save(user = user)
        user.level = request_made.level
        user.course_of_study = request_made.course_of_study
        user.save()
              




        
        
            
            




            


