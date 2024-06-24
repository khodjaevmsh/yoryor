// notificationHandler.js

import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'

class LocalNotification {
    constructor() {
    // Настройка для локальных уведомлений
        PushNotification.configure({
            onNotification(notification) {
                // Обработка уведомления при клике
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

    showLoacalNotification(notification) {
        PushNotification.localNotification({
            title: notification.notification.title,
            message: notification.notification.body,
            playSound: true,
            soundName: 'default',
            foreground: true,
        })
    }
}

export default new LocalNotification()
