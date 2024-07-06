from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from rest_framework.authtoken.models import Token


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
