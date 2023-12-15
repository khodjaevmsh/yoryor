from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from users.models import User, ConfirmationCode
from users.utils import generate_verification_code, integers_only


class SendConfirmationCodeSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        phone_number = integers_only(attrs.get('phone_number'))
        user = User.objects.filter(phone_number=phone_number).first()

        if user:
            raise ValidationError({'user': _('This phone number is already registered')})

        if len(phone_number) != 12:
            raise ValidationError({'phone_number': _("The number is not valid")})

        return attrs

    def create(self, validated_data):
        phone_number = integers_only(validated_data.get('phone_number'))
        confirmation_code = generate_verification_code()

        confirmation_code = ConfirmationCode.objects.create(
            phone_number=phone_number,
            confirmation_code='000000',  # confirmation_code variable must be here
        )

        # send_verification_code(phone_number, verification_code)

        return confirmation_code

    class Meta:
        model = ConfirmationCode
        fields = ['phone_number', 'confirmation_code']


class CheckConfirmationCodeSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(max_length=20)
    confirmation_code = serializers.CharField(max_length=6)

    def validate(self, attrs):
        phone_number = integers_only(attrs.get('phone_number'))
        confirmation_code = attrs.get('confirmation_code')

        confirmation_code = ConfirmationCode.objects.filter(
            phone_number=phone_number,
            confirmation_code=confirmation_code
        ).first()

        if not confirmation_code:
            raise ValidationError({'confirmation_code': _("Incorrect validation code")})
        return attrs

    class Meta:
        model = ConfirmationCode
        fields = ['phone_number', 'confirmation_code']


class SignUpSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        phone_number = integers_only(attrs.get('phone_number'))
        password = attrs.get('password')

        if not phone_number:
            raise ValidationError({'phone_number': _("Phone number is required")})

        user = User.objects.filter(phone_number=phone_number).first()

        if not user:
            user = User.objects.create_user(phone_number=phone_number, password=password)
            user.set_password(password)

        return attrs

    class Meta:
        model = User
        fields = ['id', 'phone_number']
