from rest_framework import serializers

from main.models import Dislike
from main.serializers.profile import SimpleProfileSerializer


class DislikeSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['sender'] = SimpleProfileSerializer(instance.sender).data
        data['receiver'] = SimpleProfileSerializer(instance.receiver).data
        return data

    class Meta:
        model = Dislike
        fields = ['id', 'sender', 'receiver']
