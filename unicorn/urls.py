
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tickets/', include('tickets.api.urls')),
    path('accounts/', include('accounts.api.urls')),
    path('memberships/', include('memberships.api.urls')),
    path('comments/', include('comments.api.urls')),
    path('cart/', include('cart.api.urls')),
    path('blog/', include('blog.api.urls')),

    re_path('.*', TemplateView.as_view(template_name='index.html')),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)

    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
