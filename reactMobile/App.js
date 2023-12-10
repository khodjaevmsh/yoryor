/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import Navigation from './src/Navigation'
import GlobalProvider from './src/context/GlobalContext'

export default function App() {
    return (
        <GlobalProvider>
            <Navigation />
        </GlobalProvider>
    )
}
