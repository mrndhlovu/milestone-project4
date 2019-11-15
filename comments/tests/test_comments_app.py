from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from knox.models import AuthToken
import json
from tickets.models import Ticket


class TestCommentsApp(APITestCase):

    def setUp(self):
        self.user = self.setup_user()
        self.token = AuthToken.objects.create(user=self.user)
        self.client = APIClient(HTTP_AUTHORIZATION='Token ' + self.token[1])
        self.ticket_one = Ticket.objects.create(
            title='Ticket 1', description='Ticket description', subject='Ticket subject', owner=self.user)

        self.ticket_detail_url = '/tickets/1/'
        self.create_comment_url = '/comments/create-comment/'
        self.create_reply_url = '/comments/create-reply/'

        self.create_comment_data = {
            'object_id': 1,
            'comment': 'Ticket comment',
            'content_type': 'ticket'
        }

        self.create_reply_data = {
            'object_id': 1,
            'comment': 'Ticket reply',
            'content_type': 'ticket',
            'parent': 1}

    @staticmethod
    def setup_user():
        return User.objects.create_user(
            username='user3',
            email='test2@testinginc.com',
            password='bazinga',
        )

    def test_create_comment_url(self):

        response = self.client.post(
            self.create_comment_url, data=self.create_comment_data)
        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response_data['message'], 'Comment created')

    def test_create_reply_url(self):

        comment = self.client.post(
            self.create_comment_url, data=self.create_comment_data)

        response = self.client.post(
            self.create_reply_url, data=self.create_reply_data)
        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response_data['message'], 'Reply submitted')

    def test_get_ticket_with_comment_and_reply(self):

        comment = self.client.post(
            self.create_comment_url, data=self.create_comment_data)
        reply = self.client.post(
            self.create_reply_url, data=self.create_reply_data)

        response = self.client.get(self.ticket_detail_url)
        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response_data['comments'], {})
