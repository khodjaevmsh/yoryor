from rest_framework.response import Response
from rest_framework.views import APIView

from users.serializers.device_token import DeviceTokenSerializer


class DeviceTokenView(APIView):
    def post(self, request):
        serializer = DeviceTokenSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({}, 201)
