from rest_framework import serializers

from core.utils.validate_receipt import validate_receipt
from payment.models import Subscription


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = [
            'user', 'product_id', 'transaction_id', 'receipt_data', 'platform', 'start_date', 'end_date', 'is_active'
        ]

    def validate(self, attrs):
        user = attrs.get('user')
        product_id = attrs.get('product_id')
        receipt_data = attrs.get('receipt_data')
        platform = attrs.get('platform')  # Предполагаем, что по умолчанию 'ios'

        active_subscriptions = Subscription.objects.filter(user=user, is_active=True)

        if active_subscriptions.exists():
            for subscription in active_subscriptions:
                if subscription.product_id != product_id:
                    subscription.deactivate()

        validation_response = validate_receipt(receipt_data, platform)

        if validation_response.get('status') != 0:
            raise serializers.ValidationError("Invalid receipt provided.")

        return attrs

    def create(self, validated_data):
        subscription = Subscription.objects.create(**validated_data)

        duration_in_days = 30  # Устанавливаем срок подписки (например, 30 дней)
        subscription.activate(duration_in_days)

        return subscription
