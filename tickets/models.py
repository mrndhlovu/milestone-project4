from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.contrib.auth import get_user_model

# Create ticket model


class Ticket(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    title = models.CharField(max_length=120)
    subject = models.CharField(max_length=120)
    description = models.TextField()
    prority_level = models.CharField(max_length=10, default='Low')
    in_progress = models.BooleanField(default=False)
    slug = models.SlugField(blank=True)
    created_by = models.ForeignKey(
        get_user_model(), on_delete=models.DO_NOTHING, null=True, default=None)

    def __str__(self):
        return self.title

    def snippet(self):
        return self.description[:40] + '...'
