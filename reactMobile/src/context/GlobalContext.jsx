import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const GlobalContext = createContext({})

export default function GlobalProvider({ children }) {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
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

    return (
        <GlobalContext.Provider value={{ token, user, auth }}>
            {isLoaded ? children : null}
        </GlobalContext.Provider>
    )
}
