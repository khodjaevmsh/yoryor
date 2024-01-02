from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView


class SignOutView(APIView):
    def delete(self, request):
        if request.auth.key:
            Token.objects.filter(key=request.auth.key, user=request.user).delete()
        return Response({})
