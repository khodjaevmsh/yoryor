import React from 'react'
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'

export default function Container({ children, scrollable, containerStyle }) {
    // Use ScrollView if scrollable prop is true, otherwise use a simple View
    const Component = scrollable ? ScrollView : View

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Component
                style={!scrollable ? [styles.container, containerStyle] : null}
                contentContainerStyle={scrollable ? styles.scrollContainer : null}
                showsVerticalScrollIndicator={scrollable ? false : null}>
                {children}
            </Component>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 14,
        marginBottom: Platform.OS === 'ios' ? 32 : 24,
        marginHorizontal: 22,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingTop: 14,
        paddingBottom: Platform.OS === 'ios' ? 32 : 24,
        paddingHorizontal: 22,
    },
})
