from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.urls import reverse
from comments.models import Comment
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404


class Blog(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=120)
    description = models.TextField()
    subject = models.CharField(max_length=120)
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, default=1)
    views = models.IntegerField(default=0)
