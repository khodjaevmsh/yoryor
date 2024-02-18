import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { COLOR } from '../utils/colors'

export default function RoundedTagWithIcon({ icon, text }) {
    return (
        <View style={styles.tagWrapper}>
            {icon}
            <Text style={styles.tagText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tagWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.extraLightGrey,
        borderRadius: 20,
        paddingVertical: 9,
        paddingHorizontal: 14,
        marginVertical: 7,
        marginRight: 8,
    },
    tagText: {
        color: COLOR.black,
        fontSize: 14,
        marginLeft: 4,
        fontWeight: '500',
    },
})
