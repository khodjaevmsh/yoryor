import messaging from '@react-native-firebase/messaging'
import { PermissionsAndroid, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LocalNotification from '../utils/localNotification'
import { baseAxios } from './requests'
import { DEVICE_TOKEN } from '../urls'

export async function requestUserPermission() {
    if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission()
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED
            || authStatus === messaging.AuthorizationStatus.PROVISIONAL

        if (enabled) {
            // Do something...
        }
    } else if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
    }
}

// Get device token
export async function getToken() {
    try {
        const fcmToken = await messaging().getToken()
        if (fcmToken) {
            await saveDeviceToken(fcmToken)
            return fcmToken
        }
        return null
    } catch (error) {
        console.error('Error getting FCM token:', error)
        return null
    }
}

// Save device token to backend
async function saveDeviceToken(deviceToken) {
    try {
        const token = AsyncStorage.getItem('token')
        if (token) {
            const response = await baseAxios.post(DEVICE_TOKEN, { token: deviceToken })
            console.log('Token saved successfully:', response.data)
        }
    } catch (error) {
        console.error('Error saving token:', error.response.data)
    }
}

// Settings of notification listener
export function setupNotificationListeners() {
    // Обработка уведомлений на переднем плане
    messaging().onMessage(async (remoteMessage) => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
        LocalNotification.showLocalNotification(remoteMessage)
    })

    // Обработка уведомлений на заднем плане
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage)
        LocalNotification.showLocalNotification(remoteMessage)
    })

    // Обработка уведомлений при открытии приложения из состояния background
    messaging().onNotificationOpenedApp((remoteMessage) => {
        console.log('Notification caused app to open from background state:', remoteMessage.notification)
    })

    // Обработка уведомлений при открытии приложения из состояния quit
    messaging().getInitialNotification().then((remoteMessage) => {
        if (remoteMessage) {
            console.log('Notification caused app to open from quit state:', remoteMessage.notification)
        }
    })
}
