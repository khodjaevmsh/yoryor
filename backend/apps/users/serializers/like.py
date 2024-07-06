import uuid

from django.db import transaction
from rest_framework import serializers

from chat.models import Room
from core.views.send_notification import send_notification
from users.models import Like, Device
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
        instance = super().create(validated_data)

        match = Like.objects.filter(sender=instance.receiver, receiver=instance.sender).exists()
        sender_device = Device.objects.filter(user=instance.sender.user).first()
        receiver_device = Device.objects.filter(user=instance.receiver.user).first()

        if match:
            instance.match = True
            instance.save()
            send_notification(
                device_tokens=[sender_device.token, receiver_device.token],
                title='Bu match! \U0001F4AC',
                body='Sizga yangi xabar keldi'
            )

            # Используем транзакцию, чтобы гарантировать целостность данных
            with transaction.atomic():
                room, created = Room.objects.get_or_create(name=uuid.uuid4())

                if created:
                    room.participants.add(instance.sender, instance.receiver)
                else:
                    room.participants.add(instance.receiver)

        send_notification(
            device_tokens=receiver_device.token,
            title=instance.sender.name,
            body='Sizga like qoydi \U00002764\uFE0F'
        )

        return instance
