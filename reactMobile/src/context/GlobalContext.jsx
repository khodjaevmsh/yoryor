import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator, View } from 'react-native'
import { COLOR } from '../utils/colors'
import { usePersistState } from '../utils/state'

export const GlobalContext = createContext({})

export default function GlobalProvider({ children }) {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [language, setLanguage] = usePersistState('language', 'uz')
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
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
        <GlobalContext.Provider value={{ token, user, auth, signOut, language, setLanguage }}>
            {isLoaded ? children : null}
        </GlobalContext.Provider>
    )
}
