from django.conf import settings
from django.contrib.auth.base_user import (AbstractBaseUser, BaseUserManager)
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _
from memberships.models import Membership


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, username, password, ** extra_fields):

        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must have a value set to True to is_superuser')

        return self._create_user(email, password, extra_fields)


class CustomUser(AbstractBaseUser):
    email = models.EmailField(max_length=100, unique=True)
    username = models.CharField(max_length=100, blank=True, null=True)
    first_name = models.CharField(max_length=40, blank=True, null=True)
    last_name = models.CharField(max_length=40, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(
        _('date joined'), auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_username(self):
        return self.username


def post_save_user_create_reciever(sender, instance, created, *args, **kwargs):
    if created:
        CustomUser.objects.create(user=instance)


post_save.connect(post_save_user_create_reciever, sender=CustomUser)


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    occupation = models.CharField(max_length=30, blank=True)

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
