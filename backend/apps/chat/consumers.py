import json

from asgiref.sync import sync_to_async
from channels.exceptions import StopConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone

from chat.models import Message, Room
from core.views.send_notification import send_notification
from users.models import Device


class RoomsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'rooms'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    # Leave room group
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Process incoming WebSocket messages if needed
    async def receive(self, text_data):
        pass

    async def rooms_update(self, event):
        room = event['room']
        message = event['message']

        room_instance = await sync_to_async(Room.objects.get)(id=room['id'])
        unseen = await sync_to_async(room_instance.messages.filter(seen=False).count)()

        # Send the updated room info to WebSocket clients
        await self.send(text_data=json.dumps({
            'room': room,
            'message': message,
            'unseen': unseen,
        }))


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
        raise StopConsumer()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        room = text_data_json['room']
        sender = text_data_json['message']['user']
        receiver = text_data_json['receiver']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'room': room,
            }
        )

        # Broadcast update to rooms group
        await self.channel_layer.group_send(
            'rooms',
            {
                'type': 'rooms_update',
                'room': room,
                'message': message,
            }
        )

        # Save message to database
        await sync_to_async(Message.objects.create)(
            room_id=room['id'],
            user_id=sender['_id'],
            content=message['text']
        )

        # Update the room's updated_at field
        r = await sync_to_async(Room.objects.get)(id=room['id'])
        r.updated_at = timezone.now()
        await sync_to_async(r.save)()

        # Filter Device objects for the receiver
        receiver_device = await sync_to_async(Device.objects.filter(user=receiver['user']).first)()

        if receiver_device:
            send_notification(
                device_tokens=[receiver_device.token],
                title=sender['name'],
                body=message['text'],
                data={'screen': 'Chats'}
            )

    async def chat_message(self, event):
        message = event['message']
        room = event['room']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'room': room,
        }))

    # No need to handle this in ChatConsumer, but must define it
    async def rooms_update(self, event):
        pass
