from rest_framework import serializers

from users.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    birthdate = serializers.DateField(format='%Y-%m-%d')

    class Meta:
        model = Profile
        fields = ['user', 'name', 'birthdate', 'gender', 'region', 'goal']
        extra_kwargs = {
            'user': {'required': False}
        }
