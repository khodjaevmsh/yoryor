from rest_framework import serializers

from chat.models import Message, Room
from chat.serializers.message import MessageSerializer
from users.serializers.profile import ProfileSerializer, SimpleProfileSerializer


class RoomSerializer(serializers.ModelSerializer):
    participants = SimpleProfileSerializer(many=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['message'] = MessageSerializer(Message.objects.filter(room=instance).last()).data
        return data

    class Meta:
        model = Room
        fields = ('id', 'name', 'participants',)
