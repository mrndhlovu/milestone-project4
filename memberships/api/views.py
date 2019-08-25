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
from django.contrib.auth.decorators import login_required


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
    membership_type = request.session['choosen_membership_type']
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

        return JsonResponse({'message': message}, status=status.HTTP_200_OK)


# @login_required
def PaymentView(request):

    # user_membership = get_user_membership(request)

    # print('<<<<<<<<<GOT_HERE>>>>>>>>>>', user_membership)

    try:
        choosen_membership = get_selected_membership(request)
    except:
        message = 'Not found'
        return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)

    publish_key = settings.STRIPE_PUBLISHABLE

    if request.method == "POST":
        try:
            token = request.POST['stripeToken']

            # UPDATE FOR STRIPE API CHANGE 2018-05-21

            '''
            First we need to add the source for the customer
            '''

            customer = stripe.Customer.retrieve(
                user_membership.stripe_customer_id)
            customer.source = token  # 4242424242424242
            customer.save()

            '''
            Now we can create the subscription using only the customer as we don't need to pass their
            credit card source anymore
            '''

            subscription = stripe.Subscription.create(
                customer=user_membership.stripe_customer_id,
                items=[
                    {"plan": choosen_membership.stripe_plan_id},
                ]
            )

            return redirect(reverse('memberships:update-transactions',
                                    kwargs={
                                        'subscription_id': subscription.id
                                    }))

        except:
            messages.info(
                request, "An error has occurred, investigate it in the console")

    context = {
        'publishKey': publish_key,
        'selected_membership': choosen_membership
    }

    return JsonResponse(context, status=200)


class MembershipsDetailAPI(RetrieveAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()
