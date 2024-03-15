from rest_framework.permissions import  BasePermission,SAFE_METHODS

class CustomAdminpermission(BasePermission):
  
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return request.user.is_admin
        else:
            return False