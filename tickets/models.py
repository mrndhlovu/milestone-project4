from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model


# Create ticket model

User = get_user_model()


class Ticket(models.Model):
    PRIORITY_LEVELS = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    title = models.CharField(max_length=120)
    subject = models.CharField(max_length=120)
    description = models.TextField()
    prority_level = models.CharField(
        max_length=6, choices=PRIORITY_LEVELS, default='low')
    in_progress = models.BooleanField(default=False)
    slug = models.SlugField(blank=True)
    owner = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, null=True, default=None)

    def __str__(self):
        return self.title

    def snippet(self):
        return self.description[:40] + '...'
