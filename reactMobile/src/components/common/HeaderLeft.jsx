import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'

export default function HeaderLeft({ title, titleColor }) {
    return (
        <View style={styles.wrapper}>
            <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginLeft: 18,
    },
    title: {
        fontSize: normalize(22),
        fontWeight: '600',
    },
})
