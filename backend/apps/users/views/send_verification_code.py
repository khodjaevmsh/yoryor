from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from users.serializers.send_verification_code import SendVerificationCodeSerializer, ConfirmCodeSerializer


class SendVerificationCodeView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = SendVerificationCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'User registered successfully'}, 201)


# class ConfirmCodeView(APIView):
#     def post(self, request):
#         serializer = ConfirmCodeSerializer(data=request.data)
#         if serializer.is_valid():
#             phone_number = integers_only(request.data.get('phone_number'))
#             verification_code = request.data.get('verification_code')
#
#             user = User.objects.get(phone_number=phone_number)
#
#             if user.verification_code == verification_code:
#                 user.verification_code = None  # Reset the OTP field after successful validation
#                 user.save()
#
#                 # Authenticate the user and create or get an authentication token
#                 token, _ = Token.objects.get_or_create(user=user)
#
#                 return Response({'token': token.key}, 201)
#         return Response(serializer.errors, 400)

class ConfirmCodeView(APIView):
    def post(self, request):
        serializer = ConfirmCodeSerializer(data=request.data)

        if serializer.is_valid():
            user = get_object_or_404(User, phone_number=serializer.data.get('phone_number'))
            return Response({'detail': 'Confirmation code is valid.'}, 200)
        else:
            return Response(serializer.errors, 400)
