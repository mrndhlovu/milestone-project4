from .serializers import CommentSerializer
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import status
from rest_framework import permissions, authentication, generics
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from comments.models import Comment
from tickets.models import Ticket
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


def get_app(request, data):
    if data['content_type'] == 'ticket':
        app = get_object_or_404(Ticket, id=data['object_id'])
        return app

    if data['content_type'] == 'post':
        app = get_object_or_404(Article, id=data['object_id'])
        return app


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
        request_data = json.loads(request.body.decode('utf-8'))

        app_id = request_data['object_id']
        app = get_app(request, request_data)

        if app is not None:
            app_content_type = ContentType.objects.get_for_model(app)
            user = get_comment_owner(request)

            if user is not None:
                comment_reply, created = Comment.objects.get_or_create(
                    user=user,
                    content_type=app_content_type,
                    object_id=app_id,
                    comment=request_data['comment'],
                )

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

        request_data = json.loads(request.body.decode('utf-8'))

        object_id = request_data['object_id']
        comment = request_data['comment']
        parent_id = request_data['parent']

        app = get_app(request, request_data)

        if app is not None:

            app_content_type = ContentType.objects.get_for_model(app)

            user = get_comment_owner(request)
            parent = Comment.objects.get(id=parent_id)

            if user is not None:

                comment_reply, created = Comment.objects.get_or_create(
                    user=user,
                    content_type=app_content_type,
                    object_id=object_id,
                    comment=comment,
                    parent=parent
                )
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
                'message': 'Could not resolve app type'
            }
            return JsonResponse(context, status=status.HTTP_400_BAD_REQUEST)
