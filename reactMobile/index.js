/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import App from './App'
import { name as appName } from './app.json'

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])

// Фоновый обработчик
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage)
})

AppRegistry.registerComponent(appName, () => App)
