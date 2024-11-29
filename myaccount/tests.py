from django.test import TestCase
from .models import *


# Create your tests here.
class UserTest(TestCase):
    def setUp(self):
        User.objects.create(
            username="Nico",
            email="niccolo.frassetto@gmail.com",
            first_name="Niccolò",
            last_name="Frassetto",
            password="12341234",
        )

        User.objects.create(
            username="Marta",
            email="marta.amodio@gmail.com",
            password="12341234",
            first_name="",
            last_name="Amodio",
        )

    def test_valid_user(self):
        user = User.objects.get(username="Nico")
        self.assertTrue(user.is_valid())

    def test_invalid_user(self):
        user = User.objects.get(username="Marta")
        self.assertFalse(user.is_valid())
