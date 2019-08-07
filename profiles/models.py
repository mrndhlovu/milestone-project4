
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save, pre_save
from memberships.models import UserMembership
from memberships.models import Subcription
from memberships.models import Membership

User = settings.AUTH_USER_MODEL


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    UserMembership = models.ManyToManyField(UserMembership)
    Membership = models.ManyToManyField(Membership)
    Subcription = models.ManyToManyField(Subcription)

    def __str__(self):
        return self.user.email


def user_profile_receiver(sender, instance, created, *args, **kwargs):
    if created:
        user_profile = UserProfile.objects.create(user=instance)


post_save.connect(user_profile_receiver, sender=User)
