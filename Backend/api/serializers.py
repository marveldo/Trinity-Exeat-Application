from rest_framework import serializers
from .models import Users,ExeatRequest
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class Codeserializer(serializers.Serializer):
    code = serializers.CharField(required = True)
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        
        token['fullname'] = user.fullname
        token['matric_no'] = user.matric_no
        token['email'] = user.email 
        token['is_staff'] = user.is_staff
        token['is_admin'] = user.is_admin
        token['level'] = user.level
        token['course_of_study'] = user.course_of_study
        return token
class Userserializer(serializers.ModelSerializer):
    
    code = serializers.CharField(required = True)
    class Meta :
        model = Users
        fields = ['code','fullname', 'matric_no', 'email','password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Users(fullname = validated_data['fullname'], matric_no = validated_data['matric_no'], email = validated_data['email'] )
        user.set_password(validated_data['password'])
        user.save()
        return user

    
class CreateExeatSerializer(serializers.ModelSerializer):
    class Meta :
        model = ExeatRequest
        exclude = ['pending', 'accepted', 'user']
    





        

