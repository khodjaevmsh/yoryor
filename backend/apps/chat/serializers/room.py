from rest_framework import serializers

from chat.models import Room
from chat.serializers.message import MessageSerializer


class RoomSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['last_message'] = MessageSerializer(instance.messages.order_by('-created_at').first()).data
        data['un_seen'] = instance.messages.filter(seen=False).count()

        return data

    class Meta:
        model = Room
        fields = ['id', 'name', 'participants']
