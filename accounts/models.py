from django.conf import settings
from django.contrib.auth.base_user import (AbstractBaseUser, BaseUserManager)
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.shortcuts import get_list_or_404, get_object_or_404
from django.dispatch import receiver
from memberships.models import Membership, UserMembership
from tickets.models import Ticket
from cart.models import Donation
import stripe
import os


stripe.api_key = settings.STRIPE_SECRET_KEY


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
        ('date joined'), auto_now_add=True)

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
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    occupation = models.CharField(max_length=30, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    active_membership = models.ManyToManyField(Membership, blank=True)
    paid_tickets = models.ManyToManyField(Ticket, blank=True)
    image = models.CharField(max_length=200, blank=True, null=True,
                             default=os.environ.get('UNICORN_DEFAULT_USER_IMAGE_URL'))

    def __str__(self):
        return self.user.username


def post_save_create_user_profile(sender, instance, created, *args, **kwargs):
    if created:
        UserProfile.objects.get_or_create(user=instance)

        user_profile, created = UserProfile.objects.get_or_create(
            user=instance)
        user_membership, created = UserMembership.objects.get_or_create(
            user=instance)

        if user_profile.stripe_customer_id is None or user_profile.stripe_customer_id == '':
            new_customer_key = stripe.Customer.retrieve(
                user_membership.stripe_customer_id)

            user_profile.stripe_customer_id = new_customer_key["id"]

            user_profile.save()


post_save.connect(post_save_create_user_profile, sender=User)
