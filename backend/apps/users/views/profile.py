from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils.pagination import PageNumPagination
from users.models import Profile, ProfileImage
from users.serializers.profile import ProfileSerializer, SimpleProfileSerializer, ProfileImageSerializer, \
    ChangeProfileImageSerializer


class ProfileListView(APIView, PageNumPagination):
    def get(self, request):
        region = request.query_params.get('region', None)
        country = request.query_params.get('country', None)
        print(region)

        # profiles = Profile.objects.exclude(user=request.user).order_by('id')
        profiles = Profile.objects.all().order_by('id')

        if region:
            profiles = profiles.filter(region=region)

        if country:
            profiles = profiles.filter(country=country)

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
        return Response(serializer.data)

    def put(self, request, pk):
        instance = get_object_or_404(Profile, id=pk)
        serializer = SimpleProfileSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ProfileImageListView(APIView):
    def get(self, request):
        profile = request.query_params.get('profile', None)

        if profile:
            profile_images = ProfileImage.objects.filter(profile=profile).order_by('button_number')
        else:
            profile_images = ProfileImage.objects.all()

        serializer = ProfileImageSerializer(profile_images, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        profile_image = ProfileImage.objects.get(pk=pk)
        serializer = ProfileImageSerializer(profile_image, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ProfileImageDetailView(APIView):
    def get(self, request, pk):
        profile_image = get_object_or_404(ProfileImage, id=pk)
        serializer = ProfileImageSerializer(profile_image)
        return Response(serializer.data)

    def delete(self, request, pk):
        profile_image = get_object_or_404(ProfileImage, pk=pk)
        profile_image.delete()
        return Response(status=204)


class ChangeProfileImageView(APIView):
    def post(self, request):
        serializer = ChangeProfileImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({}, 201)
