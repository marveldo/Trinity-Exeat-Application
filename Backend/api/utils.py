

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


    

