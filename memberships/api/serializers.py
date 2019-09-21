from rest_framework import serializers
from memberships.models import Membership, Subscription, UserMembership


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'


class SubscribedUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'


class MembershipOrderSerializer(serializers.ModelSerializer):
    order = serializers.SerializerMethodField()

    class Meta:
        model = UserMembership
        fields = '__all__'
