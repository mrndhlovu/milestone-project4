from .serializers import MembershipSerializer, MembershipProfileSerializer
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404, redirect
from memberships.models import Membership, UserMembership, Subcription
from rest_framework import permissions, status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
import json
import stripe
from django.contrib import messages
from django.urls import reverse
from django.shortcuts import get_list_or_404, get_object_or_404


stripe.api_key = settings.STRIPE_SECRET_KEY


def get_user_membership(request):
    user_membership_qs = UserMembership.objects.filter(user=request.user)

    if user_membership_qs.exists():
        return user_membership_qs.first()
    return None


def get_user_subcription(request):
    user_subcription_qs = Subcription.objects.filter(
        user_membership=get_user_membership(request))
    if user_subcription_qs.exists():
        user_subcription = user_subcription_qs.first()
        return user_subcription
    return None


def get_selected_membership(request):

    membership_type = request['membership_type']

    choosen_membership_qs = Membership.objects.filter(
        membership_type=membership_type)

    if choosen_membership_qs.exists():
        return choosen_membership_qs.first()
    return None


class MembershipListView(ListAPIView):
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()
    permissions._classes = [
        permissions.AllowAny,
    ]

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(**kwargs)

        current_user_membership = get_user_membership(self.request)
        context['current_user_membership'] = str(
            current_user_membership.membership)

        return context

    def post(self, request, **kwargs):
        request_data = json.loads(request.body.decode('utf-8'))

        choosen_membership_type = get_selected_membership(request_data)
        user_membership = get_user_membership(request)
        user_subcription = get_user_subcription(request)

        choosen_membership_qs = Membership.objects.filter(
            membership_type=choosen_membership_type)

        if choosen_membership_qs.exists():
            choosen_membership = choosen_membership_qs.first()

        if user_membership.membership == choosen_membership:

            if user_subcription is not None:
                message = 'You already have this membership!'
                return JsonResponse({'message': message}, status=status.HTTP_200_OK)

        message = {'choosen_membership_type': choosen_membership.membership_type}

        return JsonResponse(message, status=200)


class MembershipPaymentView(ListAPIView):
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
                    'message': 'An error has occurred, investigate it in the console'}
                return JsonResponse(message, status=status.HTTP_404_NOT_FOUND)

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

        subcription, created = Subcription.objects.get_or_create(
            user_membership=user_membership, is_active=True)
        subcription.stripe_subscription_id = subscription_id
        subcription.save()

        context = {
            'data': request_data,
            'message': 'Successfully created {} membership'.format(
                choosen_membership)
        }

        return JsonResponse(context, status=200, safe=False)


class MembershipTypesAPI(ListAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()


class MembershipsProfileAPI(ListAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = MembershipProfileSerializer
    queryset = Subcription.objects.all()


class CancelSubscriptionAPI(ListAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = MembershipSerializer
    queryset = Subcription.objects.all()

    def post(self, request, **kwargs):

        try:
            user_subcription = get_user_subcription(request)
            if user_subcription.is_active is False:

                message = 'No active subscription found!'
                return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)

        except:
            message = 'Error! could not cancel your subscription'
            return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)

        subcription = stripe.Subscription.retrieve(
            user_subcription.stripe_subscription_id)
        subcription.delete()

        user_subcription.is_active = False
        user_subcription.delete()

        free_membership = Membership.objects.filter(
            membership_type='free').first()
        user_membership = get_user_membership(request)

        user_membership.membership = free_membership
        user_membership.save()

        context = {
            'message': 'Deactivated you subscription!'
        }

        return JsonResponse(context, status=200, safe=False)
