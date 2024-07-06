from django.urls import path

from chat.consumers import ChatConsumer, RoomsConsumer

websocket_urlpatterns = [
    path('ws/chat/rooms/', RoomsConsumer.as_asgi()),
    path('ws/chat/<str:room_name>/', ChatConsumer.as_asgi()),
]
