import firebase_admin
from firebase_admin import messaging, credentials

# Path to your service account key JSON file
FIREBASE_SERVICE_ACCOUNT_KEY = 'serviceAccountKey.json'

# Initialize Firebase Admin SDK
cred = credentials.Certificate(FIREBASE_SERVICE_ACCOUNT_KEY)
firebase_admin.initialize_app(cred)


def send_notification(device_token, title, body, sound='default'):
    message = messaging.Message(
        token=device_token,
        notification=messaging.Notification(
            title=title,
            body=body,
        ),
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

    try:
        response = messaging.send(message)
        print('Successfully sent message:', response)
        return {"success": True, "message": "Message sent successfully"}

    except Exception as e:
        print('Error sending message:', e)
        return {"success": False, "error": str(e)}
