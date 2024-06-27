import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

class LocalNotification {
    constructor() {
        // Configure push notifications and create a channel
        PushNotification.createChannel(
            {
                channelId: 'default-channel-id',
                channelName: 'Default Channel',
                channelDescription: 'A default channel for local notifications',
                playSound: true,
                soundName: 'default',
                importance: 4,
                vibrate: true,
            },
            () => {
                // Channel created successfully
                console.log('Notification channel created successfully')
            },
        )

        // Настройка для локальных уведомлений
        PushNotification.configure({
            onNotification: function (notification) {
                notification.finish(PushNotificationIOS.FetchResult.NoData)
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        })
    }

    // eslint-disable-next-line class-methods-use-this
    showLocalNotification(notification) {
        PushNotification.localNotification({
            channelId: 'default-channel-id',
            notificationId: String(notification.messageId),
            title: notification.notification.title,
            message: notification.notification.body,
            playSound: true,
            soundName: 'default',
            foreground: true,
        })
    }
}

export default new LocalNotification()
