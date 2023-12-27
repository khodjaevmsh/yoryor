from rest_framework.response import Response
from rest_framework.views import APIView

from users.serializers.profile import ProfileSerializer


class ProfileListView(APIView):
    def post(self, request):
        serializer = ProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Profile set successfully'}, 201)
