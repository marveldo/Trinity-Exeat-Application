from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import ListAPIView,CreateAPIView
from .serializers import Userserializer,CreateExeatSerializer,MyTokenObtainPairSerializer,ExeatSerializer
from .models import Users,ExeatRequest
from rest_framework.renderers import JSONRenderer
from rest_framework_simplejwt.views import TokenObtainPairView 
from rest_framework import status
from .permission import CustomAdminpermission
from rest_framework.permissions import IsAuthenticated


class UserLogin(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
class RegisterUser(CreateAPIView):
    queryset = Users.objects.all()
    serializer_class = Userserializer
    permission_classes = [CustomAdminpermission]
    # renderer_classes = [JSONRenderer]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
    
            self.perform_create(serializer)
            res = {
                "code": status.HTTP_201_CREATED,
                "data": serializer.data
            }
            return Response(res)
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
            else:
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
        user.hall = request_made.hall
        user.save()
class ListExeatsHistory(ListAPIView):
    serializer_class = ExeatSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self,request):
        queryset = ExeatRequest.objects.filter(user = request.user, pending = False, accepted = True)
        if request.GET.get('date') :
            try:
               queryset = ExeatRequest.objects.filter(user = request.user , pending = False, accepted = True , created__date = request.GET.get('date'))
            except :
                queryset = ExeatRequest.objects.filter(user = request.user, pending = False, accepted = True)
                return queryset
        return queryset
      
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset(request=request)
        serializer = self.get_serializer(queryset, many=True)
        res = {
            'status': 'ok',
            'data': serializer.data
        }
        return Response(res)
    
    
              




        
        
            
            




            


