from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from accounts.models import UserProfile, CustomUser, User
from django.db import models


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        exclude = ('password',)

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        rep['current_membership'] = self.context['current_membership']

        return rep


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=6,
        error_messages={
            "blank": "Password cannot be empty.",
            "min_length": "Password should be more than 6 charaters long.",
        },
    )
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'confirm_password')

    def validate(self, data):
        if data['password'] != data.pop('confirm_password'):
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        rep['current_membership'] = self.context['current_membership']

        return rep


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = CustomUser

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError(
            {"login": "Incorrect Credentials"})
