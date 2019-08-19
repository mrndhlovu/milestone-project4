from memberships.models import Membership
from .serializers import MembershipSerializer
from rest_framework import permissions
from rest_framework.generics import ListAPIView


class MembershipListView(ListAPIView):
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()
    permission_classes = [permissions.AllowAny]
