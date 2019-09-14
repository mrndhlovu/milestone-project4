from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from accounts.models import UserProfile, CustomUser, User
from django.db import models


# from memberships.api.serializers import MembershipSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        rep['current_membership'] = self.context['current_membership']
        rep['membership_profile'] = self.context['membership_profile']

        return rep


# Serializer for user
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        exclude = ('password',)

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        rep['current_membership'] = self.context['current_membership']

        return rep


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        rep['current_membership'] = self.context['current_membership']

        return rep

# Serializer for user login


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

    class Meta:
        model = CustomUser
        exclude = ('password',)

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        rep['current_membership'] = self.context['current_membership']

        return rep
