import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'

export default function SingleTag({ icon, text }) {
    return (
        <View style={styles.tagWrapper}>
            {icon}
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tagWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.extraLightGrey,
        borderRadius: 55,
        paddingVertical: 14,
        paddingHorizontal: 24,
        marginVertical: 7,
        marginRight: 8,
    },
    text: {
        fontSize: normalize(16),
        fontWeight: '500',
        marginLeft: 12,
    },
})
