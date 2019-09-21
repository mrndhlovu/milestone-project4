from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
import stripe
from datetime import datetime


stripe.api_key = settings.STRIPE_SECRET_KEY

User = settings.AUTH_USER_MODEL

MEMBERSHIP_OPTIONS = (
    ('free', 'Free'),
    ('pro', 'Professional')
)


class Membership(models.Model):
    slug = models.SlugField()
    membership_type = models.CharField(
        choices=MEMBERSHIP_OPTIONS, max_length=50, null=True, default='free')
    price = models.IntegerField(default=10)
    stripe_plan_id = models.CharField(max_length=40)

    def __str__(self):
        return self.membership_type


class UserMembership(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    stripe_customer_id = models.CharField(max_length=20)
    is_pro_member = models.BooleanField(default=False, null=True)
    membership = models.ForeignKey(
        Membership, on_delete=models.SET_NULL, null=True)
    date_signedup = models.DateField(auto_now=True, null=True)

    def __str__(self):
        return self.user.username

    def get_selected_membership(self):
        return self.membership

    def get_membership_total(self):
        return self.sum([membership.Membership.price for member in self.membership.all()])


def post_save_create_user_membership(sender, instance, created, *args, **kwargs):
    if created:
        UserMembership.objects.get_or_create(user=instance)

    user_membership, created = UserMembership.objects.get_or_create(
        user=instance)

    if user_membership.stripe_customer_id is None or user_membership.stripe_customer_id == '':
        new_customer_key = stripe.Customer.create(email=instance.email)
        try:
            default_membership = Membership.objects.get(membership_type="free")
        except Membership.DoesNotExist:
            default_membership = None
        user_membership.stripe_customer_id = new_customer_key["id"]
        user_membership.membership = default_membership
        user_membership.save()


post_save.connect(post_save_create_user_membership, sender=User)


class Subscription(models.Model):
    user_membership = models.ForeignKey(
        UserMembership, on_delete=models.CASCADE)
    stripe_subscription_id = models.CharField(max_length=40)
    is_active = models.BooleanField(default=-True)
    date_added = models.DateTimeField(auto_now=True, null=True)
    date_subscribed = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.user_membership.user.username

    @property
    def get_created_date(self):
        subscription = stripe.Subscription.retrieve(
            self.stripe_subscription_id)
        return datetime.fromtimestamp(subscription.created)

    @property
    def get_next_billing_date(self):
        subscription = stripe.Subscription.retrieve(
            self.stripe_subscription_id)

        return datetime.fromtimestamp(subscription.current_period_end)
