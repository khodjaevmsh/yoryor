from django.contrib.auth.models import AbstractUser
from django.db import models

from users.managers import UserManager


class User(AbstractUser):
    # country_code = models.CharField(default=998)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    confirmation_code = models.CharField(max_length=6, null=True, blank=True)
    email = models.EmailField(unique=True)

    objects = UserManager()

    def __str__(self):
        return self.phone_number or self.email
