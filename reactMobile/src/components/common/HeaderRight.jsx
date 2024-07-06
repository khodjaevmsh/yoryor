import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function HeaderRight({ icon, onPress }) {
    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
            {icon}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginRight: 18,
    },
})
