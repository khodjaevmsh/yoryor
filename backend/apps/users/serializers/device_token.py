from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from users.models import Device


class DeviceTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['token']
        extra_kwargs = {
            'user': {'read_only': True}
        }

    def validate_token(self, value):
        # Add any token-specific validation here if needed
        if not value:
            raise ValidationError("Token is required")
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        token = validated_data.get('token')

        # Check if any token already exists for the user
        existing_user_device = Device.objects.filter(user=user).first()

        if existing_user_device:
            # Update the existing token with the new one
            existing_user_device.token = token
            existing_user_device.save()
            return existing_user_device

        # Check if the token is associated with another user
        existing_token_device = Device.objects.filter(token=token).first()
        if existing_token_device:
            # If the token is associated with another user, reassign it to the current user
            existing_token_device.user = user
            existing_token_device.save()
            return existing_token_device

        # If no token exists, create a new device entry
        return Device.objects.create(user=user, token=token)
