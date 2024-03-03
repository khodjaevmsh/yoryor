from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from users.models import Profile, ProfileImage, Like
from users.serializers.region import RegionSerializer


class ProfileSerializer(serializers.ModelSerializer):
    birthdate = serializers.DateField(format='%Y-%m-%d')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['region'] = RegionSerializer(instance.region).data
        data['goal'] = {'label': instance.get_goal_display(), 'value': instance.goal}
        data['gender'] = {'label': instance.get_gender_display(), 'value': instance.gender}
        data['education_level'] = {'label': instance.get_education_level_display(), 'value': instance.education_level}
        data['marital_status'] = {'label': instance.get_marital_status_display(), 'value': instance.marital_status}
        data['income_level'] = {'label': instance.get_income_level_display(), 'value': instance.income_level}
        data['zodiac'] = {'label': instance.get_zodiac_display(), 'value': instance.zodiac}
        data['images'] = ProfileImageSerializer(
            ProfileImage.objects.filter(profile=instance).order_by('button_number'), many=True
        ).data

        return data

    class Meta:
        model = Profile
        fields = '__all__'
        extra_kwargs = {'user': {'required': False}}


class SimpleProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileImage
        fields = ['id', 'profile', 'image']


class ChangeProfileImageSerializer(serializers.ModelSerializer):
    button_numbers = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True,
    )

    def create(self, validated_data):
        profile = validated_data.pop('profile')
        uploaded_images = validated_data.pop('uploaded_images')
        button_numbers = validated_data.pop('button_numbers')

        for uploaded_image, button_number in zip(uploaded_images, button_numbers):
            existing_image = ProfileImage.objects.filter(profile=profile, button_number=button_number).first()

            if existing_image:
                existing_image.image = uploaded_image
                existing_image.save()
            else:
                new_image = ProfileImage.objects.create(
                    profile=profile,
                    button_number=button_number,
                    image=uploaded_image
                )

        return new_image if not existing_image else existing_image

    class Meta:
        model = ProfileImage
        fields = ['profile', 'uploaded_images', 'button_numbers']


class LikeSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['receiver'] = ProfileSerializer(instance.receiver).data
        data['sender'] = ProfileSerializer(instance.sender).data
        return data

    class Meta:
        model = Like
        fields = '__all__'

    def validate(self, attrs):
        # Check if sender and receiver are the same
        if attrs.get('sender') == attrs.get('receiver'):
            raise serializers.ValidationError(_("Sender and receiver cannot be the same."))

        return attrs
