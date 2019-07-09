from django.db import models


# Create your models here.
class Ticket(models.Model):
    subject = models.CharField(max_length=120)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    prority_level = models.CharField(max_length=10)
    status = models.CharField(max_length=10)
    title = models.CharField(max_length=120)

    def __str__(self):
        return self.title