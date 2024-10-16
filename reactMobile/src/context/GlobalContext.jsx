import React, { createContext, useEffect, useRef, useState } from 'react'
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
    const swiperRef = useRef(null)

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

    async function updateProfileStorage(updatedProfile) {
        setProfile(updatedProfile)
        await AsyncStorage.setItem('profile', JSON.stringify(updatedProfile))
    }

    async function signOut() {
        setToken(null)
        setUser({})
        setProfile({})
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('profile')
    }

    useEffect(() => {
        const ws = new WebSocket(`ws://127.0.0.1:8000/ws/main/profile-status/?token=${token}`)

        ws.onopen = () => {}

        ws.onmessage = () => {}

        ws.onclose = () => {}

        return () => ws.close()
    }, [token])

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <GlobalContext.Provider value={{
            token,
            user,
            profile,
            auth,
            updateProfileStorage,
            signOut,
            language,
            setLanguage,
            swiperRef,
        }}>
            {isLoaded ? children : null}
            <Toast config={toastConfig} />
        </GlobalContext.Provider>
    )
}
