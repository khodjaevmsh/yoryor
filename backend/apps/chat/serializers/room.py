from rest_framework import serializers

from chat.models import Room
from users.serializers.profile import SimpleProfileSerializer


class RoomSerializer(serializers.ModelSerializer):
    participants = SimpleProfileSerializer(many=True)

    class Meta:
        model = Room
        fields = ['id', 'name', 'participants']
