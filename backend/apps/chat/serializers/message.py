from rest_framework import serializers

from chat.models import Message, Room
from users.models import ProfileImage, Profile
from users.serializers.profile import ProfileSerializer


class RoomSerializer(serializers.ModelSerializer):
    participants = ProfileSerializer(many=True)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['message'] = MessageSerializer(Message.objects.filter(room=instance).last()).data
        data['unread_messages_count'] = Message.objects.filter(room=instance, seen=False).count()
        return data

    class Meta:
        model = Room
        fields = ('id', 'name', 'participants')


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'room', 'user', 'content', 'timestamp', 'seen')
