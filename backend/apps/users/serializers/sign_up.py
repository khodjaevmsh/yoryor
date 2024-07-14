from django.core.exceptions import ValidationError
from rest_framework import serializers

from users.models import User, Profile, ProfileImage
from users.serializers.profile import ProfileSerializer
from users.serializers.profile_image import ProfileImageSerializer
from users.utils import integers_only


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
        country_code = integers_only(validated_data.get('country_code'))
        phone_number = integers_only(validated_data.get('phone_number'))
        password = validated_data.get('password')

        profile_data = validated_data.pop('profile')
        uploaded_images = validated_data.pop("uploaded_images")
        button_numbers = validated_data.pop("button_numbers")

        user = User.objects.create_user(
            country_code=country_code,
            phone_number=phone_number,
            password=password,
            username=phone_number
        )
        user.set_password(password)

        profile = Profile.objects.create(user=user, **profile_data)

        for image, button_number in zip(uploaded_images, button_numbers):
            ProfileImage.objects.create(profile=profile, image=image, button_number=button_number)

        return user

    class Meta:
        model = User
        fields = [
            'id', 'country_code', 'phone_number', 'password',
            'profile', 'images', 'uploaded_images', 'button_numbers'
        ]
        extra_kwargs = {'password': {'write_only': True}}
