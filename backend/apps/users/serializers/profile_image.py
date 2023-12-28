from rest_framework import serializers

from users.models import ProfileImage


class ProfileImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = ProfileImage
        fields = ['id', 'profile', 'image']
