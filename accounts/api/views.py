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


class SignupAPI(GenericAPIView):
    serializer_class = SignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        context = {
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        }

        return Response(context, status=200)

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(**kwargs)

        if self.request.method == 'GET':
            current_membership = get_user_membership(self.request)
            context['current_membership'] = str(current_membership.membership)
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
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        }

        return Response(context, status=200)

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(**kwargs)

        if self.request.method == 'GET':
            current_membership = get_user_membership(self.request)
            context['current_membership'] = str(current_membership.membership)
        else:
            context['current_membership'] = str(None)

        return context


class UserAPI(RetrieveAPIView):
    permissions._classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def get_serializer_context(self, *args, **kwargs):

        context = super().get_serializer_context(**kwargs)

        print(context.items())

        if self.request.method == 'GET':
            current_membership = get_user_membership(self.request)
            context['current_membership'] = str(current_membership.membership)

        else:
            context['current_membership'] = None

        return context
