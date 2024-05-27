import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { ChevronDown, ChevronLeft } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import { COLOR } from '../../utils/colors'

export default function CustomHeaderLeft({ down, size = 34 }) {
    const navigation = useNavigation()

    const iconType = down ? (
        <ChevronDown width={size} height={size} color={COLOR.primary} />
    ) : (
        <ChevronLeft width={size} height={size} color={COLOR.primary} />
    )

    return (
        <TouchableOpacity style={styles.wrapper} onPress={() => navigation.goBack()}>
            {iconType}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 3,
        borderRadius: 55,
    },
})
