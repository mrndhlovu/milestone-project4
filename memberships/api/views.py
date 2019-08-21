from memberships.models import Membership, UserMembership
from .serializers import MembershipSerializer
from rest_framework import permissions
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework import status


class MembershipListView(ListAPIView):
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()
