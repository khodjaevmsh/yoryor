import moment from 'moment'
import { Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { determineFontSize } from '../utils/string'
import { GlobalContext } from '../context/GlobalContext'
import { fontSize } from '../utils/fontSizes'

export default function NameWithAge({ textStyle }) {
    const { profile } = useContext(GlobalContext)
    const age = new Date().getFullYear() - moment(profile.birthdate).format('YYYY')

    return (
        <Text style={[styles.text, textStyle, { fontSize: determineFontSize(profile.name, 25) }]}>
            {profile.name}, {age}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: fontSize.medium,
        fontWeight: '600',
    },
})
