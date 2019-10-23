from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.urls import reverse
from comments.models import Comment
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404
from django.contrib.contenttypes.fields import GenericForeignKey


class Article(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=120)
    description = models.TextField()
    subject = models.CharField(max_length=120)
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, default=1)
    views = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    @property
    def snippet(self):
        return self.description[:100] + '...'

    @property
    def get_article_views(self):
        instance = get_object_or_404(Article, id=self.id)
        instance.views = instance.views + 1
        instance.save()

        return instance.views

    @property
    def get_content_type(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return content_type

    @property
    def comments(self):
        comments = Comment.objects.filter_by_instance(
            self).values('comment', 'user_id', 'timestamp', 'content_type', 'parent', 'object_id', 'id')
        comments_obj = {}
        for num, comment in enumerate(comments, start=0):
            user = User.objects.get(pk=comment['user_id'])

            comments_obj[num] = comments[num]
            comment.update({'username': user.username})

        return comments_obj
