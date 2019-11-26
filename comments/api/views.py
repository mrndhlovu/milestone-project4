from .serializers import CommentSerializer
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import status
from rest_framework import permissions, authentication, generics
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from comments.models import Comment
from tickets.models import Ticket
from accounts.models import UserProfile
from blog.models import Article
from django.contrib.auth.models import User
import json
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.contenttypes.models import ContentType


def get_comment_owner(request):

    comment_owner_qs = User.objects.filter(username=request.user)

    if comment_owner_qs.exists():
        return comment_owner_qs.first()
    return None


def get_parent_id(request):
    comment_parent_qs = Comment.objects.filter(
        parent_id=request.data['parent'])

    if comment_parent_qs.exists():
        return comment_parent_qs.first()
    return None


def get_app_content_type(request, data):
    if data['content_type'] == 'ticket':
        app_object = get_object_or_404(Ticket, id=data['object_id'])
        return app_object

    if data['content_type'] == 'post':
        app_object = get_object_or_404(Article, id=data['object_id'])
        return app_object


class CommentsListView(ListAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):

        data = request.data.copy()

        data['user'] = request.user.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CreateCommentView(CreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.AllowAny]

    def post(self, request, **kwargs):
        request_data = request.data.copy()

        object_id = request_data['object_id']
        app_object = get_app_content_type(request, request_data)

        if app_object is not None:
            app_content_type = ContentType.objects.get_for_model(app_object)

            user = get_comment_owner(request)

            user_profile = get_list_or_404(UserProfile, user=request.user)[0]

            if user is not None:
                comment_reply, created = Comment.objects.get_or_create(
                    user=user,
                    content_type=app_content_type,
                    object_id=object_id,
                    comment=request_data['comment'],
                    image=user_profile.image)
                context = {
                    'message': 'Comment created'
                }

                return JsonResponse(context, status=status.HTTP_201_CREATED, )
            else:
                context = {
                    'message': 'Failed to submit comment: Could not resolve comment owner'
                }
                return JsonResponse(context, status=status.HTTP_404_NOT_FOUND, )

        else:
            context = {
                'message': 'App not found'
            }
            return JsonResponse(context, status=status.HTTP_404_NOT_FOUND, )


class CreateCommentReplyView(CreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.AllowAny]

    def post(self, request, **kwargs):

        request_data = request.data.copy()

        object_id = request_data['object_id']
        comment = request_data['comment']
        parent_id = request_data['parent']
        user_profile = get_list_or_404(UserProfile, user=request.user)[0]

        app_object = get_app_content_type(request, request_data)

        if app_object is not None:

            app_content_type = ContentType.objects.get_for_model(app_object)

            user = get_comment_owner(request)
            parent = Comment.objects.get(id=parent_id)

            if user is not None:

                comment_reply, created = Comment.objects.get_or_create(
                    user=user,
                    content_type=app_content_type,
                    object_id=object_id,
                    comment=comment,
                    parent=parent,
                    image=user_profile.image)
                context = {
                    'message': 'Reply submitted'
                }
                return JsonResponse(context, status=status.HTTP_201_CREATED, )
            else:
                context = {
                    'message': 'Could not reslove parent id'
                }
                return JsonResponse(context, status=status.HTTP_400_BAD_REQUEST)
        else:
            context = {
                'message': 'Could not resolve app_object type'
            }
            return JsonResponse(context, status=status.HTTP_400_BAD_REQUEST)
