import React from 'react'
import messaging from '@react-native-firebase/messaging'
import { PermissionsAndroid, Platform } from 'react-native'
import LocalNotification from '../utils/localNotification'
import { baseAxios } from './requests'
import { DEVICE_TOKEN } from '../urls'

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
    const fcmToken = await messaging().getToken()
    if (fcmToken) {
        saveToken(fcmToken) // Сохраните токен на сервере или используйте его по вашему усмотрению
        console.log('FCM token is:', fcmToken)
    } else {
        console.log('Failed to get FCM token')
    }
}

// Настройка слушателей уведомлений
export function setupNotificationListeners() {
    // Обработка уведомлений на переднем плане
    messaging().onMessage(async (remoteMessage) => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
        LocalNotification.showLoacalNotification(remoteMessage)
    })

    // Обработка уведомлений на заднем плане
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage)
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

async function saveToken(token) {
    try {
        await baseAxios.post(DEVICE_TOKEN, { token })
    } catch (error) {
        console.log(error.response)
    }
}
