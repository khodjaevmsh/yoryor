from django.db.models import Prefetch
from rest_framework import serializers

from main.models import ProfileImage, Profile
from main.serializers.profile_image import ProfileImageSerializer
from main.serializers.region import RegionSerializer


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
        instance = Profile.objects.prefetch_related(
            Prefetch('profileimage_set', queryset=instance.profileimage_set.order_by('button_number'))
        ).get(pk=instance.pk)

        data = super().to_representation(instance)

        data['region'] = RegionSerializer(instance.region).data
        data['images'] = ProfileImageSerializer(instance.profileimage_set.all(), many=True).data
        return data

    class Meta:
        model = Profile
        fields = [
            'id', "user", "name", "birthdate", "gender", "region", "goal", "bio", "height", "weight", "education_level",
            "education_school", "job_title", "job_company", "marital_status", "income_level", "zodiac", "online"
        ]
