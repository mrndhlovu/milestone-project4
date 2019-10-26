from .serializers import ArticleDetailSerializer, ArticleSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import permissions, authentication, generics
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, GenericAPIView
from rest_framework.views import APIView
from blog.models import Article
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from accounts.models import UserProfile
import traceback


def get_article_owner(request):
    article_owner_qs = User.objects.filter(username=request.user)

    if article_owner_qs.exists():
        return article_owner_qs.first()
    return None


def check_is_owner(instance, request):
    user = request.user
    try:
        owner_id = instance[0].owner_id
        if user is not None and user.id == owner_id:
            return True
        return False

    except Exception:
        return False


class ArticleListView(ListAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    permission_classes = [permissions.AllowAny]


class ArticleDetailView(RetrieveAPIView):
    serializer_class = ArticleDetailSerializer
    queryset = Article.objects.all()
    permission_classes = [permissions.AllowAny]

    def get(self, request, id=None, format=None):

        instance = Article.objects.filter(id=id)
        is_owner = check_is_owner(instance, request)

        if instance.exists():
            instance_comments = Article.objects.get(id=id)
            context = {
                'data': instance.values()[0],
                'owner': str(instance[0].owner),
                'likes': instance[0].likes.count(),
                'isOwner': is_owner,
                'comments': instance_comments.comments
            }
            return JsonResponse(context, status=status.HTTP_200_OK)
        else:
            context = {
                'message': 'Article not found'
            }
            return JsonResponse(context, status=status.HTTP_400_BAD_REQUEST)


class CreateArticleView(CreateAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        current_article_owner = get_article_owner(request)

        data = request.data.copy()

        data['owner'] = current_article_owner.id

        data['username'] = current_article_owner.id

        serializer = self.get_serializer(data=data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ArticleVoteToggleAPIView(APIView):
    authetication_classes = (authentication.SessionAuthentication)
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(**kwargs)
        current_article_owner = get_article_owner(self.request)

        context['owner'] = current_article_owner.id
        context['username'] = current_article_owner.id

        return context

    def get(self, request, id=None, format=None):
        id = self.kwargs.get('id')
        instance = get_object_or_404(Article, id=id)
        user = self.request.user
        updated = False
        voted = False

        if user in instance.likes.all():
            liked = False
            updated = True
            instance.likes.remove(user)

        else:
            liked = True
            updated = True
            instance.likes.add(user)

        data = {
            'liked': liked,
            'updated': updated,
        }

        if instance.likes.count() >= 2:

            instance.status = 'doing'
            instance.save()

        return Response(data)


class ArticleUpdateView(UpdateAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        current_article_owner = get_article_owner(request)

        data = request.data.copy()
        data['owner'] = current_article_owner.id
        data['username'] = current_article_owner.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ArticleDeleteView(DestroyAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    permission_classes = [permissions.AllowAny]
