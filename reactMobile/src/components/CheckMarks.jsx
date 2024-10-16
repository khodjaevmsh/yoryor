import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { SubscriptionContext } from '../context/SubscriptionContext'
import { CheckMarkBlack, CheckMarkBlue, CheckMarkGray } from './common/Svgs'

export default function CheckMarks({ wrapper, size = 25 }) {
    const { subscription } = useContext(SubscriptionContext)

    if (subscription.isActive) {
        if (subscription.type === 'gold') {
            return (
                <View style={[styles.wrapper, wrapper]}>
                    <CheckMarkBlue width={size} height={size} />
                </View>
            )
        } if (subscription.type === 'platinum') {
            return (
                <View style={[styles.wrapper, wrapper]}>
                    <CheckMarkBlack width={size} height={size} />
                </View>
            )
        }
    } else {
        return (
            <View style={[styles.wrapper, wrapper]}>
                <CheckMarkGray width={size} height={size} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 2,
    },
})
