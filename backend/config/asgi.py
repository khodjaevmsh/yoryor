"""
ASGI config for config project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

from .wsgi import *  # add this line to top of your code
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from django.urls import path

from chat.consumers import RoomsConsumer, ChatConsumer
from chat.middleware import WebSocketAuthMiddleware
from main.consumers import ProfileStatusConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': WebSocketAuthMiddleware(
        AuthMiddlewareStack(
            URLRouter([
                path('ws/chat/rooms/', RoomsConsumer.as_asgi()),
                path('ws/chat/<str:room_name>/', ChatConsumer.as_asgi()),
                path('ws/main/profile-status/', ProfileStatusConsumer.as_asgi()),
            ])
        ))
})
