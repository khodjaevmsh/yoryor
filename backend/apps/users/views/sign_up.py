from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from users.serializers.sign_up import SignUpSerializer, SendConfirmationCodeSerializer, \
    CheckConfirmationCodeSerializer


class SendConfirmationCodeView(APIView):
    def post(self, request):
        serializer = SendConfirmationCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Confirmation code sent successfully'}, 201)


class CheckConfirmationCodeView(APIView):
    def post(self, request):
        serializer = CheckConfirmationCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Confirmation code is valid'}, 200)


class SignUpView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user = User.objects.filter(phone_number=serializer.data.get('phone_number')).first()

        token = Token.objects.create(user=user)

        return Response({'token': token.key, 'user': serializer.data}, 201)
