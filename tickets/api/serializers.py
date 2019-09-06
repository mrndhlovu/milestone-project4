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

        return rep


class TicketDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(TicketDetailSerializer, self).to_representation(instance)

        rep['username'] = instance.owner.username
        rep['votes'] = instance.votes.count()
        rep['comments'] = instance.comments

        return rep
