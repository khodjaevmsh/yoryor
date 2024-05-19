import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.authtoken.models import Token

from chat.models import Message, Room
from users.models import Profile


class WebSocketAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        # Get the token from the query string
        query_string = scope.get("query_string", b"").decode("utf-8")
        params = dict(qc.split("=") for qc in query_string.split("&"))
        token = params.get("token")

        # Authenticate the user based on the token
        scope["user"] = await self.get_user(token)

        return await super().__call__(scope, receive, send)

    @database_sync_to_async
    def get_user(self, token):
        try:
            # Get the user associated with the token
            return Token.objects.get(key=token).user
        except Token.DoesNotExist:
            return AnonymousUser()


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f"chat_{self.room_id}"

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender = message['user']['_id']
        receiver = message['receiver']
        content = message['text']

        room = await self.get_or_create_room(sender=sender, receiver=receiver)
        saved_message = await self.create_and_save_message(room=room, sender=sender, content=content)
        unread_message_count = await self.get_unread_messages_count(room.id)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat.message',
                'message': message,
                'unread_message_count': unread_message_count
            }
        )

    async def chat_message(self, event):
        message = event['message']
        unread_message_count = event['unread_message_count']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'unread_message_count': unread_message_count
        }))

    @database_sync_to_async
    def get_or_create_room(self, sender, receiver):
        # Get or create a conversation between sender and receiver
        room = Room.objects.filter(participants__in=[sender, receiver]).annotate(
            participant_count=Count('participants')
        ).filter(participant_count=2).first()

        if not room:
            # Create a new conversation
            room = Room.objects.create()
            room.participants.add(sender, receiver)
        elif room.participants.count() == 1:
            # If there is only one participant, add the second one
            room.participants.add(receiver)

        return room

    @database_sync_to_async
    def create_and_save_message(self, room, sender, content):
        sender_profile = get_object_or_404(Profile, id=sender)
        room.updated_at = timezone.now()
        room.save()
        return Message.objects.create(room=room, user=sender_profile, content=content, seen=False)

    @database_sync_to_async
    def get_unread_messages_count(self, room_id):
        return Message.objects.filter(room=room_id, seen=False).count()
