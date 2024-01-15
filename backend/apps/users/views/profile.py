from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import Profile, ProfileImage
from users.serializers.profile import ProfileSerializer, SimpleProfileSerializer, ProfileImageSerializer, \
    ChangeProfileImageSerializer


class ProfileListView(APIView):
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
    def get(self, request, pk):
        profile_images = ProfileImage.objects.filter(profile=pk).order_by('button_number')
        serializer = ProfileImageSerializer(profile_images, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        profile_image = ProfileImage.objects.get(pk=pk)
        serializer = ProfileImageSerializer(profile_image, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ProfileImageDetailView(APIView):
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
