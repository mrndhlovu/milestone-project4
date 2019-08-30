from rest_framework import serializers
from memberships.models import Membership, Subcription


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(MembershipSerializer, self).to_representation(instance)

        rep['current_user_membership'] = instance.membership_type

        return rep


class MembershipProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcription
        exclude = ('id', 'stripe_subscription_id')

    def to_representation(self, instance):
        rep = super(MembershipProfileSerializer,
                    self).to_representation(instance)

        rep['user_membership'] = str(instance.user_membership)
        rep['user_subcription'] = str(instance.user_membership.membership)
        rep['next_billing'] = instance.get_next_billing_date
        rep['created_at'] = instance.get_created_date

        return rep
