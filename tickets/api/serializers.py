from rest_framework import serializers
from tickets.models import Ticket
from django.conf import settings


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(TicketSerializer, self).to_representation(instance)

        rep['username'] = instance.owner.username
        rep['votes'] = instance.votes.count()
        rep['short_desc'] = str(instance.snippet)
        rep['image'] = str(instance.image)

        return rep


class TicketDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'
