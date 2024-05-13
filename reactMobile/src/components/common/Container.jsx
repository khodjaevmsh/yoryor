import React from 'react'
import { View,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform } from 'react-native'

export default function Container({ children, scrollable, containerStyle, keyboardDismiss = true }) {
    // Use ScrollView if scrollable prop is true, otherwise use a simple View
    const Component = scrollable ? ScrollView : View

    return (
    // Conditionally render TouchableWithoutFeedback
        keyboardDismiss ? (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Component
                    style={!scrollable ? [styles.container, containerStyle] : null}
                    contentContainerStyle={scrollable ? [styles.scrollContainer, containerStyle] : null}
                    showsVerticalScrollIndicator={scrollable ? false : null}>
                    {children}
                </Component>
            </TouchableWithoutFeedback>
        ) : (
            <Component
                style={!scrollable ? [styles.container, containerStyle] : null}
                contentContainerStyle={scrollable ? [styles.scrollContainer, containerStyle] : null}
                showsVerticalScrollIndicator={scrollable ? false : null}>
                {children}
            </Component>
        )
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 14,
        marginBottom: Platform.OS === 'ios' ? 32 : 24,
        marginHorizontal: 16,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 14,
        paddingBottom: Platform.OS === 'ios' ? 32 : 24,
        paddingHorizontal: 16,
    },
})
