import React, { useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import normalize from 'react-native-normalize'
import { Check } from 'react-native-feather'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { SubscriptionContext } from '../context/SubscriptionContext'

export default function SubscriptionCard({ item, handlePurchase, buttonLoading }) {
    const { subscription } = useContext(SubscriptionContext)

    return (
        <TouchableOpacity activeOpacity={1}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={item.background}
                style={[styles.carouselItem, { borderColor: item.border }]}>
                <View style={styles.subscriptionHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {subscription.isActive && item.productId === subscription.type && (
                            <View style={{ marginRight: 5 }}>
                                <Check width={28} height={28} color={COLOR.black} strokeWidth={2.5} />
                            </View>
                        )}
                        <Text style={[styles.subscriptionName, { color: item.id === 3 && COLOR.white }]}>
                            {item.title}
                        </Text>
                    </View>
                    <Text style={[styles.subscriptionPrice, { color: item.id === 3 && COLOR.white }]}>
                        ${item.price}/oy
                    </Text>
                </View>
                <View style={styles.descriptionWrapper}>
                    {item.description.map((desc, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <View style={styles.subDescWrapper} key={index}>
                            <Check color={COLOR.primary} width={17} height={17} strokeWidth={3} />
                            <Text style={[styles.subscriptionDescription, { color: item.id === 3 && COLOR.white }]}>
                                {desc.label}
                            </Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity
                    style={[styles.activateButton, { opacity: item.productId === subscription.type ? 0.7 : 1 }]}
                    onPress={() => handlePurchase(item.productId)}
                    disabled={item.productId === subscription.type}>
                    {!buttonLoading ? (
                        <Text style={styles.activateTitle}>
                            {item.productId === subscription.type ? 'Xarid qilingan' : 'Aktivlashtirish'}
                        </Text>
                    ) : <ActivityIndicator />}
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
    descriptionWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    subDescWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subscriptionDescription: {
        fontSize: fontSize.small,
        color: COLOR.darkGrey,
        fontWeight: '500',
        marginVertical: 7,
        marginLeft: 5,
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
