import random
import string

from twilio.rest import Client  # Import the Twilio Client if using Twilio


def generate_verification_code(length=6):
    characters = string.digits
    verification_code = ''.join(random.choice(characters) for _ in range(length))
    return verification_code


def send_verification_code(phone_number, verification_code):
    print(verification_code)
    account_sid = 'ACdf4c9811c0a76963f07a5bf7d06807ba'  # Replace with your Twilio account SID
    auth_token = '4d70efbadcec535ff9613528f82cba96'  # Replace with your Twilio auth token
    twilio_phone_number = '+19288336012'  # Replace with your Twilio phone number

    client = Client(account_sid, auth_token)
    message = client.messages.create(
        body=f'Your verification code is: {verification_code}',
        from_=twilio_phone_number,
        to=phone_number
    )


def integers_only(text) -> str:
    """
    Removes all symbols except integers
    ex: +998(91) 333 33 33 -> 998913333333
    """
    return ''.join(x for x in text if x.isdigit())
