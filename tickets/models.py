from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.contrib.auth import get_user_model
from accounts.models import UserProfile

# Create ticket model


class Ticket(models.Model):
    PRIORITY_LEVELS = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    )
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    title = models.CharField(max_length=120)
    subject = models.CharField(max_length=120)
    description = models.TextField()
    prority = models.CharField(
        max_length=6, choices=PRIORITY_LEVELS, )
    in_progress = models.BooleanField(default=False)
    slug = models.SlugField(blank=True)
    owner = models.ForeignKey(
        UserProfile, on_delete=models.DO_NOTHING, null=True, default=None)

    def __str__(self):
        return self.title

    def snippet(self):
        return self.description[:40] + '...'
