from rest_framework_simplejwt.tokens import AccessToken, Token, RefreshToken



class CustomizingAccess(AccessToken):

    @classmethod
    def for_user(cls, user) -> Token:
        token = super().for_user(user)
        token['fullname'] = user.fullname
        token['matric_no'] = user.matric_no
        token['email'] = user.email
        token['is_staff'] = user.is_staff
        token['is_admin'] = user.is_admin

        return token
    
class CustomizingRefresh(RefreshToken):

    @classmethod
    def for_user(cls, user) -> Token:
        token =  super().for_user(user)
        token['fullname'] = user.fullname
        token['matric_no'] = user.matric_no
        token['email'] = user.email
        token['is_staff'] = user.is_staff
        token['is_admin'] = user.is_admin

        return token

def Confirm_student_code(code):
    try:
        informedcode = int(code)
    except:
        return False
    Student_code = 100011
    if informedcode == Student_code:
        return True
    else :
        return False
    
def Confirm_admin_code(code):
    try:
        informedcode = int(code)
    except:
        return False
    Admin_code = 102111
    if informedcode == Admin_code:
        return True
    else:
        return False


    

