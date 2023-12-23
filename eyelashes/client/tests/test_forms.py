from django.test import TestCase
from client.models import Client
from django.urls import reverse


# Create your tests here.
class ListViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        for client_number in range(10):
            Client.objects.create(name=f"Client N{client_number}", phone=client_number*100000000, ban=False,
                                  history=f"Test Client N{client_number}")

    def test_view_home(self):
        resp = self.client.get('')
        self.assertEqual(resp.status_code, 200)

    def test_view_book(self):
        resp = self.client.get('/book/Февраль 2024')
        self.assertEqual(resp.status_code, 200)
