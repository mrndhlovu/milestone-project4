from django.conf import settings
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)


class UserManager(BaseUserManager):
    def create_user(self, email, username, full_name=None, password=None, is_admin=False, is_staff=False, user_is_active=True, ):
        if not username:
            raise ValueError("Users must have a username")
        if not email:
            raise ValueError("Users must have an email address")
        if not password:
            raise ValueError("Users must have a password")

        user = self.model(email=self.normalize_email(email),
                          full_name=full_name, username=username)
        user.set_password(password)
        user.username = username
        user.staff = is_staff
        user.admin = is_admin
        user.user_is_active = user_is_active
        user.save(using=self._db)
        return user

    def create_user_is_staff(self, username, password=None):
        user = self.create_user(username, password=password, is_staff=True)
        return user

    def create_user_is_superuser(self, username, password=None):
        user = self.create_user(
            username, password=password, is_staff=True, is_admin=True)
        return user


class CustomUser(AbstractBaseUser):
    email = models.EmailField(max_length=100, unique=True)
    username = models.CharField(max_length=100, blank=True, null=True)
    full_name = models.CharField(max_length=100, blank=True, null=True)
    user_is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email


def post_save_user_create_reciever(sender, instance, created, *args, **kwargs):
    if created:
        CustomUser.objects.create(user=instance)


post_save.connect(post_save_user_create_reciever, sender=CustomUser)
