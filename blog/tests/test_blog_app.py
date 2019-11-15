from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from knox.models import AuthToken
from memberships.models import Membership
import json
from ..models import Article


class TestBlogApp(APITestCase):

    def setUp(self):
        self.user = self.setup_user()
        self.token = AuthToken.objects.create(user=self.user)
        self.client = APIClient(HTTP_AUTHORIZATION='Token ' + self.token[1])
        self.article_one = Article.objects.create(
            title='Article 1', content='Artcile content', subject='Article subject', owner=self.user)
        self.article_two = Article.objects.create(
            title='Article 2', content='Artcile 2 content', subject='Article 2 subject', owner=self.user)

        self.list_url = '/blog/'
        self.article_detail_url = '/blog/article/2/'
        self.article_vote_url = '/blog/api/2/vote/'
        self.update_article_url = '/blog/update/1/'
        self.delete_article_url = '/blog/delete/1/'
        self.create_article_url = '/blog/api/create/'
        self.single_article_id = 2

        self.new_article_data = {
            'title': 'Updated title',
            'subject': 'Updated subject',
            'content': 'Updated content',
        }

    @staticmethod
    def setup_user():
        return User.objects.create_user(
            username='user3',
            email='test2@testinginc.com',
            password='bazinga',
        )

    def test_article_list_url_get_all_articles(self):
        articles = Article.objects.all()

        response = self.client.get(self.list_url)
        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(articles.count(), 2)
        self.assertEqual(response_data[1]['id'], articles[1].id)

    def test_article_detail_url_and_get_data(self):

        response = self.client.get(self.article_detail_url)
        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data['data']['owner_id'], self.user.id)

    def test_article_vote_url_vote(self):
        article = Article.objects.filter(id=self.article_two.id).first()
        response = self.client.get(self.article_vote_url)
        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response_data['liked'])

    def test_update_article_url(self):
        article = Article.objects.filter(id=self.article_two.id).first()
        response = self.client.put(
            self.update_article_url, data=self.new_article_data)
        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data['title'],
                         self.new_article_data['title'])

    def test_create_article_url(self):

        response = self.client.post(
            self.create_article_url, data=self.new_article_data)
        response_data = json.loads(response.content)

        self.assertEqual(response.status_code, 201)
