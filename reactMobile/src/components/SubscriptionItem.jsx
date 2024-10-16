import React, { useContext, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Check } from 'react-native-feather'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { handlePurchase } from '../utils/iap'
import { GlobalContext } from '../context/GlobalContext'
import { SubscriptionContext } from '../context/SubscriptionContext'

export default function SubscriptionItem({ item, setModalVisible }) {
    const [loading, setLoading] = useState(false)
    const { user } = useContext(GlobalContext)
    const { subscription, setSubscription } = useContext(SubscriptionContext)

    return (
        <TouchableOpacity activeOpacity={1}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={item.background}
                style={[styles.wrapper, { borderColor: item.color }]}>
                <View>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {subscription.isActive && item.productId === subscription.type && (
                                <View style={{ marginRight: 5 }}>
                                    <Check width={28} height={28} color={COLOR.black} strokeWidth={2.5} />
                                </View>
                            )}
                            <Text style={[styles.name, { color: item.id === 3 && COLOR.white }]}>{item.title}</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.button, { opacity: item.productId === subscription.type ? 0.6 : 1 }]}
                            onPress={() => handlePurchase(item.productId, user, setSubscription, setLoading)}
                            disabled={item.productId === subscription.type}
                            activeOpacity={1}>
                            {!loading ? (
                                <Text style={styles.buttonLabel}>Aktivlashtirish</Text>
                            ) : <ActivityIndicator />}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.descriptionWrapper}>
                        {item.description.slice(0, 3).map((desc, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                            <View style={styles.subDescriptionWrapper} key={index}>
                                <Text style={styles.description}>{desc.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={[styles.featuresButton, { color: item.color }]}>Imkoniyatlarni ko'rish</Text>
                </TouchableOpacity>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        borderWidth: 1,
        overflow: 'hidden',
        backgroundColor: COLOR.extraLightGrey,
        padding: 15,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    name: {
        fontSize: 26,
        fontWeight: '700',
    },
    button: {
        width: normalize(150),
        height: normalize(44),
        borderRadius: 25,
        padding: 5,
        backgroundColor: COLOR.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLabel: {
        color: COLOR.white,
        fontSize: fontSize.medium,
        fontWeight: '600',
    },
    descriptionWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    subDescriptionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    description: {
        fontSize: fontSize.medium,
        color: COLOR.darkGrey,
        marginVertical: 10,
    },
    featuresButton: {
        fontSize: fontSize.medium,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 5,
    },
})
