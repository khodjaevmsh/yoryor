import React from 'react'
import messaging from '@react-native-firebase/messaging'
import { PermissionsAndroid, Platform } from 'react-native'
import LocalNotification from '../utils/localNotification'

export async function requestUserPermission() {
    if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission()
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED
    || authStatus === messaging.AuthorizationStatus.PROVISIONAL

        if (enabled) {
            console.log('FCM auth status:', authStatus)
        }
    } else if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
    }
}

// Получение токена устройства
export async function getToken() {
    try {
        const fcmToken = await messaging().getToken()
        if (fcmToken) {
            return fcmToken
        } return null
    } catch (error) {
        return null
    }
}

// Настройка слушателей уведомлений
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
