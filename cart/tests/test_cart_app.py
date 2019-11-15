from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from knox.models import AuthToken
import json
from tickets.models import Ticket


class TestCartApp(APITestCase):

    def setUp(self):
        self.user = self.setup_user()
        self.token = AuthToken.objects.create(user=self.user)
        self.client = APIClient(HTTP_AUTHORIZATION='Token ' + self.token[1])
        self.ticket_one = Ticket.objects.create(
            title='Ticket 1', description='Ticket description', subject='Ticket subject', owner=self.user)

        self.add_to_cart_url = '/cart/add-to-cart/'
        self.cart_pending_order_url = '/cart/pending-order/'
        self.cart_remove_from_cart_url = '/cart/remove-item/'
        self.cart_checkout_url = '/cart/checkout/'

        self.add_to_cart_data = {
            'product_id': 1,
            'product': 'ticket',
        }

    @staticmethod
    def setup_user():
        return User.objects.create_user(
            username='user3',
            email='test2@testinginc.com',
            password='bazinga',
        )

    def test_add_to_url(self):

        response = self.client.post(
            self.add_to_cart_url, data=self.add_to_cart_data)
        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data['message'], 'Item added to cart.')

    def test_get_cart_pending_order_url_request_item_in_cart(self):
        add_to_cart = self.client.post(
            self.add_to_cart_url, data=self.add_to_cart_data)

        pending_order_response = self.client.get(self.cart_pending_order_url)
        response_data = json.loads(pending_order_response.content)

        self.assertEqual(pending_order_response.status_code, 200)
        self.assertEqual(response_data['count'], 1)

    def test_cart_remove_from_cart_url(self):
        add_to_cart = self.client.post(
            self.add_to_cart_url, data=self.add_to_cart_data)

        remove_from_cart_response = self.client.post(
            self.cart_remove_from_cart_url,  data=self.add_to_cart_data)
        response_data = json.loads(remove_from_cart_response.content)

        self.assertEqual(add_to_cart.status_code, 200)
        self.assertEqual(remove_from_cart_response.status_code, 200)
        self.assertEqual(response_data['message'], 'Item removed from cart')

    def test_invalid_cart_checkout_url(self):
        response = self.client.post(
            self.cart_checkout_url, data={'stripeToken': 'sometoken'})
        self.assertEqual(response.status_code, 404)
