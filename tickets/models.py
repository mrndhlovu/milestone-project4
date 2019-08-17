from django.db import models
from django.conf import settings


# Create ticket model

User = settings.AUTH_USER_MODEL


class Ticket(models.Model):
    STATUS = (
        ('todo', 'To-do'),
        ('doing', 'Doing'),
        ('done', 'Done'),
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=120)
    subject = models.CharField(max_length=120)
    description = models.TextField()
    votes = models.IntegerField(default=0)
    status = models.CharField(
        max_length=6, choices=STATUS, default='todo')
    in_progress = models.BooleanField(default=False)
    slug = models.SlugField(blank=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    views = models.IntegerField(default=0)

    def __str__(self):
        return self.title
