
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save, pre_save
from accounts.models import CustomUser
from products.models import Product

User = settings.AUTH_USER_MODEL


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    products = models.ManyToManyField(Product)

    def __str__(self):
        return self.user.email


def user_profile_receiver(sender, instance, created, *args, **kwargs):
    if created:
        user_profile = UserProfile.objects.create(user=instance)


post_save.connect(user_profile_receiver, sender=settings.AUTH_USER_MODEL)
