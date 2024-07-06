from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from chat.models import Message, Room
from chat.serializers.message import MessageSerializer
from core.utils.pagination import PageNumPagination


class MessageListView(APIView, PageNumPagination):
    page_size = 15

    def get(self, request):
        room_id = request.query_params.get('room', None)
        room = get_object_or_404(Room, id=room_id)

        unseen = room.messages.filter(seen=False).exclude(user=request.user.profile)
        unseen.update(seen=True)

        messages = Message.objects.filter(room=room).order_by('-created_at')
        results = self.paginate_queryset(messages, request, view=self)
        serializer = MessageSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)
