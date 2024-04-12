from django.db.models.signals import post_save
from .models import ExeatRequest,Users
from django.core.mail import send_mail
from django.conf import settings





def Exeatrequestmade(instance,created,**kwargs):
    
    if created :
         
        exeat = instance
        admins = Users.objects.filter(is_admin = True)
        admins_email = [admin.email for admin in admins]
        try :
            send_mail(
            subject='EXEAT REQUEST MADE',
            message=f'{exeat.fullname} from {exeat.hall} hostel made a request for an exeat  head over to https://marveldo.github.io/Trinity-Exeat-Application/#/admin/pendingExeats to check it out',
            from_email= settings.EMAIL_HOST_USER,
            recipient_list=admins_email
            )
        except Exception as e :
            print(f'The error is : {e}')

def Exeatrequestupdated(instance, created, **kwargs):

    if not created :
        print('Exeat signal ran')
        exeat = instance
        if exeat.accepted == True :
            print('Approved')
            try:
                send_mail(
                    subject='EXEAT REQUEST ACCEPTED',
                    message=f'Dear {instance.fullname} your exeat has been approved hers your receipt',
                    from_email= settings.EMAIL_HOST_USER,
                    recipient_list=[exeat.user.email]
                )
            except Exception as e :
                print(f'The error is : {e}')
        else :
            print('rejected')
            try:
                send_mail(
                    subject='EXEAT REQUEST REJECTED',
                    message=f'Dear {instance.fullname} your exeat has been rejected contact Mr richard ',
                    from_email= settings.EMAIL_HOST_USER,
                    recipient_list=[exeat.user.email]
                )
            except Exception as e :
                print(f'The error is : {e}')
           


       
post_save.connect(Exeatrequestmade, sender= ExeatRequest)
post_save.connect(Exeatrequestupdated, sender = ExeatRequest)


