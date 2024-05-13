from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils.pagination import PageNumPagination
from users.models import Profile
from users.serializers.profile import ProfileSerializer, SimpleProfileSerializer


class ProfileListView(APIView, PageNumPagination):
    def get(self, request):
        profiles = Profile.objects.exclude(user=request.user).order_by('id')
        results = self.paginate_queryset(profiles, request, view=self)
        serializer = ProfileSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = ProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Profile created successfully'}, 201)


class ProfileDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(Profile, id=pk)
        serializer = ProfileSerializer(instance)
        return Response(serializer.data, status=200)

    def put(self, request, pk):
        instance = get_object_or_404(Profile, id=pk)
        serializer = SimpleProfileSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
