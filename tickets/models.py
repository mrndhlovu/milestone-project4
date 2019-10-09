from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.urls import reverse
from comments.models import Comment
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404


def get_comment_owner(request):
    comment_owner_qs = User.objects.filter(username=request.user)

    if comment_owner_qs.exists():
        return comment_owner_qs.first()
    return None


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
    tag = models.SlugField(blank=True)
    owner = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, default=1)
    status = models.CharField(
        max_length=6, choices=STATUS, default='todo')
    votes = models.ManyToManyField(
        User, blank=True, related_name='ticket_votes')
    views = models.IntegerField(default=0)
    is_bug = models.BooleanField(default=False)
    is_feature = models.BooleanField(default=False)
    is_private = models.BooleanField(default=False)
    price = models.IntegerField(default=5, null=True)

    def __str__(self):
        return self.title

    @property
    def comments(self):

        comments = Comment.objects.filter_by_instance(
            self).values('comment', 'user_id', 'timestamp', 'content_type', 'parent', 'object_id', 'id')

        newComments = {}

        for num, comment in enumerate(comments, start=0):
            user = User.objects.get(pk=comment['user_id'])

            newComments['comment-' + str(num)] = comments[num]
            comment.update({'username': user.username})

        return newComments

    @property
    def get_content_type(self):
        content_type = ContentType.objects.get_for_model(self.__class__)
        return content_type

    @property
    def get_ticket_views(self):
        instance = get_object_or_404(Ticket, id=self.id)
        instance.views = instance.views + 1
        instance.save()

        return instance.views

    @property
    def snippet(self):
        return self.description[:100] + '...'


class TicketSolution(models.Model):
    STATUS = (
        ('doing', 'Doing'),
        ('done', 'Done'),
    )
    ticket = models.ForeignKey(
        Ticket, on_delete=models.CASCADE, null=True, blank=True)
    solution = models.TextField()
    paid_client = models.ManyToManyField(User)
    status = models.CharField(
        max_length=6, choices=STATUS, default='doing')

    def __str__(self):
        return self.ticket.title
