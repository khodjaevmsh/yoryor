from django.urls import path

from main.consumers import ProfileStatusConsumer

websocket_urlpatterns = [
    path('ws/main/profile-status/', ProfileStatusConsumer.as_asgi()),
]
