from django.db import models
import uuid

# Create your models here.
class Ticket(models.Model):
    title = models.CharField(max_length=120)
    ticket_id=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True, blank=True)
    status=models.BooleanField(default=False)
    prority_level=models.CharField(max_length=10)
    
    def __str__(self):
        return self.title
    