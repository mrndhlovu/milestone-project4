from django.urls import path, re_path
from .views import UserProfileListView


urlpatterns = [
    path('api/auth/profile/', UserProfileListView.as_view()),
]
