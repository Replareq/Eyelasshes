from django.test import TestCase
from client.models import Client


# Create your tests here.
class ClientModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Client.objects.create(name="Kirill", phone=291456894, ban=False, history="Добавлен как тест")

    def test_name_label(self):
        client = Client.objects.get(id=1)
        field_label = client._meta.get_field('name').verbose_name
        self.assertEquals(field_label, "Имя")

    def test_name_max_length(self):
        client = Client.objects.get(id=1)
        max_length = client._meta.get_field('name').max_length
        self.assertEquals(max_length, 20)

    def test_method_str(self):
        client = Client.objects.get(id=1)
        expected_object_name = client.name + str(client.phone)
        self.assertEquals(expected_object_name, str(client))

    def test_method_getname(self):
        client = Client.objects.get(id=1)
        self.assertEquals(client.getname(), "Kirill")
