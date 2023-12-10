from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from users.models import User
from users.utils import generate_verification_code


class SendVerificationCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['phone_number']

    def validate_phone_number(self, phone_number):
        if not phone_number:
            raise ValidationError({'phone_number': _("Phone number is required")})
        return phone_number

    def validate(self, attrs):
        phone_number = attrs.get('phone_number')

        if len(phone_number) != 13:
            raise ValidationError({'phone_number': _("Phone number is not valid")})

        user = User.objects.filter(phone_number=phone_number).first()

        if user:
            raise ValidationError({'user': _('This phone number is already registered')})

        return attrs

    def create(self, validated_data):
        phone_number = validated_data.get('phone_number')
        confirmation_code = generate_verification_code()

        user = User.objects.create_user(
            phone_number=phone_number,
            email=phone_number,
            username=phone_number,
            confirmation_code=confirmation_code,
            password=None
        )

        # send_verification_code(phone_number, verification_code)

        return user


class ConfirmCodeSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(max_length=22)
    confirmation_code = serializers.CharField(max_length=6)

    def validate(self, attrs):
        user = User.objects.filter(
            phone_number=attrs.get('phone_number'),
            confirmation_code=attrs.get('confirmation_code')
        ).first()

        if not user:
            raise ValidationError({'confirmation_code': _("Invalid confirmation code")})
        return attrs

    class Meta:
        model = User
        fields = ['phone_number', 'confirmation_code']
