from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from users.models import User, ConfirmationCode, Profile, ProfileImage
from users.serializers.profile import ProfileSerializer, ProfileImageSerializer
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
    profile = ProfileSerializer()
    images = ProfileImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True
    )
    button_numbers = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)

    def validate(self, attrs):
        phone_number = integers_only(attrs.get('phone_number'))

        user = User.objects.filter(phone_number=phone_number).first()

        if user:
            raise ValidationError({'user': 'User already exist'})

        if not phone_number:
            raise ValidationError({'phone_number': 'Phone number is required'})

        return attrs

    def create(self, validated_data):
        phone_number = integers_only(validated_data.get('phone_number'))
        password = validated_data.get('password')

        profile_data = validated_data.pop('profile')
        uploaded_images = validated_data.pop("uploaded_images")
        button_numbers = validated_data.pop("button_numbers")

        user = User.objects.create_user(phone_number=phone_number, password=password, username=phone_number)
        user.set_password(password)

        profile = Profile.objects.create(user=user, **profile_data)

        for image, button_number in zip(uploaded_images, button_numbers):
            ProfileImage.objects.create(profile=profile, image=image, button_number=button_number)

        return user

    class Meta:
        model = User
        fields = ['id', 'phone_number', 'password', 'profile', 'images', 'uploaded_images', 'button_numbers']
        extra_kwargs = {'password': {'write_only': True}}
