from django.db import models


class Room(models.Model):
    name = models.CharField(max_length=255)
    participants = models.ManyToManyField('users.Profile', related_name='rooms')
    updated_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Room between {self.participants.first()} and {self.participants.last()}"


class Message(models.Model):
    room = models.ForeignKey('chat.Room', on_delete=models.CASCADE, related_name='messages')
    user = models.ForeignKey('users.Profile', on_delete=models.CASCADE, related_name='sender')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    seen = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user} send message'
