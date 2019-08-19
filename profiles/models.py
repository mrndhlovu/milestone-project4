
from django.conf import settings
from django.db import models
# from products.models import Product
from accounts.models import CustomUser
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from memberships.models import Subcription, Membership


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    occupation = models.CharField(max_length=30, blank=True)
    Membership = models.ManyToManyField(Membership)

    # Product = models.ManyToManyField(Product)

    def __str__(self):
        return self.user.email


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()
