from tickets.models import Ticket
from rest_framework import viewsets, permissions
from .serializers import TicketSerializer

# Ticket viewset


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = TicketSerializer
