
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    # path('api-auth/', include('rest_framework.urls')),
    # path('rest-auth/', include('rest_auth.urls')),
    path('admin/', admin.site.urls),
    path('tickets/', include('tickets.api.urls')),
    path('products/', include('products.api.urls')),

    # path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('accounts/', include('accounts.api.urls')),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
]
