from rest_framework import serializers
from tickets.models import Ticket
from django.conf import settings


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(TicketSerializer, self).to_representation(instance)

        rep['username'] = instance.username.username
        rep['votes'] = instance.votes.count()

        return rep
