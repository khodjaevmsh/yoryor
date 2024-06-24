from django.urls import path

from core.views.configurations import ConfigurationsView
from core.views.send_notification import SendNotification

urlpatterns = [
    path('configurations', ConfigurationsView.as_view(), name='configurations'),
    path('send-notification', SendNotification.as_view(), name='send-notification'),
]
