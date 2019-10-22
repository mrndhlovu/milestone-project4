from .serializers import CartSerializer, CartItemSerializer
from memberships.models import Membership, Subscription, UserMembership
from accounts.models import UserProfile
from tickets.models import Ticket, TicketSolution
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
from cart.models import Cart, CartItem, CartPayment, Donation
from django.contrib.contenttypes.models import ContentType
import stripe
import traceback

stripe.api_key = settings.STRIPE_SECRET_KEY


app_type = {
    'membership': 'membership',
    'ticket': 'ticket',
    'donation': 'donation'
}


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


def get_user(request):
    user_qs = UserMembership.objects.filter(user=request.user)

    if user_qs.exists():
        return user_qs.first()
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


def updated_user_membership(request, subscription_id):

    user = get_user(request)
    user.is_pro_member = True
    user.membership = get_object_or_404(Membership, id=2)
    user.save()

    try:
        subscription, created = Subscription.objects.get_or_create(
            user_membership=user, is_active=True)
        subscription.stripe_subscription_id = subscription_id
        subscription.save()

        context = {
            'message': 'Successfully created {} membership'.format(user.membership),
        }
        return context
    except Exception:
        context = {
            'message': 'Failed to get subcription id'
        }


def get_ticket(item):
    ticket = get_object_or_404(Ticket, id=item.product_object_id)
    if item.product_content_type.name == app_type['ticket']:
        return ticket
    return None


def get_membership(item):
    membership = get_object_or_404(Membership, id=item.product_object_id)
    if item.product_content_type.name == app_type['membership']:
        return membership
    return None


def get_subscription_id(request, membership_id, customer):

    user = get_user(request)

    choosen_membership = get_object_or_404(
        Membership, id=membership_id)
    try:
        subscription = stripe.Subscription.create(
            customer=user.stripe_customer_id,
            items=[
                {
                    "plan": choosen_membership.stripe_plan_id
                }
            ]
        )
        subscription_id = subscription.id
        return subscription_id

    except Exception:
        return None


def get_stripe_customer(request, token):
    user = UserProfile.objects.filter(user=request.user)

    if user.exists():
        user_profile = user.first()
        existing_customer = stripe.Customer.retrieve(
            user_profile.stripe_customer_id)

        existing_customer.sources.create(source=token)
        existing_customer.save()
        return existing_customer

    else:
        return False


def get_cart_items(request, product_content_type):
    item = CartItem.objects.filter(
        cart__user=request.user, product_content_type=product_content_type)
    if item.exists():
        return item.all()
    else:
        return None


class AddToCartAPIView(ListAPIView):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()
    permission_classes = [permissions.AllowAny]

    def post(self, request):

        request_data = json.loads(request.body.decode('utf-8'))
        product_id = request_data['product_id']
        product_object = request_data['product']

        cart, created = Cart.objects.get_or_create(
            user=request.user, is_paid=False)

        if product_object == app_type['ticket']:
            product = get_object_or_404(
                Ticket, id=product_id)

        elif product_object == app_type['membership']:
            product = get_object_or_404(Membership, id=product_id)
            if product.id == 2:
                product.membership_type = 'pro'

        else:
            donation_amount = request_data['donation']
            product = Donation.objects.create(
                user=request.user, price=donation_amount)
            product.save()

        if cart is not None and cart.is_paid is False:
            product_content_type = ContentType.objects.get_for_model(
                product)
            pending_orders_qs = get_cart_items(
                request, product_content_type)

            if pending_orders_qs is not None:
                for item in pending_orders_qs:
                    if item.product_object_id == product_id:
                        context = {
                            'message': 'Item already in your cart.',
                        }
                        return JsonResponse(context, status=status.HTTP_200_OK)

                cart.add_item(product)
                context = {
                    'message': 'Item added to cart',
                }
                return JsonResponse(context, status=status.HTTP_200_OK)

            else:
                cart.add_item(product)
                context = {
                    'message': 'Item added to cart.',
                }
                return JsonResponse(context, status=status.HTTP_200_OK)

        else:
            context = {
                'message': 'User cart not found',
            }
            return JsonResponse(context, status=status.HTTP_400_BAD_REQUEST)


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

        except Exception:
            context = {'message': 'No active cart found'}
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

        if product_object == app_type['ticket']:
            product = get_object_or_404(
                Ticket, id=product_id)

        elif product_object == app_type['membership']:
            product = get_object_or_404(
                Membership, id=product_id)
            default_membership = get_object_or_404(
                Membership, id=1)
            update_selected_membership(request, default_membership)

        elif product_object == app_type['donation']:
            product = get_object_or_404(
                Donation, user=request.user, id=product_id)

        try:

            product_content_type = ContentType.objects.get_for_model(product)
            pending_order = CartItem.objects.filter(
                product_content_type=product_content_type, product_object_id=product_id)

            if pending_order.exists():
                cartItem = pending_order.first()
                if product_content_type == app_type['donation']:
                    product.delete()

                else:
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

        except Exception:
            context = {'message': 'Could not remove item from cart'}
            return Response(context, status=status.HTTP_400_BAD_REQUEST)


class PaymentAPIView(APIView):

    def post(self, request, *args, **kwargs):

        request_data = json.loads(request.body.decode('utf-8'))
        token = request_data['stripeToken']

        pending_order = get_object_or_404(Cart, user=self.request.user)
        items = pending_order.items.all()
        total = sum(item.product.price for item in items) * 100

        user_profile = UserProfile.objects.get(user=request.user)
        customer = get_stripe_customer(request, token)

        if customer is not None:
            try:
                if customer:
                    charge = stripe.Charge.create(
                        amount=round(total),
                        currency="eur",
                        customer=user_profile.stripe_customer_id
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
                    paid_cart = get_paid_cart(request)
                    paid_cart.delete()

                    user_profile = UserProfile.objects.get(user=request.user)
                    if user_profile is not None:
                        for item in items:

                            if item.product_content_type.name == app_type['membership']:
                                free_membership = get_object_or_404(
                                    Membership, id=1)
                                membership = get_membership(item)

                                user_profile.active_membership.add(membership)
                                user_profile.active_membership.remove(
                                    free_membership)
                                user_profile.save()

                                subscription_id = get_subscription_id(
                                    request, membership.id, customer)

                                if subscription_id is not None:
                                    updated_user_membership(
                                        request, subscription_id)
                                else:
                                    context = {
                                        'message': "no subscription id found"
                                    }
                                    return Response(context, status=status.HTTP_400_BAD_REQUEST)

                            elif item.product_content_type.name == app_type['ticket']:
                                ticket = get_ticket(item)
                                user_profile.paid_tickets.add(ticket)
                                user_profile.save()

                                ticket_solution, created = TicketSolution.objects.get_or_create(
                                    parent_ticket_id=ticket.id)
                                ticket_solution.paid_client.add(request.user)
                                ticket_solution.status = 'doing'
                                ticket_solution.save()

                            elif item.product_content_type.name == app_type['donation']:

                                donation = get_object_or_404(
                                    Donation, is_paid=False, user=request.user)

                                donation.is_paid = True
                                donation.save()

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
        else:
            context = {'message': "Customer has no stripe profile"}
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
