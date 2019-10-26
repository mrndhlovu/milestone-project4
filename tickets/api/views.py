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
import traceback


def get_ticket_owner(request):
    ticket_owner_qs = User.objects.filter(username=request.user)

    if ticket_owner_qs.exists():
        return ticket_owner_qs.first()
    return None


def check_is_owner(instance, request):
    user = request.user
    try:

        owner_id = instance[0].owner_id
        print(user)
        if user is not None and user.id == owner_id:
            return True
        return False

    except Exception:
        return False


class TicketListView(ListAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [permissions.AllowAny]


class TicketDetailView(RetrieveAPIView):
    serializer_class = TicketDetailSerializer
    queryset = Ticket.objects.all()
    permission_classes = [permissions.AllowAny]

    def get(self, request, id=None, format=None):

        instance = Ticket.objects.filter(id=id)
        is_owner = check_is_owner(instance, request)
        instance[0].get_ticket_views

        if instance.exists():
            instance_comments = Ticket.objects.get(id=id)
            context = {
                'data': instance.values()[0],
                'owner': str(instance[0].owner),
                'votes': instance[0].votes.count(),
                'isOwner': is_owner,
                'comments': instance_comments.comments,
            }
            return JsonResponse(context, status=status.HTTP_200_OK)
        else:
            context = {
                'message': 'Ticket not found'
            }
            return JsonResponse(context, status=status.HTTP_400_BAD_REQUEST)


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
    solution = TicketSolution.objects.get(id=ticket.id)

    paid_clients = solution.paid_client.all()

    if paid_clients.get(id=request.user.id) is not None and ticket.status == 'done':
        return True
    else:
        return None


def get_paid_ticket(request, request_data):
    ticket = TicketSolution.objects.filter(
        parent_ticket_id=request_data['ticket_id'])
    if ticket.exists():
        return ticket[0]
    else:
        return None


class TicketSolutionAPIView(GenericAPIView):
    serializer_class = TicketSerializer
    permissions._classes = [permissions.IsAuthenticated]

    def post(self, request):
        request_data = json.loads(request.body.decode('utf-8'))
        try:

            ticket = get_paid_ticket(request, request_data)

            if ticket is not None:
                show_solution = check_paid_tickets(request, ticket)

                if ticket is not None:
                    solution = ticket.solution
                    if show_solution is True:
                        context = {
                            'show': show_solution,
                            'solution': solution
                        }
                        return Response(context, status=200)
                    else:
                        context = {
                            'show': True,
                            'solution': "Work still in progress please check again later!"
                        }
                        return Response(context, status=200)
                else:
                    solution = check_paid_tickets(request, ticket)

                    context = {
                        'show': False,
                    }
                    return Response(context, status=200)
            else:
                context = {
                    'message': 'Ticket solution requires payment',
                }
                return Response(context, status=400)

        except Exception:

            context = {
                'message': 'Ticket solution requires payment',
            }
            return Response(context, status=400)
