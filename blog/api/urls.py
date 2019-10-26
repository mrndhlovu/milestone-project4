from rest_framework.routers import DefaultRouter
from .views import ArticleListView, ArticleVoteToggleAPIView, ArticleDetailView, CreateArticleView, ArticleUpdateView, ArticleDeleteView
from django.urls import path

app_name = 'blog'

urlpatterns = [
    path('', ArticleListView.as_view()),
    path('article/<id>/', ArticleDetailView.as_view()),
    path('update/<pk>/', ArticleUpdateView.as_view()),
    path('delete/<pk>/', ArticleDeleteView.as_view()),
    path('api/create/', CreateArticleView.as_view()),
    path('api/<id>/vote/', ArticleVoteToggleAPIView.as_view()),
]
