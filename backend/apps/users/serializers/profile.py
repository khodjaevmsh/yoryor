from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from users.models import Profile, User


class SetNameSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        name = attrs.get('name')

        if len(name) <= 4:
            raise ValidationError({'name': _("The name must contain at least 5 letters")})

        if not name:
            raise ValidationError({'name': _("Name is required")})

        return attrs

    def create(self, validated_data):
        user = validated_data.get('user')
        name = validated_data.get('name')

        user = User.objects.filter(id=user.id).first()

        profile = Profile.objects.get_or_create(user=user, name=name)

        return profile

    class Meta:
        model = Profile
        fields = ['user', 'name']
