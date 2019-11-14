import json
from ..models import Ticket, TicketSolution
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from knox.models import AuthToken


class TestTicketAppURLS(APITestCase):

    def setUp(self):

        self.user = self.setup_user()
        self.token = AuthToken.objects.create(user=self.user)
        self.client = APIClient(HTTP_AUTHORIZATION='Token ' + self.token[1])
        self.ticket_one = Ticket.objects.create(
            title='Ticket 1', description='Ticket description', subject='Ticket subject', owner=self.user)
        self.ticket_list_url = '/tickets/'
        self.ticket_detail_url = '/tickets/1/'
        self.ticket_update_url = '/tickets/update/1/'
        self.ticket_create_url = '/tickets/api/create/'
        self.ticket_delete_url = '/tickets/delete/1/'
        self.ticket_vote_url = '/tickets/api/1/vote/'
        self.ticket_solution_url = '/tickets/api/paid-tickets/'
        self.paid_ticket = {'ticket_id': 1}
        self.update_body = {
            'title': 'Updated title',
            'description': 'Updated description',
            'subject': 'Update subject'
        }

    @staticmethod
    def setup_user():
        return User.objects.create_user(
            username='user3',
            email='test2@testinginc.com',
            password='bazinga',
        )

    def test_ticket_list_url(self):
        response = self.client.get(self.ticket_list_url)
        self.assertEqual(response.status_code, 200)

    def test_ticket_detail_url(self):
        response = self.client.get(self.ticket_detail_url)
        self.assertEqual(response.status_code, 200)

    def test_ticket_update_url(self):

        response = self.client.put(
            self.ticket_update_url, self.update_body, )

        self.assertEqual(response.status_code, 200)

    def test_ticket_delete_url(self):

        response = self.client.delete(
            self.ticket_delete_url)
        self.assertEqual(response.status_code, 204)

    def test_ticket_vote_url(self):

        response = self.client.get(
            self.ticket_vote_url)
        self.assertEqual(response.status_code, 200)

    def test_invalid_ticket_solution(self):

        response = self.client.post(
            self.ticket_solution_url, data={'ticket_id': 1})
        self.assertEqual(response.status_code, 400)

    def test_valid_ticket_solution_url(self):

        ticket = Ticket.objects.filter(id=self.ticket_one.id).first()
        ticket_solution = TicketSolution.objects.create(
            parent_ticket=ticket, solution='Ticket solution', status='doing')
        solution = TicketSolution.objects.filter(parent_ticket=ticket).first()
        solution.paid_client.add(self.user)

        response = self.client.post(
            self.ticket_solution_url, data={'ticket_id': 1})
        self.assertEqual(response.status_code, 200)
