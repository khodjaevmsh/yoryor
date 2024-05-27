from django.db.models import Count
from rest_framework import serializers

from chat.models import Room
from chat.serializers.room import RoomSerializer
from users.models import Like
from users.serializers.profile import ProfileSerializer


class LikeSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['sender'] = ProfileSerializer(instance.sender).data
        data['receiver'] = ProfileSerializer(instance.receiver).data
        data['likes_count'] = Like.objects.filter(receiver=instance.receiver).count()
        data['room'] = RoomSerializer(
            Room.objects.filter(participants__in=[instance.sender, instance.receiver]).annotate(
                participant_count=Count('participants')
            ).filter(participant_count=2).first()
        ).data
        return data

    class Meta:
        model = Like
        fields = ('id', 'sender', 'receiver', 'match')

    def create(self, validated_data):
        # Create the like
        like = Like.objects.create(**validated_data)

        # Check for match
        match_check = Like.objects.filter(sender=like.receiver, receiver=like.sender).exists()

        room = Room.objects.filter(participants__in=[like.sender, like.receiver]).annotate(
            participant_count=Count('participants')
        ).filter(participant_count=2).first()

        if match_check:
            # It's a match!
            like.match = True
            like.save()

            if not room:
                # Create a new conversation
                room = Room.objects.create()
                room.participants.add(like.sender, like.receiver)
            elif room.participants.count() == 1:
                # If there is only one participant, add the second one
                room.participants.add(like.receiver)

        return like
