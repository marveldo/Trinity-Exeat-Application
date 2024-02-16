from django.db import models

from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
# Create your models here.
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    
    def create_user(self, matric_no, password, **extra_fields):
        
        if not matric_no:
            raise ValueError("The Matric Number must be set")
        try :
            int(matric_no)
        except : 
            raise ValueError('MatricNumber doesnt posssess letters')
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
    

class Users(AbstractBaseUser,PermissionsMixin):
    fullname = models.CharField(max_length = 120, blank = True , null = True)
    matric_no = models.IntegerField(unique = True , blank= True, null=True)
    email = models.EmailField(_("email address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)

    USERNAME_FIELD = "matric_no"
    REQUIRED_FIELDS = ["email"]

    objects = CustomUserManager()

    def __str__(self):
        return str(self.matric_no)