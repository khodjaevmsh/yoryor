from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone_number')


# class UserDeleteSerializer(serializers.ModelSerializer):
#     phone_number = serializers.CharField()
#
#     def validate(self, attrs):
#         phone_number = attrs.get('phone_number')
#
#         user = User.objects.filter(phone_number=phone_number).first()


