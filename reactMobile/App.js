/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react'
import Navigation from './src/Navigation'
import GlobalProvider from './src/context/GlobalContext'
import { requestUserPermission, setupNotificationListeners } from './src/hooks/PushNotification'

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
