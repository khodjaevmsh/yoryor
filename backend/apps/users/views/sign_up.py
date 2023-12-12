from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from users.serializers.sign_up import SignUpSerializer, ConfirmCodeSerializer, SetPasswordSerializer


class SignUpView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'User registered successfully'}, 201)


class ConfirmCodeView(APIView):
    def post(self, request):
        serializer = ConfirmCodeSerializer(data=request.data)

        if serializer.is_valid():
            user = get_object_or_404(User, phone_number=serializer.data.get('phone_number'))
            return Response({'message': 'Confirmation code is valid.'}, 200)
        else:
            return Response(serializer.errors, 400)


class SetPasswordView(APIView):
    def post(self, request):
        serializer = SetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Password set successfully'}, 200)
