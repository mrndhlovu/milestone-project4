from rest_framework.routers import DefaultRouter
from .views import TicketListView, TicketVoteToggleAPIView, TicketDetailView, TicketSolutionAPIView, CreateTicketView, TicketUpdateView, TicketDeleteView
from django.urls import path, re_path

app_name = 'tickets'

urlpatterns = [
    path('', TicketListView.as_view()),
    path('<id>/', TicketDetailView.as_view()),
    path('update/<pk>/', TicketUpdateView.as_view()),
    path('delete/<pk>/', TicketDeleteView.as_view()),
    path('api/create/', CreateTicketView.as_view()),
    path('api/<id>/vote/', TicketVoteToggleAPIView.as_view()),
    path('api/paid-tickets/', TicketSolutionAPIView.as_view()),
]
