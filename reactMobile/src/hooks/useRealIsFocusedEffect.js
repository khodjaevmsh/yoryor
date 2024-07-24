import React, { useCallback } from 'react'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'

export const useRealIsFocusedEffect = (callback) => {
    const isFocused = useIsFocused()
    useFocusEffect(
        useCallback(() => {
            if (!isFocused) return
            callback()
        }, [isFocused]),
    )
}
