
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save, pre_save
from accounts.models import CustomUser

User = settings.AUTH_USER_MODEL


class ProfileManager(models.Manager):
    def new_or_get(self, request):
        user = request.user
        email_id = request.session.get('email')
        created = False
        data_object = None

        if user.is_authenticated():
            'logged in user checkout; remember payment stuff'
            data_object, created = self.model.objects.get_or_create(
                user=user, email=user.email)
        elif email_id is not None:
            'guest user checkout; auto reloads payment stuff'
            guest_email_obj = CustomUser.objects.get(id=user)
            data_object, created = self.model.objects.get_or_create(
                email=guest_email_obj.email)
        else:
            pass
        return data_object, created


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)

    objects = ProfileManager()

    def __str__(self):
        return self.user.email


def user_created_receiver(sender, instance, created, *args, **kwargs):
    if created and instance.email:
        UserProfile.objects.get_or_create(
            user=instance, id=instance.id)


post_save.connect(user_created_receiver, sender=User)
