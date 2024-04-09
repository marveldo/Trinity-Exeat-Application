from django.db import models

from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
# Create your models here.
from decimal import Decimal
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField


class CustomUserManager(BaseUserManager):
    
    def create_user(self, matric_no, password, **extra_fields):
        
        if not matric_no:
            raise ValueError("The Matric Number must be set")
        user = self.model(matric_no = matric_no, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, matric_no, password, **extra_fields):
        
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_admin",True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        if extra_fields.get("is_admin") is not True:
            raise ValueError("Is_admin must be True")
        return self.create_user(matric_no, password, **extra_fields)

class Level (models.IntegerChoices):
     HUNDRED = '100'
     TWO_HUNDRED = '200'
     THREE_HUNDRED ='300'
     FOUR_HUNDRED = '400'
     FIVE_HUNDRED = '500' 

class Hostels (models.TextChoices):
    MARY_HALL = 'Mary'
    DEBORAH_HALL = 'Deborah'
    ESTHER_HALL = 'Esther'
    DANIEL_HALL = 'Daniel'
    JOSEPH_HALL = 'Joseph'
       

class Users(AbstractBaseUser,PermissionsMixin):
    fullname = models.CharField(max_length = 120, blank = True , null = True)
    matric_no = models.CharField(unique = True , max_length=300, blank= True, null=True)
    level = models.IntegerField(blank = True , null = True , choices = Level.choices)
    course_of_study = models.CharField(max_length = 200, blank = True , null = True)
    hall = models.CharField(max_length = 120 , blank=True , null = True, choices = Hostels.choices )
    email = models.EmailField(_("email address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "matric_no"
    REQUIRED_FIELDS = ["email",'fullname']

    objects = CustomUserManager()

    def __str__(self):
        return str(self.matric_no)
    

class ExeatRequest(models.Model) :
    
    user = models.ForeignKey(Users, blank = True, null =True , on_delete = models.CASCADE)
    fullname =  fullname = models.CharField(max_length = 120, blank = True , null = True)
    matric_no = models.CharField(blank= True, max_length=300, null=True)
    level = models.IntegerField(blank = True , null = True , choices = Level.choices)
    course_of_study = models.CharField(max_length = 200, blank = True , null = True)
    hall = models.CharField(max_length = 120 , blank=True , null = True, choices = Hostels.choices )
    purpose_for_exeat = models.TextField(blank = True ,  null = True)
    guardians_phonenumber = PhoneNumberField(blank = True, null = True)
    destination = models.TextField(blank = True , null = True)
    days = models.IntegerField(blank = True, null = True)
    pending = models.BooleanField(blank = True , null = True, default = True)
    accepted = models.BooleanField(blank = True, null = True, default = False )
    accepted_by = models.CharField(max_length = 200 , blank = True , null = True)
    date_accepted = models.DateField(blank = True , null = True)
    created = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return self.purpose_for_exeat
    
    class Meta:
        ordering = ['-created']
        get_latest_by = 'created'
    
    