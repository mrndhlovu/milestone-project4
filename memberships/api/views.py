from memberships.models import Membership
from .serializers import MembershipSerializer
from rest_framework import viewsets, permissions


class MembershipViewSet(viewsets.ModelViewSet):
    serializer_class = MembershipSerializer
    queryset = Membership.objects.all()
    permission_classes = [permissions.AllowAny]
