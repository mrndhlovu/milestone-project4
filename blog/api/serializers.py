from rest_framework import serializers
from blog.models import Blog
from django.conf import settings


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'


class ArticleDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
