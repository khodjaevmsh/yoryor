from rest_framework.response import Response
from rest_framework.views import APIView

from users.serializers.device import DeviceSerializer


class DeviceTokenView(APIView):
    def post(self, request):
        serializer = DeviceSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)
