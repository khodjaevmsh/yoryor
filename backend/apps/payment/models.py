from django.db import models

# Create your models here.
from django.utils import timezone


class Subscription(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='subscriptions')
    product_id = models.CharField(max_length=100)
    transaction_id = models.CharField(max_length=255, unique=True)
    receipt_data = models.TextField()
    platform = models.CharField(max_length=15)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} - {self.product_id}"

    def activate(self, duration_in_days):
        self.is_active = True
        self.start_date = timezone.now()
        self.end_date = self.start_date + timezone.timedelta(days=duration_in_days)
        self.save()

    def deactivate(self):
        self.is_active = False
        self.end_date = timezone.now()
        self.save()
