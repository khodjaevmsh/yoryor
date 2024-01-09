import { Text, View, StyleSheet } from 'react-native'
import { ChevronRight } from 'react-native-feather'
import React from 'react'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'

export default function SocialCard({ icon, username }) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.usernameWrapper}>
                {icon}
                <Text style={styles.username}>@{username}</Text>
            </View>
            <ChevronRight width={30} height={30} color={COLOR.black} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 22,
    },
    usernameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontSize: fontSize.medium,
        color: COLOR.grey,
        fontWeight: '500',
        marginLeft: 5,
    },
})
