from rest_framework.response import Response
from rest_framework.views import APIView

from chat.models import Message
from chat.serializers.message import MessageSerializer


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
