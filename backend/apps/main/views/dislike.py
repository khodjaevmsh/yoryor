from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils.pagination import PageNumPagination
from main.models import Dislike
from main.serializers.dislike import DislikeSerializer


class DislikeListView(APIView, PageNumPagination):
    def get(self, request):
        receiver = request.query_params.get('receiver', None)

        dislikes = Dislike.objects.filter(receiver=receiver)
        results = self.paginate_queryset(dislikes, request, view=self)
        serializer = DislikeSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = DislikeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)


class DislikeDetailView(APIView):
    def get(self, request, pk):
        dislike = Dislike.objects.filter(sender=request.user.profile, receiver=pk).first()
        serializer = DislikeSerializer(dislike)
        return Response(serializer.data, status=200)
