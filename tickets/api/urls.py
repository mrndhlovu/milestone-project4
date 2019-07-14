from django.urls import path, include
from .views import TicketListView, TicketDetailView

urlpatterns = [
    path('', TicketListView.as_view()),
    path('<pk>', TicketDetailView.as_view()),
]
