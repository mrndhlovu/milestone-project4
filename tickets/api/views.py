
from tickets.models import Ticket
from .serializers import TicketSerializer
from rest_framework import viewsets, permissions


class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [permissions.AllowAny]

    def restore_object(self, attrs, instance=None):
        instance = super().restore_object(attrs, instance)

        request = self.context.get('request', None)
        setattr(instance, 'created_by', request.user.username)
        return instance
