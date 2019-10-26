from rest_framework import serializers
from blog.models import Article
from django.conf import settings


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(ArticleSerializer, self).to_representation(instance)

        rep['username'] = instance.owner.username
        rep['likes'] = instance.likes.count()
        rep['short_desc'] = str(instance.snippet)

        return rep


class ArticleDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
