from .serializers import TicketSerializer, TicketDetailSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import permissions, authentication, generics
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.views import APIView
from tickets.models import Ticket
from comments.models import Comment
from django.contrib.auth.models import User
from django.http import JsonResponse


def get_ticket_owner(request):
    ticket_owner_qs = User.objects.filter(username=request.user)

    if ticket_owner_qs.exists():
        return ticket_owner_qs.first()
    return None


class TicketListView(ListAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [permissions.AllowAny]


class TicketDetailView(RetrieveAPIView):
    serializer_class = TicketDetailSerializer
    queryset = Ticket.objects.all()
    permission_classes = [permissions.AllowAny]


class CreateTicketView(CreateAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        current_ticket_owner = get_ticket_owner(request)

        data = request.data.copy()
        data['owner'] = current_ticket_owner.id
        data['username'] = current_ticket_owner.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class TicketVoteToggleAPIView(APIView):
    authetication_classes = (authentication.SessionAuthentication)
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context(**kwargs)
        current_ticket_owner = get_ticket_owner(self.request)

        context['owner'] = current_ticket_owner.id
        context['username'] = current_ticket_owner.id

        return context

    def get(self, request, id=None, format=None):
        id = self.kwargs.get('id')
        instance = get_object_or_404(Ticket, id=id)
        user = self.request.user
        updated = False
        voted = False

        if user in instance.votes.all():
            voted = False
            updated = True
            instance.votes.remove(user)

        else:
            voted = True
            updated = True
            instance.votes.add(user)

        data = {
            'voted': voted,
            'updated': updated,
        }

        if instance.votes.count() >= 2:

            instance.in_progress = True
            instance.save()

        return Response(data)


class TicketUpdateView(UpdateAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        current_ticket_owner = get_ticket_owner(request)

        data = request.data.copy()
        data['owner'] = current_ticket_owner.id
        data['username'] = current_ticket_owner.id

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class TicketDeleteView(DestroyAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [permissions.AllowAny]
