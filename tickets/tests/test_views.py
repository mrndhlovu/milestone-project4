import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from ..models import Ticket, TicketSolution
from ..api.serializers import TicketSerializer
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from ..api import views
from rest_framework.test import APIClient
from knox.models import AuthToken
from django.http import JsonResponse
from django.test.utils import setup_test_environment
from django.contrib.auth import get_user_model
from accounts.api import views as login_view
from django.utils.encoding import iri_to_uri


class TicketListAPIViewTest(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.list_url = '/tickets/'

    def test_get_all_tickets(self):

        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, 200)


class TicketDetailAPIViewTest(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.ticket_url = '/tickets/2/'
        user = User.objects.create_user(
            username='user1', password='bazinga',  email='testmail@gmail.com')
        self.ticket_one = Ticket.objects.create(
            title='Ticket 1', description='Ticket description', subject='Ticket subject', owner=user)

        self.ticket_two = Ticket.objects.create(
            title='Ticket 2', description='AnotherTicket description', subject='With a subject', owner=user)

    def test_ticket_detail_GET(self):
        ticket = Ticket.objects.filter(id=self.ticket_two.id).first()
        serializer = TicketSerializer(ticket)

        response = self.client.get(self.ticket_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.loads(response.content)[
                         'data']['id'], serializer.data['id'])


class TicketVoteAPIViewTest(APITestCase):

    def setUp(self):

        self.user = self.setup_user()
        self.token = AuthToken.objects.create(user=self.user)
        self.client = APIClient(HTTP_AUTHORIZATION='Token ' + self.token[1])
        self.params = {
            'Authorization': 'Token {}'.format(self.token[1]), "Content-Type": "application/json"
        }
        self.ticket_one = Ticket.objects.create(
            title='Ticket 1', description='Ticket description', subject='Ticket subject', owner=self.user)
        self.vote_url = '/tickets/api/1/vote/'

    @staticmethod
    def setup_user():
        return User.objects.create_user(
            username='user3',
            email='test2@testinginc.com',
            password='bazinga',
        )

    def test_ticket_vote_upvote_and_downvote_POST(self):
        ticket = self.ticket_one
        voted = False

        if self.user not in ticket.votes.all():
            voted = True
            ticket.votes.add(self.user)
            ticket.save()

            self.assertEqual(ticket.votes.all().count(), 1)

            if self.user in ticket.votes.all():
                voted = False
                ticket.votes.remove(self.user)
                ticket.save()

                self.assertEqual(ticket.votes.all().count(), 0)

        response = self.client.get(self.vote_url, headers=self.params)

        self.assertEqual(response.status_code, 200)


class TicketUpdateViewTest(APITestCase):
    def setUp(self):

        self.user = self.setup_user()
        self.token = AuthToken.objects.create(user=self.user)
        self.client = APIClient(HTTP_AUTHORIZATION='Token ' + self.token[1])

        self.update_body = {
            'title': 'Updated title',
            'description': 'Updated description',
            'subject': 'Update subject'
        }
        self.params = {
            'Authorization': 'Token {}'.format(self.token[1]), "Content-Type": "application/json"
        }
        self.ticket_one = Ticket.objects.create(
            title='Ticket 1', description='Ticket description', subject='Ticket subject', owner=self.user)
        self.update_ticket_url = '/tickets/update/1/'

    @staticmethod
    def setup_user():
        return User.objects.create_user(
            username='user3',
            email='test2@testinginc.com',
            password='bazinga',
        )

    def test_ticket_update_POST(self):
        ticket = self.ticket_one
        response = self.client.put(
            self.update_ticket_url, self.update_body, headers=self.params)
        response.user = self.user
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.data['title'], ticket.title)
        self.assertNotEqual(response.data['subject'], ticket.subject)
        self.assertNotEqual(response.data['description'], ticket.description)
        self.assertEqual(response.data['id'], ticket.id)

    def test_invalid_ticket_update_POST(self):
        ticket = self.ticket_one
        response = self.client.put(
            self.update_ticket_url)
        self.assertEqual(response.status_code, 400)


class TicketSolutionAPIViewTest(APITestCase):

    def setUp(self):

        self.user = self.setup_user()
        self.factory = APIRequestFactory()
        self.token = AuthToken.objects.create(user=self.user)
        self.client = APIClient(HTTP_AUTHORIZATION='Token ' + self.token[1])
        self.params = {
            'Authorization': 'Token {}'.format(self.token[1]), "Content-Type": "application/json"
        }
        self.ticket_one = Ticket.objects.create(
            title='Ticket 1', description='Ticket description', subject='Ticket subject', owner=self.user)
        self.ticket_solution_url = '/tickets/api/paid-tickets/'
        self.paid_ticket = {'ticket_id': 1}
        self.view = views.TicketSolutionAPIView.as_view()

    @staticmethod
    def setup_user():
        return User.objects.create_user(
            username='user3',
            email='test2@testinginc.com',
            password='bazinga',
        )

    def test_create_ticket_solution_add_paid_user_then_user_get_solution_POST(self):
        ticket = Ticket.objects.filter(id=self.ticket_one.id).first()
        ticket_solution = TicketSolution.objects.create(
            parent_ticket=ticket, solution='Ticket solution', status='doing')
        solution = TicketSolution.objects.filter(parent_ticket=ticket).first()
        solution.paid_client.add(self.user)

        if(solution.paid_client.get(username=self.user) == self.user):
            ticket.has_solution = True

        request = self.client.post(
            self.ticket_solution_url, self.paid_ticket, headers=self.params)
        response = json.loads(request.content)

        self.assertEqual(solution.status, 'doing')
        self.assertEqual(ticket.has_solution, True)
        self.assertEqual(response['show'], True)
        self.assertEqual(response['solution'],
                         'Work still in progress please check again later!')
