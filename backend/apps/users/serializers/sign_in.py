from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from users.models import User


class SignInSerializer(serializers.ModelSerializer):
    country_code = serializers.CharField(required=True, trim_whitespace=True)
    phone_number = serializers.CharField(required=True, trim_whitespace=True)
    password = serializers.CharField(required=True, trim_whitespace=False)

    def validate(self, attrs):
        sign_in = authenticate(
            request=self.context.get('request'),
            country_code=attrs.get('country_code'),
            username=attrs.get('phone_number'),
            password=attrs.get('password')
        )

        user = User.objects.filter(
            country_code=attrs.get('country_code'),
            phone_number=attrs.get('phone_number')
        ).first()
        token = Token.objects.filter(user=user).first()

        # Check if the user has an existing token and revoke it
        if hasattr(user, 'auth_token') and user.auth_token and token:
            user.auth_token.delete()

        if not user:
            raise ValidationError({'user': _('This user is not registered')})

        if not sign_in:
            raise ValidationError({'user': _('Incorrect username or password specified')}, code='authorization')

        # attrs['user']
        return attrs

    class Meta:
        model = User
        fields = ['id', 'country_code', 'phone_number', 'password']
