from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from main.models import Profile
from main.serializers.profile import ProfileSerializer
from users.models import User
from users.serializers.sign_up import SignUpSerializer
from users.serializers.users import UserSerializer


class SignUpView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user = User.objects.filter(phone_number=serializer.data.get('phone_number')).first()

        profile = Profile.objects.filter(user=user).first()
        token = Token.objects.create(user=user)
        user_data = UserSerializer(user).data
        profile_data = ProfileSerializer(profile).data

        return Response({'token': token.key, 'user': user_data, 'profile': profile_data}, 201)
