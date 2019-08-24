from memberships.models import Membership, UserMembership
from .serializers import MembershipSerializer
from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework import status


def get_user_membership(request):
    user_membership_qs = UserMembership.objects.filter(user=request.user)

    if user_membership_qs.exists():
        return user_membership_qs.first()
    return None


class MembershipListView(ListAPIView):
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(**kwargs)

        current_user_membership = get_user_membership(self.request)
        context['current_user_membership'] = str(
            current_user_membership.membership)

        return context


class MembershipsDetailAPI(RetrieveAPIView):
    permissions._classes = [
        permissions.AllowAny,
    ]
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()
