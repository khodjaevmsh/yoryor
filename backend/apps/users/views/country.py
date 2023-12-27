from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import Country
from users.serializers.country import CountrySerializer


class CountryListView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Country.objects.all()
        serializer = CountrySerializer(queryset, many=True)
        return Response(serializer.data, 200)
