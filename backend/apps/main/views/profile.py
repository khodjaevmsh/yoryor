from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils.pagination import PageNumPagination
from main.models import Profile, Like, Dislike
from main.serializers.profile import ProfileSerializer, SimpleProfileSerializer


class ProfileListView(APIView, PageNumPagination):
    page_size = 14

    def get(self, request):
        country = request.query_params.get('country')
        region = request.query_params.get('region')
        gender = request.query_params.get('gender')
        encounter = request.query_params.get('encounter')

        queryset = Profile.objects.exclude(user=request.user)

        if country:
            queryset = queryset.filter(region__country=country)
        if region:
            queryset = queryset.filter(region=region)
        if gender:
            queryset = queryset.filter(gender=gender)

        # Фильтр по пользователям у которых уже есть лайк или дислайк
        if encounter:
            # Получаем все профили, которые пользователь лайкал
            liked = Like.objects.filter(sender=request.user.profile).values_list('receiver_id', flat=True)
            disliked = Dislike.objects.filter(sender=request.user.profile).values_list('receiver_id', flat=True)

            # Объединяем списки профилей, на которые пользователь поставил лайк или дислайк
            profiles = list(liked) + list(disliked)

            # Исключаем эти профили из queryset
            queryset = queryset.exclude(id__in=profiles)

        results = self.paginate_queryset(queryset, request, view=self)
        serializer = SimpleProfileSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request):
        serializer = ProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Profile created successfully'}, 201)


class ProfileDetailView(APIView):
    def get(self, request, pk):
        instance = get_object_or_404(Profile, id=pk)
        serializer = SimpleProfileSerializer(instance)
        return Response(serializer.data, status=200)

    def put(self, request, pk):
        instance = get_object_or_404(Profile, id=pk)
        serializer = SimpleProfileSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
