from rest_framework.response import Response
from rest_framework.views import APIView

from users.serializers.profile import SetNameSerializer


class SetNameView(APIView):
    def post(self, request):
        serializer = SetNameSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Name set successfully'}, 201)
