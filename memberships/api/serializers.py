from rest_framework import serializers
from memberships.models import Membership, Subscription, UserMembership


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'


class SubscribedUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        exclude = ('id', 'stripe_subscription_id')

    def to_representation(self, instance):
        rep = super(SubscribedUserProfileSerializer,
                    self).to_representation(instance)

        rep['user_membership'] = str(instance.user_membership)
        rep['user_subscription'] = str(instance.user_membership.membership)
        rep['next_billing'] = instance.get_next_billing_date
        rep['created_at'] = instance.get_created_date

        return rep


class MembershipOrderSerializer(serializers.ModelSerializer):
    order = serializers.SerializerMethodField()

    class Meta:
        model = UserMembership
        fields = '__all__'
