from .serializers import TicketSerializer, TicketCreateSerializer
from accounts.models import CustomUser
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import status
from rest_framework import permissions, authentication, generics
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, DestroyAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.views import APIView
from tickets.models import Ticket


class TicketListView(ListAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        # Copy parsed content from HTTP request
        data = request.data.copy()

        # Add id of currently logged user
        data['owner'] = request.user.id
        data['username'] = request.user.id

        # Default behavior but pass our modified data instead
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class TicketDetailView(RetrieveAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [permissions.AllowAny]


class CreateTicketView(CreateAPIView):
    serializer_class = TicketCreateSerializer
    queryset = Ticket.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        # Copy parsed content from HTTP request
        data = request.data.copy()

        # Add id of currently logged user
        data['owner'] = request.user.id
        data['username'] = request.user.id

        # Default behavior but pass our modified data instead
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class TicketVoteToggleAPIView(APIView):
    authetication_classes = (authentication.SessionAuthentication)
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id=None, format=None):
        id = self.kwargs.get('id')
        obj = get_object_or_404(Ticket, id=id)
        user = self.request.user
        updated = False
        voted = False

        if user in obj.votes.all():
            voted = False
            updated = True
            obj.votes.remove(user)

        else:
            voted = True
            updated = True
            obj.votes.add(user)

        data = {
            'voted': voted,
            'updated': updated,
        }

        return Response(data)
