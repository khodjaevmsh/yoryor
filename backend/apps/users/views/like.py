from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from chat.models import Room
from chat.serializers.room import RoomSerializer
from core.utils.pagination import PageNumPagination
from users.models import Like
from users.serializers.like import LikeSerializer


class LikeListView(APIView, PageNumPagination):
    def get(self, request):
        receiver = request.query_params.get('receiver', None)

        likes = Like.objects.filter(receiver=receiver)
        results = self.paginate_queryset(likes, request, view=self)
        serializer = LikeSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = LikeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)


class LikeDetailView(APIView):
    def get(self, request, pk):
        like = Like.objects.filter(sender=request.user.profile, receiver=pk).first()
        serializer = LikeSerializer(like)
        return Response(serializer.data, status=200)

    def delete(self, request, pk):
        like = get_object_or_404(Like, sender=request.user.profile, receiver=pk)
        like.delete()
        return Response({}, status=204)
