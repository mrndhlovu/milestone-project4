from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
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
    status = models.CharField(
        max_length=6, choices=STATUS, default='todo')
    in_progress = models.BooleanField(default=False)
    slug = models.SlugField(blank=True)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    username = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, related_name='owner_username')
    votes = models.ManyToManyField(
        User, blank=True, related_name='ticket_votes')
    views = models.IntegerField(default=0)

    def __str__(self):
        return self.title


# class Vote(models.Model):
#     user = models.ForeignKey(
#         User, on_delete=models.CASCADE, related_name='voter')
#     ticket = models.OneToOneField(
#         Ticket, on_delete=models.CASCADE, related_name='vticket')

#     def __str__(self):
#         return self.title


# @receiver(post_save, sender=Vote)
# def update_votes(self, **kwargs):
#     ticket = self.post
#     ticket.votes_count += 1
#     ticket.save()
