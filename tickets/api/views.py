
from tickets.models import Ticket
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import TicketSerializer

# Ticket viewset


class TicketListView(ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


class TicketDetailView(RetrieveAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
