import { Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLOR } from '../../utils/colors'

export default function TextError({ children, textErrorStyle }) {
    // eslint-disable-next-line react/destructuring-assignment
    return <Text style={[styles.error, textErrorStyle]}>* {children}</Text>
}

const styles = StyleSheet.create({
    error: {
        color: COLOR.primary,
        marginTop: 8,
        marginLeft: 1,
    },
})
