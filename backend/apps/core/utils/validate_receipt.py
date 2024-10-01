import requests
from django.conf import settings

APPLE_RECEIPT_VERIFY_URL = "https://buy.itunes.apple.com/verifyReceipt"
APPLE_RECEIPT_VERIFY_SANDBOX_URL = "https://sandbox.itunes.apple.com/verifyReceipt"
GOOGLE_PLAY_VERIFY_URL = "https://www.googleapis.com/androidpublisher/v3/applications"


def validate_receipt(receipt_data, platform='ios'):
    if platform == 'ios':
        url = APPLE_RECEIPT_VERIFY_SANDBOX_URL  # Для продакшн
    else:
        # Логика для других платформ (например, Android)
        return None

    payload = {
        'receipt-data': receipt_data,
        'password': settings.APPSTORE_SECRET,  # Ваш секретный ключ
    }

    response = requests.post(url, json=payload)
    return response.json()
