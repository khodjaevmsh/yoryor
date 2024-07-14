import random
import string

import requests
from django.conf import settings


def generate_confirmation_code(length=5):
    characters = string.digits
    verification_code = ''.join(random.choice(characters) for _ in range(length))
    return verification_code


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


def send_verification_code(country_code, phone_number, verification_code):
    try:
        token = get_token(settings.ESKIZ_EMAIL, settings.ESKIZ_PASSWORD)
        url = "https://notify.eskiz.uz/api/message/sms/send"
        payload = {
            'mobile_phone': f'{country_code}{phone_number}',
            'message': 'This is test from Eskiz',  # f'Your verification code is: {verification_code}'
            'from': '4546',
        }
        headers = {
            'Authorization': f'Bearer {token}'
        }
        response = requests.request("POST", url, headers=headers, data=payload)
        print(response.text)
    except ConnectionError as e:
        print(f"Connection error occurred: {e}")
        # Handle the connection error (e.g., retry logic, logging, etc.)
    except Exception as e:
        print(f"An error occurred: {e}")
        # Handle other exceptions


def integers_only(text) -> str:
    """
    Removes all symbols except integers
    ex: +998(91) 333 33 33 -> 998913333333
    """
    return ''.join(x for x in text if x.isdigit())
