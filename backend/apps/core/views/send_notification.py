import firebase_admin
from firebase_admin import messaging, credentials

# Path to your service account key JSON file
FIREBASE_SERVICE_ACCOUNT_KEY = 'serviceAccountKey.json'

# Initialize Firebase Admin SDK
cred = credentials.Certificate(FIREBASE_SERVICE_ACCOUNT_KEY)
firebase_admin.initialize_app(cred)


# def send_notification(device_token, title, body, sound='default'):
#     message = messaging.Message(
#         token=device_token,
#         notification=messaging.Notification(
#             title=title,
#             body=body,
#         ),
#         android=messaging.AndroidConfig(
#             notification=messaging.AndroidNotification(
#                 sound=sound,
#             ),
#         ),
#         apns=messaging.APNSConfig(
#             payload=messaging.APNSPayload(
#                 aps=messaging.Aps(
#                     sound=sound,
#                 ),
#             ),
#         ),
#     )
#
#     try:
#         response = messaging.send(message)
#         print('Successfully sent message:', response)
#         return {"success": True, "message": "Message sent successfully"}
#
#     except Exception as e:
#         print('Error sending message:', e)
#         return {"success": False, "error": str(e)}


def send_notification(device_tokens, title, body, data=None, sound='default'):
    # Ensure `device_tokens` is a list, even if it contains a single token
    if not isinstance(device_tokens, list):
        device_tokens = [device_tokens]

    messages = []

    for token in device_tokens:
        message = messaging.Message(
            token=token,
            notification=messaging.Notification(
                title=title,
                body=body,
            ),
            data=data,
            android=messaging.AndroidConfig(
                notification=messaging.AndroidNotification(
                    sound=sound,
                ),
            ),
            apns=messaging.APNSConfig(
                payload=messaging.APNSPayload(
                    aps=messaging.Aps(
                        sound=sound,
                    ),
                ),
            ),
        )
        messages.append(message)

    try:
        if len(messages) == 1:
            response = messaging.send(messages[0])  # Send to single device
        else:
            response = messaging.send_all(messages)  # Send to multiple devices
        print('Successfully sent message(s):', response)
        return {"success": True, "message": "Message(s) sent successfully"}

    except Exception as e:
        print('Error sending message(s):', e)
        return {"success": False, "error": str(e)}
