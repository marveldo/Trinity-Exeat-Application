from rest_framework.response import Response
from rest_framework.generics import ListAPIView,CreateAPIView,GenericAPIView,UpdateAPIView,DestroyAPIView
from rest_framework.mixins import ListModelMixin
from .serializers import Userserializer,CreateExeatSerializer,MyTokenObtainPairSerializer,ExeatSerializer,FullExeatSerailizer,UpdateExeatSerializer,PendingExeatSerializer
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
    renderer_classes = [JSONRenderer]

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
    renderer_classes = [JSONRenderer]
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
    renderer_classes = [JSONRenderer]
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
    
class GetpendingExeats( ListModelMixin, GenericAPIView):
    serializer_class = FullExeatSerailizer
    permission_classes = [CustomAdminpermission]
    renderer_classes = [JSONRenderer]
    def get_queryset(self):
        queryset = ExeatRequest.objects.filter(pending = True)
        
        if self.request.GET.get('search'):
            queryset = ExeatRequest.objects.filter(pending = True, fullname__icontains = self.request.GET.get('search'))
        return queryset
    def get(self,request,*args, **kwargs):
        return self.list(request, *args, **kwargs)
    
        
    def list(self, request, *args, **kwargs):
        exeats = self.get_queryset()
        serializer = self.get_serializer(exeats, many = True)
        count = exeats.count()
        res = {
            'status' : 'ok',
            'count' : count,
            'data' : serializer.data
        }
        return Response(res)
    
class UpdateExeatsInfo(UpdateAPIView):
    queryset = ExeatRequest.objects.all()
    serializer_class = UpdateExeatSerializer
    permission_classes = [CustomAdminpermission]
    renderer_classes = [JSONRenderer]

    def update(self, request, *args, **kwargs):
        exeat = self.get_object()
        serializer = self.get_serializer(exeat , data = request.data , partial = True)
        if serializer.is_valid(raise_exception = True):
            self.perform_update(serializer)
            res = {
                'status' : 'ok',
                'data' : serializer.data,

            }
            return Response(res)
        
class UserpendingExeat(GenericAPIView):
    serializer_class = PendingExeatSerializer
    permission_classes = [IsAuthenticated]
    renderer_classes = [JSONRenderer]

    def get_queryset(self):
        queryset = ExeatRequest.objects.filter(user = self.request.user , pending = True)
        return queryset
        
    
    def get(self,request, *args, **kwargs):
        exeat = self.get_queryset()
        serializer = self.get_serializer(exeat , many = True)
        res = {
            'status': 'success',
            'data' : serializer.data
        }
        return Response(res)
    
class DeleteUserExeat(DestroyAPIView):
    queryset = ExeatRequest.objects.all()
    serializer_class = PendingExeatSerializer
    permission_classes = [IsAuthenticated]
    renderer_classes = [JSONRenderer]


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        res ={
            'status': 'ok'
        }
        return Response(res)
    
    
    




        

        


  


    
    
              




        
        
            
            




            


