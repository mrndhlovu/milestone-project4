from .serializers import MembershipSerializer
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
    membership_type = request['choosen_membership_type']
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
        data = json.loads(request.body.decode('utf-8'))
        choosen_membership_type = data['membership_type']

        user_membership = get_user_membership(request)
        user_subcription = get_user_subcription(request)

        choosen_membership_qs = Membership.objects.filter(
            membership_type=choosen_membership_type)

        if choosen_membership_qs.exists():
            choosen_membership = choosen_membership_qs.first()

            if user_subcription is not None:
                message = 'You already have this membership'
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
        data = json.loads(request.body.decode('utf-8'))

        user_membership = get_user_membership(request)

        try:
            choosen_membership = get_selected_membership(data)

        except:
            message = 'Not found'
            return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)

        publish_key = settings.STRIPE_PUBLISHABLE_KEY

        if request.method == "POST":
            try:

                token = data['stripeToken']

                # UPDATE FOR STRIPE API CHANGE 2018-05-21

                '''
                First we need to add the source for the customer
                '''

                customer = stripe.Customer.retrieve(
                    user_membership.stripe_customer_key)

                customer.default_source = token  # 4242424242424242
                customer.save()

                '''
                Now we can create the subscription using only the customer as we don't need to pass their
                credit card source anymore
                '''

                subscription = stripe.Subscription.create(
                    customer=user_membership.stripe_customer_key,
                    items=[
                        {"plan": choosen_membership.stripe_plan_id},
                    ]
                )

                response_object = {'subscription_id': subscription.id}

                return JsonResponse(response_object, status=200)

            except:

                return JsonResponse({'message': 'An error has occurred, investigate it in the console'}, status=status.HTTP_404_NOT_FOUND)

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

        data = json.loads(request.body.decode('utf-8'))

        user_membership = get_user_membership(request)
        choosen_membership = get_selected_membership(data)
        user_membership.membership = choosen_membership

        user_membership.save()

        subscription_id = data['subscription_id']

        sub, created = Subcription.objects.get_or_create(
            user_membership=user_membership, is_active=True, stripe_customer_id=subscription_id)

        sub.save()

        context = {
            'data': data,
            'message': 'Successfully created {} membership'.format(
                choosen_membership)
        }

        return JsonResponse(context, status=200, safe=False)


class MembershipsDetailAPI(RetrieveAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()
