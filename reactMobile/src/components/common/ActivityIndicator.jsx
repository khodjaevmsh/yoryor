import { ActivityIndicator as RNActivityIndicator, View, StyleSheet } from 'react-native'
import React from 'react'

export default function ActivityIndicator({ size = 'small', color = '#ced4da', padding = false }) {
    return (
        <View style={[styles.wrapper, { padding: padding ? 15 : null }]}>
            <RNActivityIndicator size={size} color={color} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
