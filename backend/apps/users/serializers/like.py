from django.db.models import Count
from rest_framework import serializers

from chat.models import Room
from users.models import Like
from users.serializers.profile import SimpleProfileSerializer


class LikeSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['sender'] = SimpleProfileSerializer(instance.sender).data
        data['receiver'] = SimpleProfileSerializer(instance.receiver).data
        return data

    class Meta:
        model = Like
        fields = ['id', 'sender', 'receiver', 'match']

    def create(self, validated_data):
        # Create the like
        like = Like.objects.create(**validated_data)

        # Check for match
        match_check = Like.objects.filter(sender=like.receiver, receiver=like.sender).exists()

        if match_check:
            # It's a match!
            like.match = True
            like.save()

            room, created = Room.objects.annotate(participant_count=Count('participants')).get_or_create(
                participants__in=[like.sender, like.receiver], participant_count=2,
            )

            if not created and room.participant_count == 1:
                room.participants.add(like.receiver)

        return like
