from rest_framework import serializers
from cart.models import Cart, CartItem
from django.conf import settings


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'
