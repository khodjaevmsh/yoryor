import { KeyboardAvoidingView, Platform, Dimensions } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'

export default function KeyboardAvoiding({ children }) {
    const [keyboardVerticalOffset, setKeyboardVerticalOffset] = useState(0)

    useLayoutEffect(() => {
        const updateKeyboardVerticalOffset = () => {
            // Get the height of the screen
            const screenHeight = Dimensions.get('window').height
            // Set the keyboard offset based on the screen height
            const offset = Platform.OS === 'ios' ? screenHeight * 0.1 : 0
            setKeyboardVerticalOffset(offset)
        }

        // Add an event listener for changes in screen dimensions
        const dimensionChangeListener = Dimensions.addEventListener('change', updateKeyboardVerticalOffset)
        // Call the function once to set the initial offset
        updateKeyboardVerticalOffset()
        // Cleanup the event listener when the component is unmounted
        return () => {
            dimensionChangeListener.remove()
        }
    }, []) // Empty dependency array ensures that this effect runs only once

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={{ flex: 1 }}>
            {children}
        </KeyboardAvoidingView>
    )
}
