from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404
import uuid
from django.contrib.auth import get_user_model


class Cart(models.Model):
    user = models.OneToOneField(
        get_user_model(), primary_key=True, on_delete=models.CASCADE,)
    is_paid = models.BooleanField(default=False, null=True)

    def add_item(self, product) -> 'CartItem':
        product_content_type = ContentType.objects.get_for_model(product)

        return CartItem.objects.create(
            cart=self,
            product_content_type=product_content_type,
            product_object_id=product.pk,
        )

    def __str__(self):
        return self.user.username


class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='items',
    )
    product_object_id = models.IntegerField()
    product_content_type = models.ForeignKey(
        ContentType,
        on_delete=models.PROTECT,
    )
    product = GenericForeignKey(
        'product_content_type',
        'product_object_id',
    )

    def __str__(self):
        return self.product_content_type.name

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_ticket_price()
        return total


class CartPayment(models.Model):
    stripe_charge_id = models.CharField(max_length=50)
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Donation(models.Model):
    stripe_charge_id = models.CharField(max_length=50)
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
