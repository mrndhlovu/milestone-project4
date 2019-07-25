
from .api import RegisterationAPI, LoginAPI, UserAPI
from knox import views as knox_views
from django.urls import path, include


urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterationAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
