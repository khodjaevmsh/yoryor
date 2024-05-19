from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from chat.models import Room
from chat.serializers.room import RoomSerializer
from core.utils.pagination import PageNumPagination


class RoomListView(APIView, PageNumPagination):
    page_size = 10

    def get(self, request):
        profile = request.user.profile.id
        rooms = Room.objects.filter(participants__in=[profile]).order_by('-updated_at')
        results = self.paginate_queryset(rooms, request, view=self)
        serializer = RoomSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)


class RoomDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(Room, id=pk)
        serializer = RoomSerializer(instance)
        return Response(serializer.data, status=200)
