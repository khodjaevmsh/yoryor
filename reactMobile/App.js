/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react'
import { withIAPContext } from 'react-native-iap'
import Navigation from './src/Navigation'
import GlobalProvider from './src/context/GlobalContext'
import { requestUserPermission, setupNotificationListeners } from './src/hooks/PushNotification'
import SubscriptionProvider from './src/context/SubscriptionContext'

function App() {
    useEffect(() => {
        requestUserPermission()
        setupNotificationListeners()
    }, [])

    return (
        <GlobalProvider>
            <SubscriptionProvider>
                <Navigation />
            </SubscriptionProvider>
        </GlobalProvider>
    )
}

// Wrap the App component with IAP context
export default withIAPContext(App)
