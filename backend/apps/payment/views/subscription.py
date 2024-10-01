from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from payment.models import Subscription
from payment.serializers.subscription import SubscriptionSerializer


class SubscriptionListView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = Subscription.objects.filter(user=request.user, is_active=True).first()
        serializer = SubscriptionSerializer(queryset)
        return Response(serializer.data, status=200)

    def post(self, request):
        serializer = SubscriptionSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)
