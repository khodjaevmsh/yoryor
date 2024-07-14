from django.contrib.auth.models import AbstractUser
from django.db import models

from core.utils.choices import GENDER_CHOICES, GOAL_CHOICES, LEVEL_CHOICES, MARITAL_STATUS_CHOICES, \
    INCOME_LEVEL_CHOICES, ZODIAC_CHOICES
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


class Country(models.Model):
    title = models.CharField(max_length=155)

    def __str__(self):
        return self.title


class Region(models.Model):
    country = models.ForeignKey('users.Country', on_delete=models.CASCADE)
    title = models.CharField(max_length=155)

    def __str__(self):
        return self.title


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=55, null=True, blank=True)
    birthdate = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, null=True, blank=True)
    region = models.ForeignKey('users.Region', on_delete=models.CASCADE, null=True, blank=True)
    goal = models.CharField(max_length=20, choices=GOAL_CHOICES, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    height = models.CharField(max_length=20, null=True, blank=True)
    weight = models.CharField(max_length=20, null=True, blank=True)
    education_level = models.CharField(max_length=20, choices=LEVEL_CHOICES, null=True, blank=True)
    education_school = models.CharField(max_length=85, null=True, blank=True)
    job_title = models.CharField(max_length=85, null=True, blank=True)
    job_company = models.CharField(max_length=85, null=True, blank=True)
    marital_status = models.CharField(max_length=20, choices=MARITAL_STATUS_CHOICES, null=True, blank=True)
    income_level = models.CharField(max_length=20, choices=INCOME_LEVEL_CHOICES, null=True, blank=True)
    zodiac = models.CharField(max_length=20, choices=ZODIAC_CHOICES, null=True, blank=True)

    def __str__(self):
        return self.name


class ProfileImage(models.Model):
    profile = models.ForeignKey('users.Profile', on_delete=models.CASCADE)
    image = models.ImageField(upload_to="profile")
    button_number = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.profile.name


class Like(models.Model):
    sender = models.ForeignKey('users.Profile', related_name='sender_like', on_delete=models.CASCADE)
    receiver = models.ForeignKey('users.Profile', related_name='receiver_like', on_delete=models.CASCADE)
    match = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('sender', 'receiver')

    def __str__(self):
        return f"{self.sender} liked {self.receiver}"


class Dislike(models.Model):
    sender = models.ForeignKey('users.Profile', related_name='sender_dislike', on_delete=models.CASCADE)
    receiver = models.ForeignKey('users.Profile', related_name='receiver_dislike', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('sender', 'receiver')

    def __str__(self):
        return f"{self.sender} disliked {self.receiver}"


class Device(models.Model):
    user = models.ForeignKey('users.User', related_name='devices', on_delete=models.CASCADE)
    token = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.user.username}'s device with token {self.token}"
