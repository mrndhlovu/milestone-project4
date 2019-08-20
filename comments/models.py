from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.urls import reverse
from tickets.models import Ticket

User = settings.AUTH_USER_MODEL


class Comment(models.Model):
    ticket = models.ForeignKey(
        Ticket, on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    comment = models.TextField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{}-{}'.format(self.ticket.title, str(self.user.username))
