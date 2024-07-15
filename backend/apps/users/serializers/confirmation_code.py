from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from core.utils.confirmation_code import generate_confirmation_code, send_verification_code
from core.utils.integers_only import integers_only
from users.models import User, ConfirmationCode


class SendConfirmationCodeSerializer(serializers.ModelSerializer):
    country_code = serializers.CharField(max_length=4)
    forgot_password_screen = serializers.BooleanField(default=False)

    def validate(self, attrs):
        country_code = integers_only(attrs.get('country_code'))
        phone_number = integers_only(attrs.get('phone_number'))
        forgot_password_screen = attrs.get('forgot_password_screen')

        user = User.objects.filter(country_code=country_code, phone_number=phone_number).first()

        if not forgot_password_screen:
            if user:
                raise ValidationError({'user': _('This phone number is already registered')})

        if len(phone_number) != 9:
            raise ValidationError({'phone_number': _("The number is not valid")})

        return attrs

    def create(self, validated_data):
        country_code = integers_only(validated_data.get('country_code'))
        phone_number = integers_only(validated_data.get('phone_number'))
        generated_confirmation_code = generate_confirmation_code()

        confirmation_code_entry = ConfirmationCode.objects.create(
            country_code=country_code,
            phone_number=phone_number,
            confirmation_code='00000'  # verification_code variable must be here
        )

        send_verification_code(country_code, phone_number, generated_confirmation_code)

        return confirmation_code_entry

    class Meta:
        model = ConfirmationCode
        fields = ['country_code', 'phone_number', 'confirmation_code', 'forgot_password_screen']


class CheckConfirmationCodeSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(max_length=20)
    confirmation_code = serializers.CharField(max_length=6)

    def validate(self, attrs):
        phone_number = integers_only(attrs.get('phone_number'))
        confirmation_code = attrs.get('confirmation_code')

        latest_confirmation_code = ConfirmationCode.objects.filter(phone_number=phone_number).order_by('-id').first()

        if latest_confirmation_code.confirmation_code != confirmation_code:
            raise ValidationError({'confirmation_code': _("Incorrect confirmation code")})

        return attrs

    class Meta:
        model = ConfirmationCode
        fields = ['phone_number', 'confirmation_code']
