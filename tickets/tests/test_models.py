from django.test import Client, TestCase
from ..models import Ticket, TicketSolution
from django.contrib.auth.models import User


class TicketModelTest(TestCase):

    def setUp(self):
        user = User.objects.create_user(
            username='user1', password='bazinga',  email='testmail@gmail.com')

        Ticket.objects.create(
            title='Some ticket', description='Can you fix this', subject='A subject', owner=user)
        self.user = User.objects.get(username='user1')
        self.ticket = Ticket.objects.get(owner=user.id)

        self.ticket_solution = TicketSolution.objects.create(
            parent_ticket=self.ticket)

    def test_create_ticket(self):
        self.assertEqual(self.ticket.title, "Some ticket")
        self.assertEqual(self.ticket.price, 5)
        self.assertEqual(self.ticket.is_bug, False)
        self.assertEqual(self.ticket.is_feature, False)
        self.assertEqual(self.ticket.status, "todo")

    def test_create_ticket_solution(self):

        self.ticket_solution.paid_client.add(self.user)

        self.assertEqual(self.ticket_solution.solution, '')
        self.assertEqual(self.ticket_solution.paid_client.all()[0], self.user)
        self.assertEqual(self.ticket_solution.status, 'doing')
