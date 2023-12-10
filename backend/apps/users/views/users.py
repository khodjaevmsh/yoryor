from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from users.serializers.users import UserSerializer


class UserAllListView(APIView):
    def get(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
