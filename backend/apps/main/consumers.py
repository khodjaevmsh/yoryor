from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from main.models import Profile


class ProfileStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope["user"].is_anonymous:
            await self.close()
        else:
            await self.accept()
            await self.update_user_increment(self.scope["user"])

    async def disconnect(self, close_code):
        if not self.scope["user"].is_anonymous:
            await self.update_user_decrement(self.scope["user"])

    @database_sync_to_async
    def update_user_increment(self, user):
        Profile.objects.filter(user=user.id).update(online='online')

    @database_sync_to_async
    def update_user_decrement(self, user):
        Profile.objects.filter(user=user.id).update(online='offline')
