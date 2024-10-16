import React, { createContext, useContext, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { baseAxios } from '../hooks/requests'
import { GlobalContext } from './GlobalContext'
import { SUBSCRIPTION } from '../urls'

export const SubscriptionContext = createContext()

export default function SubscriptionProvider({ children }) {
    const { user, token } = useContext(GlobalContext)
    const [loading, setLoading] = useState(true)
    const [subscription, setSubscription] = useState({ isActive: false, type: null })

    useEffect(() => {
        async function fetchSubscription() {
            try {
                setLoading(true)

                const response = await baseAxios.get(SUBSCRIPTION)

                setSubscription({ isActive: response.data.isActive, type: response.data.productId })
            } catch (error) {
                console.error('Error fetching subscription type:', error)
            } finally {
                setLoading(false)
            }
        }
        if (user && token) {
            fetchSubscription()
        } else {
            setLoading(false)
        }
    }, [user, token])

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <SubscriptionContext.Provider value={{ subscription, setSubscription }}>
            {!loading ? children : null}
        </SubscriptionContext.Provider>
    )
}
