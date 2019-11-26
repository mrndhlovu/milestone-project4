from .views import SignupAPI, LoginAPI, UserAPI, UserUpdateAPIView, UserRemoveImageAPIView
from knox import views as knox_views
from django.urls import path, include


urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/signup', SignupAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/update', UserUpdateAPIView.as_view()),
    path('api/auth/remove-img-url', UserRemoveImageAPIView.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
