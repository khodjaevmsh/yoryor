from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User, Profile
from users.serializers.profile import ProfileSerializer
from users.serializers.sign_in import SignInSerializer
from users.serializers.users import UserSerializer


class SignInView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = SignInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.filter(phone_number=serializer.data.get('phone_number')).first()
        profile = Profile.objects.filter(user=user).first()

        token = Token.objects.create(user=user)

        user_data = UserSerializer(user).data
        profile_data = ProfileSerializer(profile).data

        return Response({'token': token.key, 'user': user_data, 'profile': profile_data}, 201)
