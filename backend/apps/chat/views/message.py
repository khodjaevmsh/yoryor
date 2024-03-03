from django.db.models import Max
from rest_framework.response import Response
from rest_framework.views import APIView

from chat.models import Message, Room
from chat.serializers.message import MessageSerializer, RoomSerializer


class RoomListView(APIView):
    def get(self, request):
        profile = request.user.profile.id
        rooms = Room.objects.filter(participants__in=[profile]).annotate(
            last_message_timestamp=Max('messages__timestamp')
        ).order_by('-last_message_timestamp')
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)


class MessageListView(APIView):
    def get(self, request):
        room = request.query_params.get('room', None)
        messages = Message.objects.filter(room=room).order_by('-timestamp')
        serializer = MessageSerializer(messages, many=True)
        for message in messages:
            if request.user.profile != message.user:
                message.seen = True
                message.save()
        return Response(serializer.data)
