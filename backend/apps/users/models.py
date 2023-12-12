from django.contrib.auth.models import AbstractUser
from django.db import models

from users.managers import UserManager
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    # country_code = models.CharField(default=998)
    phone_number = PhoneNumberField(unique=True, null=True, blank=True)
    confirmation_code = models.CharField(max_length=6, null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    username = models.EmailField(unique=True, null=True, blank=True)

    objects = UserManager()

    def __str__(self):
        return str(self.phone_number) or self.email
