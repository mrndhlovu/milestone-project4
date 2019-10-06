from .serializers import MembershipSerializer, SubscribedUserProfileSerializer
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_list_or_404, get_object_or_404
from memberships.models import Membership, UserMembership, Subscription
from rest_framework import permissions, status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from accounts.models import UserProfile, CustomUser
from django.forms.models import model_to_dict
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
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


class MembershipListAPIView(ListAPIView):
    permissions._classes = [permissions.AllowAny]
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()


class CancelSubscriptionAPIView(ListAPIView):

    def post(self, request, **kwargs):

        try:
            user_subscription = get_user_subscription(request)
            current_membership = get_user_membership(request)

            if user_subscription.is_active is False:

                message = 'No active subscription found!'
                return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)

        except:
            message = 'Error! could not cancel your subscription'
            return JsonResponse({'message': message}, status=status.HTTP_400_BAD_REQUEST)

        subscription = stripe.Subscription.retrieve(
            user_subscription.stripe_subscription_id)
        subscription.is_active = False

        user_subscription.delete()

        free_membership = Membership.objects.filter(
            membership_type='free').first()
        user_membership = get_user_membership(request)

        user_membership.membership = free_membership
        user_membership.is_pro_member = False
        user_membership.save()

        user_profile = UserProfile.objects.get(user=request.user)
        user_profile.active_membership.remove(current_membership.membership)
        user_profile.active_membership.add(free_membership)
        user_profile.save()

        context = {
            'message': 'Deactivated you subscription!'
        }

        return JsonResponse(context, status=200, safe=False)


class SubscribedUserAPIView(RetrieveAPIView):
    permissions._classes = [permissions.AllowAny]
    serializer_class = SubscribedUserProfileSerializer
    queryset = Subscription.objects.all()

    def post(self, request, **kwargs):
        instance = get_object_or_404(UserMembership, user=request.user)
        try:
            if instance.is_pro_member:
                try:
                    subscription_profile = get_object_or_404(
                        Subscription, user_membership=instance)

                    if subscription_profile is not None:
                        context = {
                            'next_billing': str(subscription_profile.get_next_billing_date),
                            'created_at': str(subscription_profile.get_created_date),
                            'user_membership': str(subscription_profile.user_membership),
                            'subscription_profile_id': str(subscription_profile.id),
                            'is_pro_member': instance.is_pro_member,
                            'stripe_subscription_id': str(subscription_profile.stripe_subscription_id),
                            'user_subscription': str(instance.membership)
                        }

                        return JsonResponse(context, status=200, safe=False)

                    else:
                        context = {
                            'message': 'Did not find your subscription!'
                        }

                        return JsonResponse(context, status=200, safe=False)
                except:
                    context = {
                        'next_billing': None,
                        'created_at': None,
                        'user_membership': str(instance.user),
                        'subscription_profile_id': None,
                        'is_pro_member': instance.is_pro_member,
                        'stripe_subscription_id': None,
                        'user_subscription': str(instance.membership)
                    }
                    return JsonResponse(context, status=200, safe=False)
            else:
                context = {
                    'next_billing': None,
                    'created_at': None,
                    'user_membership': str(instance.user),
                    'subscription_profile_id': None,
                    'is_pro_member': instance.is_pro_member,
                    'stripe_subscription_id': None,
                    'user_subscription': str(instance.membership)
                }
                return JsonResponse(context, status=200, safe=False)

        except:
            context = {
                'message': 'Did not find your subscription!'
            }
            return JsonResponse(context, status=404, safe=False)
