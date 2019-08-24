from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, SignupSerializer, LoginSerializer
from accounts.models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework import permissions
from rest_framework.generics import ListAPIView
from memberships.models import UserMembership
from rest_framework import status


def get_user_membership(request):
    user_membership_qs = UserMembership.objects.filter(user=request.user)

    if user_membership_qs.exists():
        return user_membership_qs.first()
    return None


# Create user api
class UserProfileDetailAPI(generics.RetrieveAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileListView(ListAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(**kwargs)

        if self.request.method == 'GET':
            current_membership = get_user_membership(self.request)
            context['current_membership'] = str(current_membership.membership)
        else:
            context['current_membership'] = None

        return context


class SignupAPI(generics.GenericAPIView):
    serializer_class = SignupSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"user": UserSerializer(user, context=self.get_serializer_context()).data, "token": AuthToken.objects.create(user)[1]})

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(**kwargs)

        if self.request.method == 'GET':
            current_membership = get_user_membership(self.request)
            context['current_membership'] = str(current_membership.membership)
        else:
            context['current_membership'] = None

        return context


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({"user": UserSerializer(user, context=self.get_serializer_context()).data, "token": AuthToken.objects.create(user)[1]})

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(**kwargs)

        if self.request.method == 'GET':
            current_membership = get_user_membership(self.request)
            context['current_membership'] = str(current_membership.membership)
        else:
            context['current_membership'] = str(None)

        return context


class UserAPI(generics.RetrieveAPIView):
    permissions._classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(**kwargs)

        if self.request.method == 'GET':
            current_membership = get_user_membership(self.request)
            context['current_membership'] = str(current_membership.membership)
        else:
            context['current_membership'] = None

        return context
