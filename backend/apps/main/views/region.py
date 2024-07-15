from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from main.models import Region
from main.serializers.region import RegionSerializer


class RegionListView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        params = request.query_params.get('country', None)
        queryset = Region.objects.filter(country=params if params else None)
        serializer = RegionSerializer(queryset, many=True)
        return Response(serializer.data, 200)
