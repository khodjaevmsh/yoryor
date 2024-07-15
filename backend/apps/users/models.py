from django.contrib.auth.models import AbstractUser
from django.db import models

from users.managers import UserManager


class User(AbstractUser):
    country_code = models.CharField(default='998')
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    username = models.CharField(unique=True, null=True, blank=True)

    objects = UserManager()

    def __str__(self):
        return str(self.phone_number) or self.email


class ConfirmationCode(models.Model):
    country_code = models.CharField(default='998')
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    confirmation_code = models.CharField(max_length=6, null=True, blank=True)

    def __str__(self):
        return self.phone_number


class Device(models.Model):
    user = models.ForeignKey('users.User', related_name='devices', on_delete=models.CASCADE)
    token = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.user.username}'s device with token {self.token}"
