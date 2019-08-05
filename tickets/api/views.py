from tickets.models import Ticket
from .serializers import TicketSerializer
from rest_framework import viewsets, permissions


class TicketViewSet(viewsets.ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [permissions.AllowAny]

    def restore_object(self, attrs, instance=None):
        new_instance = False
        if not instance:
            new_instance = True

        instance = super().restore_object(attrs, instance)

        # Only set the owner if this is a new instance
        if new_instance:
            request = self.context.get('request', None)
            setattr(instance, 'owner', request.user)

        return instance
