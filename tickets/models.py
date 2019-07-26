from django.db import models
from django.contrib.auth.models import User


# Create ticket model
class Ticket(models.Model):
    subject = models.CharField(max_length=120)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    prority_level = models.CharField(max_length=10, default='Low')
    is_active = models.BooleanField(default=True, blank=True)
    title = models.CharField(max_length=120)
    tags = models.CharField(max_length=50, blank=True)
    owner = models.ForeignKey(
        User, related_name="tickets", on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title
