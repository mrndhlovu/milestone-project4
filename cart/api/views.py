from .serializers import CartSerializer, CartItemSerializer
from memberships.models import Membership, Subscription, UserMembership
from accounts.models import UserProfile
from tickets.models import Ticket
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import permissions, authentication, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from comments.models import Comment
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from accounts.models import UserProfile
from django.conf import settings
import stripe
import random
import string
import json
from django.utils import timezone
from cart.models import Cart, CartItem, CartPayment
from django.contrib.contenttypes.models import ContentType
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY


def get_active_cart(request):
    cart = Cart.objects.filter(user=request.user, is_paid=False)
    if cart.exists():
        return cart[0]
    return None


def get_paid_cart(request):
    cart = Cart.objects.filter(user=request.user, is_paid=True)
    if cart.exists():
        return cart[0]
    return None


def get_user_membership(request):
    user_membership_qs = UserMembership.objects.filter(user=request.user)

    if user_membership_qs.exists():
        return user_membership_qs.first()
    return None


def get_selected_membership(request):

    choosen_membership = UserMembership.objects.filter(
        user=request.user)

    if choosen_membership.exists():
        return choosen_membership[0]
    return None


def update_selected_membership(request, membership_type):

    choosen_membership = UserMembership.objects.filter(
        user=request.user)

    if choosen_membership.exists():
        selected_membership = choosen_membership[0]
        selected_membership.membership = membership_type
        selected_membership.save()

        return choosen_membership
    return None


def updated_user_membership(request, data):
    user_membership = get_user_membership(request)

    user_membership.is_pro_member = True
    user_membership.save()
    try:
        subscription_id = data['subscriptionId']
        subscription, created = Subscription.objects.get_or_create(
            user_membership=user_membership, is_active=True)
        subscription.stripe_subscription_id = subscription_id
        subscription.save()

        context = {
            'message': 'Successfully created {} membership'.format(
                user_membership.membership),
            'membership': str(user_membership.membership)
        }

        return context
    except:
        return None


def get_subscription_id(request, data):

    user_membership = get_user_membership(request)

    try:
        choosen_membership = get_object_or_404(
            Membership, id=data['product_id'])

    except:
        return None
    try:
        token = data['stripeToken']

        customer = stripe.Customer.retrieve(
            user_membership.stripe_customer_id)
        customer.source = token

        subscription = stripe.Subscription.create(
            customer=user_membership.stripe_customer_id,
            items=[
                {
                    "plan": choosen_membership.stripe_plan_id
                }
            ]
        )

        subscription_id = subscription.id

        return subscription_id

    except:
        return None


class AddToCartAPIView(ListAPIView):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        request_data = json.loads(request.body.decode('utf-8'))

        product_id = request_data['product_id']
        product_object = request_data['product']
        cart = get_active_cart(request)
        subscription_id = None

        if product_object == 'ticket':
            product = get_object_or_404(
                Ticket, id=product_id)
        else:
            product = get_object_or_404(
                Membership, id=product_id)
            subscription_id = get_subscription_id(request, request_data)
            if product.id == 2:
                product.membership_type = 'pro'

            update_selected_membership(request, product)

        if cart is not None and cart.is_paid is False:
            product_content_type = ContentType.objects.get_for_model(product)
            pending_orders_qs = CartItem.objects.filter(
                product_content_type=product_content_type)

            cart.add_item(product)

            context = {
                'message': 'Item added to cart',
                'subscription_id': subscription_id
            }
            return JsonResponse(context, status=status.HTTP_200_OK)
        try:
            cart, created = Cart.objects.get_or_create(user=request.user)
            cart.add_item(product)

            context = {
                'message': 'Item added to cart',
                'subscription_id': subscription_id
            }
            return JsonResponse(context, status=status.HTTP_200_OK)

        except:
            context = {
                'message': 'Error adding item to cart'
            }
            return JsonResponse(context, status=status.HTTP_400_BAD_REQUEST, )


class OrderDetailAPIView(APIView):
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):

        orders = {}
        try:
            pending_order = get_active_cart(request)
            if pending_order is not None and pending_order.is_paid is False:
                items = pending_order.items.all()
                total = sum(item.product.price for item in items)
                for num, item in enumerate(items, start=0):
                    orders[num] = {
                        str(items[num]): str(item.product),
                        'price': str(item.product.price),
                        'id': item.product.id
                    }
                context = {
                    'orders': orders,
                    'count': items.count(),
                    'total': total
                }
                return Response(context, status=status.HTTP_200_OK)
            else:
                context = {
                    'orders': orders,
                    'count': 0,
                    'total': 0
                }
                return Response(context, status=status.HTTP_200_OK)

        except:
            context = {
                'message': "No cart found!",
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)


class CartRemoveItemAPIView(RetrieveAPIView):
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request_data = json.loads(request.body.decode('utf-8'))
        product_id = request_data['product_id']
        product_object = request_data['product']
        cart = get_active_cart(request)

        if product_object == 'ticket':
            product = get_object_or_404(
                Ticket, id=product_id)
        else:
            product = get_object_or_404(
                Membership, id=product_id)
            default_membership = get_object_or_404(
                Membership, id=1)
            update_selected_membership(request, default_membership)

        try:
            product_content_type = ContentType.objects.get_for_model(product)
            pending_order = CartItem.objects.filter(
                product_content_type=product_content_type, product_object_id=product_id)
            if pending_order.exists():
                cartItem = CartItem.objects.filter(
                    product_content_type=product_content_type, product_object_id=product_id)
                cartItem.delete()
                context = {
                    'message': "Item removed from cart"
                }
                return Response(context, status=status.HTTP_200_OK)
            else:
                context = {
                    'message': "Item not in your cart"
                }
                return Response(context, status=status.HTTP_404_NOT_FOUND)

        except:
            context = {
                'message': "Error removing item from cart"
            }
            return Response(context, status=status.HTTP_404_NOT_FOUND)


class PaymentAPIView(APIView):

    def post(self, request, *args, **kwargs):

        request_data = json.loads(request.body.decode('utf-8'))
        token = request_data['stripeToken']

        pending_order = get_object_or_404(
            Cart, user=self.request.user)
        items = pending_order.items.all()
        total = sum(item.product.price for item in items) * 100

        userprofile = UserProfile.objects.get(user=request.user)

        customer = stripe.Customer.retrieve(
            userprofile.stripe_customer_id)
        customer.sources.create(source=token)
        customer.save()

        try:
            if customer:

                charge = stripe.Charge.create(
                    amount=total,
                    currency="eur",
                    customer=userprofile.stripe_customer_id
                )
            else:
                charge = stripe.Charge.create(
                    amount=total,
                    currency="eur",
                    source=token
                )

            payment = CartPayment()
            payment.stripe_charge_id = charge['id']
            payment.user = self.request.user
            payment.amount = total
            pending_order.is_paid = True

            if pending_order.is_paid:
                pending_order.save()
                payment.save()

                updated_user_membership(request, request_data)
                paid_cart = get_paid_cart(request)
                paid_cart.delete()

                user_profile = UserProfile.objects.get(user=request.user)
                user_profile.active_membership.add(
                    get_user_membership(request).membership)

                user_profile.save()

                context = {
                    'message': "Payment was successful!"
                }
                return Response(context, status=status.HTTP_200_OK)

            else:
                context = {
                    'message': "Error saving your subscription successful!"
                }
                return Response(context, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})

            context = {
                'message': f"{err.get('message')}"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError:
            context = {
                'message': "Rate limit error | Too many request"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError:
            context = {
                'message': "Invalid parameters"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError:
            context = {
                'message': "Not Authenticated"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.APIConnectionError:
            context = {
                'message': "Network error"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            context = {
                'message': "Something went wrong. You were not charged. Please try again."
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
