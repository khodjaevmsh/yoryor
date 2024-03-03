from datetime import datetime

from django.conf import settings
from django.core.cache import cache
from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.ModelSerializer):
    last_seen = serializers.SerializerMethodField()
    online = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone_number', 'online', 'last_seen')

    def get_last_seen(self, obj):
        last_seen = cache.get('seen_%s' % obj.username)
        obj.last_seen = last_seen
        return last_seen

    def get_online(self, obj):
        if obj.last_seen:
            now = datetime.datetime.now()
            delta = datetime.timedelta(seconds=settings.USER_ONLINE_TIMEOUT)
            if now > obj.last_seen + delta:
                return False
            else:
                return True
        else:
            return False
