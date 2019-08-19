from rest_framework.routers import DefaultRouter
from .views import TicketListView, TicketVoteToggleAPIView, TicketDetailView, CreateTicketView
from django.urls import path, re_path


urlpatterns = [
    path('', TicketListView.as_view()),
    path('<pk>/', TicketDetailView.as_view()),
    path('api/create/', CreateTicketView.as_view()),
    path('api/<id>/vote/', TicketVoteToggleAPIView.as_view()),
]
