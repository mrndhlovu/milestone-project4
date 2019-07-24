from django.db import models


# Create your models here.
class Ticket(models.Model):
    subject = models.CharField(max_length=120)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    prority_level = models.CharField(max_length=10, default='Low')
    is_active = models.BooleanField(default=True, blank=True)
    title = models.CharField(max_length=120)
    tags = models.CharField(max_length=50, blank=True)
    username = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.title
