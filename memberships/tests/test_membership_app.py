from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from knox.models import AuthToken
from memberships.models import Membership
import json


class TestMembershipApp(APITestCase):

    def setUp(self):
        self.sigup_client = APIClient()

        self.free_membership = Membership.objects.create(
            membership_type='free', price=0, stripe_plan_id='stripe_plan_id_free', slug='free')
        self.pro_membership = Membership.objects.create(
            membership_type='pro', price=10, stripe_plan_id='stripe_plan_id_pro', slug='pro')

        self.memberships_url = '/memberships/'

    def test_get_membership_types(self):
        memberships = Membership.objects.all()

        response = self.sigup_client.get(self.memberships_url)
        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response_data[0]['membership_type'], self.free_membership.slug)
        self.assertEqual(
            response_data[1]['membership_type'], self.pro_membership.slug)
