/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react'
import 'react-native-reanimated'
import Navigation from './src/Navigation'
import GlobalProvider from './src/context/GlobalContext'
import { requestUserPermission, setupNotificationListeners } from './src/hooks/usePushNotification'

export default function App() {
    useEffect(() => {
        requestUserPermission()
        setupNotificationListeners()
    }, [])
    return (
        <GlobalProvider>
            <Navigation />
        </GlobalProvider>
    )
}
