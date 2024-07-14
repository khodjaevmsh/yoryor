from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils.pagination import PageNumPagination
from users.models import Like
from users.serializers.like import LikeSerializer


class LikeListView(APIView, PageNumPagination):
    def get(self, request):
        receiver = request.query_params.get('receiver', None)

        likes = Like.objects.select_related('sender', 'receiver').filter(receiver=receiver)
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


class CountOfLikesView(APIView):
    def get(self, request):
        receiver = request.query_params.get('receiver', None)

        count = Like.objects.filter(receiver=receiver).count()
        return Response({'count': count}, status=200)
