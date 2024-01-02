import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator, View } from 'react-native'
import { COLOR } from '../utils/colors'

export const GlobalContext = createContext({})

export default function GlobalProvider({ children }) {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        async function initializeApp() {
            // Your asynchronous tasks here...

            // Simulate a delay (remove this in your actual implementation)
            // eslint-disable-next-line no-promise-executor-return
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // Set isLoading to false when your tasks are completed
            setIsLoaded(false)
        }
        initializeApp()

        AsyncStorage.getItem('token').then(async (value) => {
            setToken(value)
            return AsyncStorage.getItem('user')
        }).then((value) => {
            setUser(JSON.parse(value))
            setIsLoaded(true)
        })
    }, [])

    async function auth(newToken, newUser) {
        setToken(newToken)
        setUser(newUser)
        await AsyncStorage.setItem('token', newToken)
        await AsyncStorage.setItem('user', JSON.stringify(newUser))
    }

    async function signOut() {
        setToken(null)
        setUser({})
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
    }

    return (
        <GlobalContext.Provider value={{ token, user, auth, signOut }}>
            {isLoaded ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="small" color={COLOR.primary} />
                </View>
            ) : children}
        </GlobalContext.Provider>
    )
}
