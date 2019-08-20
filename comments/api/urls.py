
from .views import CommentsListView
from django.urls import path


urlpatterns = [
    path('', CommentsListView.as_view()),

]
