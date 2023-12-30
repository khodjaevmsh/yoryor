import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLOR } from '../../utils/colors'

export default function ServerError({ error, style }) {
    const err = error ? Object.keys(error.data).map((fieldName) => error.data[fieldName][0]) : null

    return (
        <View>
            <Text style={[styles.error, style]}>{err ? `* ${err}` : null}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    error: {
        color: COLOR.primary,
        marginTop: 8,
        marginLeft: 1,
    },
})
