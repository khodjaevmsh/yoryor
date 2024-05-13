import random
import string

import requests
from django.conf import settings


def generate_verification_code(length=6):
    characters = string.digits
    verification_code = ''.join(random.choice(characters) for _ in range(length))
    return verification_code


# def send_verification_code(phone_number, verification_code):
#     print(verification_code)
#     account_sid = 'ACdf4c9811c0a76963f07a5bf7d06807ba'  # Replace with your Twilio account SID
#     auth_token = '4d70efbadcec535ff9613528f82cba96'  # Replace with your Twilio auth token
#     twilio_phone_number = '+19288336012'  # Replace with your Twilio phone number
#
#     client = Client(account_sid, auth_token)
#     message = client.messages.create(
#         body=f'Your verification code is: {verification_code}',
#         from_=twilio_phone_number,
#         to=phone_number
#     )

def get_token(email, password):
    url = "https://notify.eskiz.uz/api/auth/login"
    payload = {'email': email, 'password': password}
    headers = {}
    files = []
    try:
        response = requests.request("POST", url, headers=headers, data=payload, files=files)
        response_json = response.json()
        token = response_json.get('data', {}).get('token')
        if token:
            return token
        else:
            print("Token not found in response.")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Failed to get token: {e}")
        return None


def send_verification_code(phone_number, verification_code):
    token = get_token(settings.ESKIZ_EMAIL, settings.ESKIZ_PASSWORD)
    url = "https://notify.eskiz.uz/api/message/sms/send"
    payload = {
        'mobile_phone': phone_number,
        'message': 'This is test from Eskiz',  # f'Your verification code is: {verification_code}'
        'from': '4546',
    }
    headers = {
        'Authorization': f'Bearer {token}'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)


def integers_only(text) -> str:
    """
    Removes all symbols except integers
    ex: +998(91) 333 33 33 -> 998913333333
    """
    return ''.join(x for x in text if x.isdigit())
