from datetime import timedelta

from django.utils import timezone
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from core.utils.pagination import PageNumPagination
from users.models import Profile, ProfileImage, Like
from users.serializers.profile import ProfileSerializer, SimpleProfileSerializer, ProfileImageSerializer, \
    ChangeProfileImageSerializer, LikeSerializer


class ProfileListView(APIView, PageNumPagination):
    def get(self, request):
        # profiles = Profile.objects.exclude(user=request.user).order_by('id')
        profiles = Profile.objects.all().order_by('id')

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


class LikeListView(APIView):
    def get(self, request):
        receiver = request.query_params.get('receiver', None)
        profile = get_object_or_404(Profile, id=receiver)

        # Calculate the timestamp one day ago
        one_day_ago = timezone.now() - timedelta(days=1)
        # Filter likes created within the last 24 hours
        likes = Like.objects.filter(receiver=profile, created_at__gte=one_day_ago)

        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)


class LikeDetailView(APIView):
    def get(self, request, pk):
        like = Like.objects.filter(receiver_id=pk).first()  # Retrieve the first like
        serializer = LikeSerializer(like)
        return Response(serializer.data, 200)

    def post(self, request, pk):
        receiver_profile = get_object_or_404(Profile, id=pk)
        sender_profile = request.user.profile  # Assuming you have a user profile associated with the request user

        serializer = LikeSerializer(data={'sender': sender_profile.id, 'receiver': receiver_profile.id})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 201)

    def delete(self, request, pk):
        receiver_profile = get_object_or_404(Profile, id=pk)
        sender_profile = request.user.profile

        like = Like.objects.filter(sender=sender_profile, receiver=receiver_profile).first()
        if like:
            like.delete()
            return Response({}, 204)
        else:
            return Response({'detail': 'Like not found'}, 404)
