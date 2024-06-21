import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'

export default function SubscriptionCard({ item }) {
    return (
        <TouchableOpacity activeOpacity={1}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={item.background}
                style={[styles.carouselItem, { borderColor: item.border }]}>
                <View style={styles.subscriptionHeader}>
                    <Text style={[styles.subscriptionName, { color: item.id === 3 && COLOR.white }]}>
                        {item.name}
                    </Text>
                    <Text style={[styles.subscriptionPrice, { color: item.id === 3 && COLOR.white }]}>
                        {item.price}
                    </Text>
                </View>
                <Text style={[styles.subscriptionDescription, { color: item.id === 3 && COLOR.white }]}>
                    {item.description}
                </Text>
                <TouchableOpacity style={styles.activateButton}>
                    <Text style={styles.activateTitle}>Aktivlashtirish</Text>
                </TouchableOpacity>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    carouselItem: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        borderWidth: 1,
        overflow: 'hidden',
        backgroundColor: COLOR.extraLightGrey,
        padding: 20,
        justifyContent: 'space-between',
    },
    subscriptionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subscriptionName: {
        fontSize: normalize(22),
        fontWeight: '700',
    },
    subscriptionPrice: {
        fontSize: fontSize.large,
        fontWeight: '600',
    },
    subscriptionDescription: {
        fontSize: fontSize.medium,
        color: COLOR.darkGrey,
    },
    activateButton: {
        width: '100%',
        height: normalize(42),
        backgroundColor: COLOR.black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    activateTitle: {
        fontSize: fontSize.small,
        color: COLOR.white,
        fontWeight: '500',
    },
    footerWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
