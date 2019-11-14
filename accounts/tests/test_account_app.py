from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from knox.models import AuthToken
from memberships.models import Membership
import json


class TestAccountApp(APITestCase):

    def setUp(self):
        self.sigup_client = APIClient()
        self.user = self.setup_user()
        self.token = AuthToken.objects.create(user=self.user)
        self.client = APIClient(HTTP_AUTHORIZATION='Token ' + self.token[1])
        self.sigup_url = '/accounts/api/auth/signup'
        self.login_url = '/accounts/api/auth/login'
        self.user_profile_url = '/accounts/api/auth/user'
        self.update_user_profile_url = '/accounts/api/auth/update'
        self.logout_url = '/accounts/api/auth/logout'

        self.sigup_data = {
            'username': 'user1',
            'email': 'test1@testinginc.com',
            'password': 'bazinga',
            'confirm_password': 'bazinga',
        }
        self.login_data = {'username': 'user3', 'password': 'bazinga'}
        self.update_user_profile_data = {'isImageUpload': '', 'occupation': 'software developer',
                                         'bio': 'User bio', 'first_name': 'Some Name', 'last_name': 'Some lastname'}

    @staticmethod
    def setup_user():
        return User.objects.create_user(
            username='user3',
            email='test2@testinginc.com',
            password='bazinga',
        )

    def test_sigup_url_and_assign_free_membership_and_create_new_user_account(self):
        membership = Membership.objects.create(
            slug='free', membership_type='free', price=0, stripe_plan_id='plan_id'
        )
        response = self.sigup_client.post(self.sigup_url, data=self.sigup_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(membership.id, 1)

    def test_login_url(self):
        response = self.client.post(self.login_url, data=self.login_data)
        self.assertEqual(response.status_code, 200)

    def test_user_profile_url_and_get_user_profile_data(self):
        response = self.client.get(self.user_profile_url)
        user = User.objects.filter(
            username=self.user).first()

        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data['is_active'], True)

    def test_update_user_url_and_update_profile(self):
        response = self.client.post(
            self.update_user_profile_url, data=self.update_user_profile_data)
        user = User.objects.filter(username=self.user).first()

        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data['message'], 'Profile Updated')

    def test_logout_url(self):
        login = self.client.post(self.login_url, data=self.login_data)
        logout = self.client.post(self.logout_url)

        self.assertEqual(login.status_code, 200)
        self.assertEqual(logout.status_code, 204)
