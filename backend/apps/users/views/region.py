from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import Region
from users.serializers.region import RegionSerializer


class RegionListView(APIView):
    def get(self, request, *args, **kwargs):
        params = request.query_params.get('country', None)
        queryset = Region.objects.filter(country=params if params else None)
        serializer = RegionSerializer(queryset, many=True)
        return Response(serializer.data, 200)

    def list(self, search=None, show_actives=False):
        query = self.filter(name__icontains=search) if search else self
        query = query.filter(is_show=True) if show_actives else query
        return query.order_by('index')
