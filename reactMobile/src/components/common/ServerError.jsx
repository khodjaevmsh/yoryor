import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLOR } from '../../utils/colors'

export default function ServerError({ error }) {
    const err = error ? Object.keys(error.data).map((fieldName) => error.data[fieldName][0]) : null

    return (
        <View>
            <Text style={styles.error}>{err}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    error: {
        color: COLOR.primary,
        marginTop: 6,
    },
})
