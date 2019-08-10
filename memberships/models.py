from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
import stripe

# Create your models here.


stripe.api_key = settings.STRIPE_SECRET_KEY

User = settings.AUTH_USER_MODEL

MEMBERSHIP_OPTIONS = (
    ('free', 'Free'),
    ('pro', 'Professional'),
)


class Membership(models.Model):
    slug = models.SlugField()
    membership_option = models.CharField(
        choices=MEMBERSHIP_OPTIONS, default='free', max_length=50)
    price = models.IntegerField(default=10)
    stripe_plan_id = models.CharField(max_length=40)

    def __str__(self):
        return self.membership_option


class UserMembership(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    membership_stripe_user_id = models.CharField(max_length=50)
    membership = models.ForeignKey(
        Membership, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.user.username


def post_save_create_user_membership(sender, instance, created, *args, **kwargs):
    user_membership, created = UserMembership.objects.get_or_create(
        user=instance)

    if user_membership.membership_stripe_user_id is None or user_membership.membership_stripe_user_id == '':
        new_customer_id = stripe.Customer.create(email=instance.email)
        user_membership.membership_stripe_user_id = new_customer_id['id']
        user_membership.save()


post_save.connect(post_save_create_user_membership, sender=User)


class Subcription(models.Model):
    membership_user = models.ForeignKey(
        UserMembership, on_delete=models.CASCADE)
    stripe_user_id = models.CharField(max_length=50)
    is_active = models.BooleanField(default=-True)

    def __str__(self):
        return self.membership_user.user.username
