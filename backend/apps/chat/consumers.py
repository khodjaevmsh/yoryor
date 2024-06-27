from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from channels.exceptions import StopConsumer
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from rest_framework.authtoken.models import Token

from chat.models import Message
from core.views.send_notification import send_notification
from users.models import Device


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


from channels.generic.websocket import AsyncWebsocketConsumer
import json


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

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
        # raise StopConsumer()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        room = text_data_json['room']
        content = text_data_json['content']
        sender = text_data_json['sender']
        receiver = text_data_json['receiver']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender,
                'receiver': receiver,
            }
        )

        # Save message to database
        await sync_to_async(Message.objects.create)(
            room_id=room['id'],
            user_id=sender['id'],
            content=content['text']
        )

        # Filter Device objects for the receiver
        device = await sync_to_async(Device.objects.filter(user=receiver['user']).first)()

        if device:
            send_notification(device_token=device.token, title=sender['name'], body=content['text'])

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']
        receiver = event['receiver']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender,
            'receiver': receiver,
        }))
