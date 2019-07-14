
from tickets.models import Ticket
from .serializers import TicketSerializer
from rest_framework import viewsets


class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
