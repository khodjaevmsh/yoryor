from firebase_admin import messaging
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class SendNotification(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        # Assuming you receive a device registration token and message data in the request
        device_token = request.data.get('device_token')
        message_title = request.data.get('title')
        message_body = request.data.get('body')
        sound = request.data.get('sound', 'default')

        # Construct the message
        message = messaging.Message(
            token=device_token,
            notification=messaging.Notification(
                title=message_title,
                body=message_body,
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
            # Send a message
            response = messaging.send(message)
            print('Successfully sent message:', response)
            return Response({"success": True, "message": "Message sent successfully"})

        except Exception as e:
            print('Error sending message:', e)
            return Response({"success": False, "error": str(e)})
