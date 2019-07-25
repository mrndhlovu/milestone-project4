
# from tickets.models import Ticket
# from .serializers import TicketSerializer
# from rest_framework import viewsets, permissions


# class TicketViewSet(viewsets.ModelViewSet):
#     serializer_class = TicketSerializer
#     queryset = Ticket.objects.all()
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)
