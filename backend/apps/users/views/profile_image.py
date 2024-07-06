from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import ProfileImage
from users.serializers.profile_image import ProfileImageSerializer, ChangeProfileImageSerializer


class ProfileImageListView(APIView):
    def get(self, request):
        profile = request.query_params.get('profile', None)

        if profile:
            profile_images = ProfileImage.objects.filter(profile=profile).order_by('button_number')
        else:
            profile_images = ProfileImage.objects.all()

        serializer = ProfileImageSerializer(profile_images, many=True)
        return Response(serializer.data, status=200)

    def post(self, request, pk):
        profile_image = ProfileImage.objects.get(pk=pk)
        serializer = ProfileImageSerializer(profile_image, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)


class ProfileImageDetailView(APIView):
    def get(self, request, pk):
        profile_image = get_object_or_404(ProfileImage, id=pk)
        serializer = ProfileImageSerializer(profile_image)
        return Response(serializer.data, status=200)

    def delete(self, request, pk):
        profile_image = get_object_or_404(ProfileImage, pk=pk)
        profile_image.delete()
        return Response({}, status=204)


# Change profile image
class ChangeProfileImageView(APIView):
    def post(self, request):
        serializer = ChangeProfileImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({}, status=201)


class SingleProfileImageView(APIView):
    def get(self, request):
        profile = request.query_params.get('profile', None)

        profile_image = ProfileImage.objects.filter(profile=profile).order_by('button_number').first()
        serializer = ProfileImageSerializer(profile_image)
        return Response(serializer.data, status=200)
