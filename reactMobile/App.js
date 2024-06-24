/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react'
import Navigation from './src/Navigation'
import GlobalProvider from './src/context/GlobalContext'
import { getToken, requestUserPermission, setupNotificationListeners } from './src/hooks/usePushNotification'

export default function App() {
    useEffect(() => {
        requestUserPermission()
        getToken()
        setupNotificationListeners()
    }, [])
    return (
        <GlobalProvider>
            <Navigation />
        </GlobalProvider>
    )
}
