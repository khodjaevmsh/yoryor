import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

export default function Container({ children, scrollable, containerStyle }) {
    // Use ScrollView if scrollable prop is true, otherwise use a simple View
    const Component = scrollable ? ScrollView : View

    return (
        <Component style={[styles.container, containerStyle]}>
            {children}
        </Component>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
    },
})
