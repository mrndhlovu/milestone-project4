from rest_framework import serializers
from tickets.models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fileds = ('title', 'ticket_id', 'description', 'created_at', 'status', 'priority_level')