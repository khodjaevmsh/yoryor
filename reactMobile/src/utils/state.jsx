import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function usePersistState(key, defaultValue) {
    const [state, setState] = useState(null)
    useEffect(() => {
        AsyncStorage.getItem(key)
            .then((item) => {
                if (item) {
                    try {
                        setState(JSON.parse(item))
                    } catch (e) {
                        setState(item)
                    }
                } else { setState(defaultValue) }
            })
            .catch((error) => {
                console.error('Error fetching data from AsyncStorage:', error)
            })
    }, [key])

    useEffect(() => {
        const val = typeof state === 'object' ? JSON.stringify(state) : String(state)
        AsyncStorage.setItem(key, val)
            .catch((error) => {
                console.error('Error saving data to AsyncStorage:', error)
            })
    }, [key, state])

    return [state, setState]
}
