from .serializers import TicketSerializer, TicketDetailSerializer
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import permissions, authentication, generics
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, GenericAPIView
from rest_framework.views import APIView
from tickets.models import Ticket, TicketSolution
from comments.models import Comment
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from accounts.models import UserProfile


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

            instance.status = 'doing'
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


def check_paid_tickets(request, ticket):
    ticket = TicketSolution.objects.get(id=ticket.id)
    paid_clients = ticket.paid_client
    try:
        paid_customer = paid_clients.get(id=request.user.id)
        if paid_customer is not None and ticket.status == 'done':
            return True
    except:
        return False


def get_paid_ticket(request, request_data):
    try:
        ticket = TicketSolution.objects.filter(
            parent_ticket_id=request_data['ticket_id'])
        if ticket.exists():
            return ticket[0]
    except:
        return None


class TicketSolutionAPIView(GenericAPIView):
    serializer_class = TicketSerializer
    permissions._classes = [permissions.IsAuthenticated]

    def post(self, request):
        request_data = json.loads(request.body.decode('utf-8'))
        try:
            ticket = get_paid_ticket(request, request_data)
            show_solution = check_paid_tickets(request, ticket)

            if ticket is not None and show_solution is True:
                solution = ticket.solution
                context = {
                    'show': show_solution,
                    'solution': solution
                }
                return Response(context, status=200)

            else:
                solution = check_paid_tickets(request, ticket)

                context = {
                    'show': True,
                    'solution': 'Work still in progress...'
                }
                return Response(context, status=200)
        except:
            context = {
                'message': 'Ticket has no payments yet',
            }
            return Response(context, status=400)
