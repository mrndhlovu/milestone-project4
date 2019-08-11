from rest_framework import serializers
from tickets.models import Ticket
from django.conf import settings


User = settings.AUTH_USER_MODEL


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
