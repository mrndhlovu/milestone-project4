
from django.contrib import admin
from django.urls import path, include

urlpatterns = [

    path('rest-auth', include('rest_auth.urls')),
    path('rest-auth/registration', include('rest_auth.registration.urls')),
    path('tickets', include('tickets.urls')),
    path('api/tickets', include('tickets.urls')),
    path('', include('reactfrontend.urls')),
]
