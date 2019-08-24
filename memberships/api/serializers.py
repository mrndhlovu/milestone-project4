from rest_framework import serializers
from memberships.models import Membership


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(MembershipSerializer, self).to_representation(instance)

        rep['current_user_membership'] = instance.membership_type

        return rep
