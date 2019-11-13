from django.test import TestCase, Client
from django.urls import reverse
from accounts.models import CustomUser, UserProfile
import json
from django.contrib.auth.models import User


# class TicketVoteAPIViewTest(TestCase):

#     def setUp(self):
#         self.credentials = {
#             'username': 'user3',
#             'password': 'bazinga'}
#         self.user = self.setup_user()
#         self.login_url = '/accounts/api/auth/login'

#     @staticmethod
#     def setup_user():
#         return User.objects.create_user(
#             username='user3',
#             email='test2@testinginc.com',
#             password='bazinga',
#         )

#     def test_login(self):
#         # send login data
#         response = self.client.post(
#             self.login_url, self.credentials, follow=True)
#         # should be logged in now

#         print(response)
#         self.assertTrue(response.context['user'].is_active)
