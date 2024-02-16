from rest_framework import serializers
from .models import Users


class Codeserializer(serializers.Serializer):
    code = serializers.CharField(required = True)
    


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




        

