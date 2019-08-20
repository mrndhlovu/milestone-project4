from rest_framework import serializers
from comments.models import Comment
from django.conf import settings


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(CommentSerializer, self).to_representation(instance)

        rep['user'] = instance.user.username

        return rep
