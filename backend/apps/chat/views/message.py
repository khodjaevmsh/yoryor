from rest_framework.views import APIView

from chat.models import Message
from chat.serializers.message import MessageSerializer
from core.utils.pagination import PageNumPagination


class MessageListView(APIView, PageNumPagination):
    page_size = 15

    def get(self, request):
        room = request.query_params.get('room', None)
        messages = Message.objects.filter(room=room).order_by('-timestamp')
        results = self.paginate_queryset(messages, request, view=self)
        serializer = MessageSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)
