import phonenumbers
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from users.models import User
from users.utils import generate_verification_code


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['phone_number']

    def validate_phone_number(self, phone_number):

        if not phone_number:
            raise ValidationError({'phone_number': _("Phone number is required")})

        try:
            parsed_phone_number = phonenumbers.parse(phone_number)
            if not phonenumbers.is_valid_number(parsed_phone_number):
                raise serializers.ValidationError(_('Invalid phone number'))
        except phonenumbers.NumberParseException:
            raise serializers.ValidationError(_('Invalid phone number format'))

        return phone_number

    def create(self, validated_data):
        phone_number = validated_data.get('phone_number')
        confirmation_code = generate_verification_code()

        user = User.objects.create_user(
            phone_number=phone_number,
            confirmation_code='000000',  # confirmation_code variable must be here
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


class SetPasswordSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(max_length=22)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords do not match'})

        return attrs

    def create(self, validated_data):
        phone_number = validated_data.get('phone_number')
        password = validated_data.get('password')

        # Set the password for the user
        user = User.objects.get(phone_number=phone_number)
        user.set_password(password)
        user.save()
        return user

    class Meta:
        model = User
        fields = ['phone_number', 'password', 'password2']
