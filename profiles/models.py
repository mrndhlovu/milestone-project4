
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save, pre_save
from products.models import Product
from memberships.models import Subcription, UserMembership, Membership
from accounts.models import CustomUser


User = settings.AUTH_USER_MODEL


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    Subcription = models.ManyToManyField(Subcription)
    Product = models.ManyToManyField(Product)

    def __str__(self):
        return self.user.username


def user_profile_receiver(sender, instance, created, *args, **kwargs):
    if created:
        user_profile = UserProfile.objects.create(user=instance)


post_save.connect(user_profile_receiver, sender=User)
