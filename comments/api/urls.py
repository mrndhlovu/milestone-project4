
from .views import CommentsListView, CreateCommentView, CreateCommentReplyView
from django.urls import path


urlpatterns = [
    path('', CommentsListView.as_view()),
    path('create-comment/', CreateCommentView.as_view()),
    path('create-reply/', CreateCommentReplyView.as_view()),
]
