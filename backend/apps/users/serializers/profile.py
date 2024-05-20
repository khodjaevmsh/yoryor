from rest_framework import serializers

from users.models import Profile, ProfileImage
from users.serializers.profile_image import ProfileImageSerializer
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
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['images'] = ProfileImageSerializer(
            ProfileImage.objects.filter(profile=instance).order_by('button_number'), many=True
        ).data

        return data

    class Meta:
        model = Profile
        fields = '__all__'
