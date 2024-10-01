from django.urls import path

from payment.views.subscription import SubscriptionListView

urlpatterns = [
    path('subscription', SubscriptionListView.as_view(), name='subscription_create'),
]
