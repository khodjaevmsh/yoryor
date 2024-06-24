from rest_framework import serializers

from users.models import Device


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['token']

    def create(self, validated_data):
        user = self.context['request'].user
        device = Device.objects.create(user=user, **validated_data)
        return device
