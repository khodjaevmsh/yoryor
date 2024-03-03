from django.urls import path

from chat.views.message import MessageListView, RoomListView

urlpatterns = [
    path('rooms', RoomListView.as_view(), name='room-list'),
    path('messages', MessageListView.as_view(), name='message-list'),
]
