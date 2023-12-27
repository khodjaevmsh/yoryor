from django.contrib.auth.models import AbstractUser
from django.db import models

from users.managers import UserManager


class User(AbstractUser):
    # country_code = models.CharField(default=998)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    username = models.CharField(unique=True, null=True, blank=True)

    objects = UserManager()

    def __str__(self):
        return str(self.phone_number) or self.email


class ConfirmationCode(models.Model):
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    confirmation_code = models.CharField(max_length=6, null=True, blank=True)

    def __str__(self):
        return self.phone_number


class Profile(models.Model):
    GOAL_CHOICES = [
        ('match', 'Juftlik topish'),
        ('friendship', 'Do\'st ortirish'),
        ('long_term_dating', 'Uzoq muddatli tanishuv'),
        ('short_term_dating', 'Qisqa muddatli tanishuv'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=115)
    birthdate = models.DateField(null=True, blank=True)
    region = models.ForeignKey('users.Region', on_delete=models.CASCADE)
    goal = models.CharField(max_length=255, choices=GOAL_CHOICES)

    def __str__(self):
        return self.name


class Country(models.Model):
    title = models.CharField(max_length=155)

    def __str__(self):
        return self.title


class Region(models.Model):
    country = models.ForeignKey('users.Country', on_delete=models.CASCADE)
    title = models.CharField(max_length=155)

    def __str__(self):
        return self.title
