/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import App from './App'
import { name as appName } from './app.json'

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    e
    console.log('Killed state notification.', remoteMessage)
})
AppRegistry.registerComponent(appName, () => App)
