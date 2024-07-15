from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from core.utils.integers_only import integers_only
from users.models import User


class ForgotPasswordSerializer(serializers.Serializer):  # noqa
    country_code = serializers.CharField(required=True)
    phone_number = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, attrs):
        new_password = attrs.get('new_password')
        confirm_password = attrs.get('confirm_password')

        if new_password != confirm_password:
            raise serializers.ValidationError(_("New passwords do not match"))

        return attrs

    def create(self, validated_data):
        country_code = integers_only(validated_data.get('country_code'))
        phone_number = integers_only(validated_data.get('phone_number'))
        confirm_password = validated_data.get('confirm_password')

        user = User.objects.filter(country_code=country_code, phone_number=phone_number).first()

        user.set_password(confirm_password)
        user.save()
        return user
