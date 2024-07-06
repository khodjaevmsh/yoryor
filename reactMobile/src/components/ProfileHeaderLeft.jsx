import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import moment from 'moment'
import normalize from 'react-native-normalize'

export default function ProfileHeaderLeft({ name, birthdate }) {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{name},</Text>
            <Text style={styles.birthdate}>
                {new Date().getFullYear() - moment(birthdate).format('YYYY')}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: normalize(22),
        fontWeight: '600',
    },
    birthdate: {
        fontSize: 24,
        marginLeft: 6,
    },
})
