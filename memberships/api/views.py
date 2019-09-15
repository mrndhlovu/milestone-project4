from .serializers import MembershipSerializer, SubscribedUserProfileSerializer, MembershipOrderSerializer
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404
from memberships.models import Membership, UserMembership, Subscription
from rest_framework import permissions, status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from accounts.models import UserProfile, CustomUser
import json
import stripe


stripe.api_key = settings.STRIPE_SECRET_KEY


def get_user_membership(request):
    user_membership_qs = UserMembership.objects.filter(user=request.user)

    if user_membership_qs.exists():
        return user_membership_qs.first()
    return None


def get_user_subscription(request):
    user_subscription_qs = Subscription.objects.filter(
        user_membership=get_user_membership(request))
    if user_subscription_qs.exists():
        user_subscription = user_subscription_qs.first()
        return user_subscription
    return None


def get_selected_membership(request):

    membership_type = request['membership_type']

    choosen_membership_qs = Membership.objects.filter(
        membership_type=membership_type)

    if choosen_membership_qs.exists():
        return choosen_membership_qs.first()
    return None


def get_user_profile(request):
    return get_object_or_404(UserProfile, user=request.user)


def get_pending_order(request):
    print(request)

    selected_membership = get_selected_membership(request).id

    order = UserMembership.objects.filter(
        membership=selected_membership, is_member=False).values('id', 'stripe_customer_id', 'is_member', 'membership', 'subscription', 'user_id')
    if order.exists():
        return order[0]
    return 0


class MembershipAddToCart(ListAPIView):
    serializer_class = MembershipOrderSerializer
    queryset = Membership.objects.all()
    permissions._classes = [
        permissions.AllowAny,
    ]

    def post(self, request, **kwargs):
        request_data = json.loads(request.body.decode('utf-8'))

        user_profile = get_user_profile(request)

        user_subscription = get_user_subscription(request)
        user_membership = get_user_membership(request)

        choosen_membership_type = get_selected_membership(request_data)

        choosen_membership_qs = Membership.objects.filter(
            membership_type=choosen_membership_type)

        if choosen_membership_qs.exists():
            choosen_membership = choosen_membership_qs.first()

        if user_membership.membership == choosen_membership:

            if user_subscription is not None:
                message = 'You already have this membership!'
                return JsonResponse({'message': message}, status=status.HTTP_200_OK)

        user_profile.current_membership.add(choosen_membership)

        user_profile.save()

        context = {
            'choosen_membership_type': choosen_membership.membership_type,
            'message': '{} membership added to cart'.format(choosen_membership.membership_type).upper()

        }

        return JsonResponse(context, status=200)


class MembershipDeleteFromCart(ListAPIView):
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()
    permissions._classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.body.decode('utf-8'))
        user_profile = get_user_profile(request)

        remove_selected_membership = get_selected_membership(request_data)

        try:
            if remove_selected_membership is not None:

                user_profile.current_membership.remove(
                    remove_selected_membership)

            context = {
                'message': '{} membership removed from cart'.format(remove_selected_membership)
            }

            return JsonResponse(context, status=200)

        except:
            context = {
                'message': 'Cant find {} membership to delete.'.format(remove_selected_membership)
            }

            return JsonResponse(context, status=404)


class MembershipFetchCart(ListAPIView):
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()
    permissions._classes = [
        permissions.AllowAny,
    ]

    def post(self, request, **kwargs):

        request_data = json.loads(request.body.decode('utf-8'))
        try:
            cart_item = get_pending_order(request_data)

            context = {
                'order_item': cart_item,
            }

            return JsonResponse(context, status=200)
        except:
            context = {
                'message': 'You have no active order in your cart',
            }
            return JsonResponse(context, status=404)


class MembershipPendingOrderApi(ListAPIView):
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()
    permissions._classes = [
        permissions.AllowAny,
    ]

    def post(self, request, **kwargs):
        request_data = json.loads(request.body.decode('utf-8'))

        pending_order = get_pending_order(request_data)

        context = {
            'order_item': pending_order
        }

        return JsonResponse(context, status=200)


class MembershipCartCheckoutApi(ListAPIView):
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()
    permissions._classes = [
        permissions.AllowAny,
    ]

    def post(self, request, **kwargs):
        request_data = json.loads(request.body.decode('utf-8'))

        user_membership = get_user_membership(request)

        try:
            choosen_membership = get_selected_membership(request_data)

        except:
            message = 'Not found'
            return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)
        publish_key = settings.STRIPE_PUBLISHABLE_KEY
        if request.method == "POST":

            try:
                token = request_data['stripeToken']

                customer = stripe.Customer.retrieve(
                    user_membership.stripe_customer_id)

                customer.source = token

                customer.save()

                subscription = stripe.Subscription.create(
                    customer=user_membership.stripe_customer_id,
                    items=[
                        {
                            "plan": choosen_membership.stripe_plan_id
                        }
                    ]
                )

                response_object = {'subscription_id': subscription.id}

                return JsonResponse(response_object, status=200)

            except:
                message = {
                    'message': 'An error has occurred, payment not successful'}
                return Response(message, status=status.HTTP_404_NOT_FOUND)

        context = {
            'publishKey': publish_key,
            'choosen_membership': choosen_membership
        }

        return JsonResponse(context, status=200)


class MembershipTransactionUpdateView(ListAPIView):
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()
    permissions._classes = [
        permissions.AllowAny,
    ]

    def post(self, request, **kwargs):

        request_data = json.loads(request.body.decode('utf-8'))

        user_membership = get_user_membership(request)
        choosen_membership = get_selected_membership(request_data)
        user_membership.membership = choosen_membership

        user_membership.save()

        subscription_id = request_data['subscription_id']

        subscription, created = Subscription.objects.get_or_create(
            user_membership=user_membership, is_active=True)
        subscription.stripe_subscription_id = subscription_id
        subscription.save()

        context = {
            'message': 'Successfully created {} membership'.format(
                choosen_membership),
            'membership': str(choosen_membership)
        }

        return JsonResponse(context, status=200, safe=False)


class CancelSubscriptionAPI(ListAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = MembershipSerializer
    queryset = Subscription.objects.all()

    def post(self, request, **kwargs):

        try:
            user_subscription = get_user_subscription(request)

            if user_subscription.is_active is False:

                message = 'No active subscription found!'
                return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)

        except:
            message = 'Error! could not cancel your subscription'
            return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)

        subscription = stripe.Subscription.retrieve(
            user_subscription.stripe_subscription_id)
        subscription.delete()

        user_subscription.is_active = False
        user_subscription.delete()

        free_membership = Membership.objects.filter(
            membership_type='free').first()
        user_membership = get_user_membership(request)

        user_membership.membership = free_membership
        user_membership.save()

        context = {
            'message': 'Deactivated you subscription!'
        }

        return JsonResponse(context, status=200, safe=False)


class MembershipTypesAPI(ListAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()


class MembershipTypesRetriveAPI(RetrieveAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()


class SubscribedUserRetrieveAPI(RetrieveAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = SubscribedUserProfileSerializer
    queryset = Subscription.objects.all()
