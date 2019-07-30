from .api import ProductsAPI
from knox import views as knox_views
from django.urls import path, include


urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/products', ProductsAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
