from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User, Profile, Device
from users.serializers.profile import ProfileSerializer
from users.serializers.sign_up import SignUpSerializer, SendConfirmationCodeSerializer, \
    CheckConfirmationCodeSerializer
from users.serializers.users import UserSerializer


class SendConfirmationCodeView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = SendConfirmationCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Confirmation code sent successfully'}, 201)


class CheckConfirmationCodeView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = CheckConfirmationCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Confirmation code is valid'}, 200)


class SignUpView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        device = request.data.get('device')

        serializer = SignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if device and not Device.objects.filter(token=device).exists():
            Device.objects.create(user=request.user, token=device)

        user = User.objects.filter(phone_number=serializer.data.get('phone_number')).first()
        profile = Profile.objects.filter(user=user).first()
        token = Token.objects.create(user=user)
        user_data = UserSerializer(user).data
        profile_data = ProfileSerializer(profile).data

        return Response({'token': token.key, 'user': user_data, 'profile': profile_data}, 201)
