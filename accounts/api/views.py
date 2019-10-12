from .serializers import UserSerializer, SignupSerializer, LoginSerializer
from accounts.models import UserProfile
from django.shortcuts import get_object_or_404
from knox.models import AuthToken
from memberships.models import Subscription
from memberships.models import UserMembership, Membership
from rest_framework import permissions
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, GenericAPIView
from rest_framework.response import Response
from tickets.models import Ticket


def get_member_profile(request):
    user_membership_qs = UserMembership.objects.filter(
        user=get_user_membership(request).id)

    if user_membership_qs.exists():
        user_subscription = user_membership_qs.values()
        return user_subscription[0]
    return None


def get_user_membership(request):
    user_membership_qs = UserMembership.objects.filter(user=request.user)

    if user_membership_qs.exists():
        return user_membership_qs.first()
    return None


def get_user_subscription(request):
    subscription = Subscription.objects.filter(
        user_membership_id=request.user.id)

    if subscription.exists():
        user_subscription = get_object_or_404(
            Subscription, user_membership_id=request.user.id)
        return user_subscription
    return None


def update_profile(request):
    user = UserProfile.objects.filter(user=request)
    free_membership = Membership.objects.get(membership_type='free')

    if user.exists():
        user_profile = user.first()
        user_profile.active_membership.add(free_membership)
        user_profile.save()

        return True
    else:
        return False


class SignupAPI(GenericAPIView):
    serializer_class = SignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        user_profile = update_profile(user)
        if user_profile is True:

            context = {
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
            }
            return Response(context, status=200)

        else:
            context = {"message": 'Error sign in up please try again!'}

            return Response(context, status=400)

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(**kwargs)

        if self.request.method == 'GET':
            current_membership = get_user_membership(self.request)
            membership = {
                'membership': current_membership,
            }
            context['current_membership'] = membership
        else:
            context['current_membership'] = None

        return context


class LoginAPI(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        context = {
            'message': 'Login successful',
            "user": LoginSerializer(user, context=self.get_serializer_context()).data['username'],
            "token": AuthToken.objects.create(user)[1]
        }
        return Response(context, status=200)


class UserAPI(RetrieveAPIView):
    permissions._classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def get_serializer_context(self, *args, **kwargs):

        context = super().get_serializer_context(**kwargs)

        if self.request.method == 'GET':
            current_membership = get_member_profile(self.request)
            membership_type = get_user_membership(self.request).membership

            if current_membership is not None:
                current_membership['type'] = str(membership_type)

                if get_user_subscription(self.request) is not None:
                    subscription = get_user_subscription(self.request)
                    current_membership['next_billing_date'] = subscription.get_next_billing_date
                    current_membership['date_subscribed'] = subscription.date_subscribed
            membership = {
                'membership': current_membership,
            }
            context['current_membership'] = membership

        else:
            context['current_membership'] = None

        return context
