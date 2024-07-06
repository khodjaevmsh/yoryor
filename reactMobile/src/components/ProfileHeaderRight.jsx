import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ArrowDownCircle } from 'react-native-feather'
import { COLOR } from '../utils/colors'

export default function ProfileHeaderRight({ onPress }) {
    return (
        <TouchableOpacity style={styles.wrapper} activeOpacity={1} onPress={onPress}>
            <ArrowDownCircle width={32} height={32} color={COLOR.primary} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {},
})
