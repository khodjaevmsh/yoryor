import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { usePersistState } from '../utils/state'
import { toastConfig } from '../components/common/Toast'

export const GlobalContext = createContext({})

export default function GlobalProvider({ children }) {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [language, setLanguage] = usePersistState('language', 'uz')
    const [isLoaded, setIsLoaded] = useState(false)
    const [render, setRender] = useState(false)
    const [tabMessageCount, setTabMessageCount] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('token').then(async (value) => {
            setToken(value)
            return AsyncStorage.getItem('user')
        }).then((value) => {
            setUser(JSON.parse(value))
            return AsyncStorage.getItem('profile')
        }).then(((value) => {
            setProfile(JSON.parse(value))
            setIsLoaded(true)
        })).catch((error) => {
            console.error('Error retrieving data from AsyncStorage:', error)
        })
    }, [])

    async function auth(newToken, newUser, newProfile) {
        setToken(newToken)
        setUser(newUser)
        setProfile(newProfile)
        await AsyncStorage.setItem('token', newToken)
        await AsyncStorage.setItem('user', JSON.stringify(newUser))
        await AsyncStorage.setItem('profile', JSON.stringify(newProfile))
    }

    async function signOut() {
        setToken(null)
        setUser({})
        setProfile({})
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('profile')
    }

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <GlobalContext.Provider value={{
            token,
            user,
            profile,
            auth,
            signOut,
            language,
            setLanguage,
            render,
            setRender,
            tabMessageCount,
            setTabMessageCount,
        }}>
            {isLoaded ? children : null}
            <Toast config={toastConfig} />
        </GlobalContext.Provider>
    )
}
