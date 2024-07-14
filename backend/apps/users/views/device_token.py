from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from users.serializers.device_token import DeviceTokenSerializer


class DeviceTokenView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = DeviceTokenSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Device token successfully created'}, 201)
