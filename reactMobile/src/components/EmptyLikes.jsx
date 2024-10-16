import React, { useCallback, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { endConnection } from 'react-native-iap'
import Container from './common/Container'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import Button from './common/Button'
import { initIAP, purchaseErrorSubscription, purchaseUpdateSubscription } from '../utils/iap'
import SubscriptionModal from './SubscriptionModal'

export default function EmptyLikes() {
    const navigation = useNavigation()
    const [products, setProducts] = useState([])
    const [isModalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    useFocusEffect(
        useCallback(() => {
            initIAP(setProducts, setLoading)
            return () => {
                purchaseUpdateSubscription.remove()
                purchaseErrorSubscription.remove()
                endConnection()
            }
        }, []),
    )

    return (
        <Container containerStyle={styles.container}>
            <Text style={styles.title}>Ko'proq like olishni istaysizmi?</Text>
            <Text style={styles.subTitle}>
                Unda tanishuvlar bo'limida faol bo'ling yoki Premium akkauntni xarid qiling.
            </Text>
            <Button
                title="Xarid qilish"
                buttonStyle={styles.button}
                loading={loading}
                onPress={() => setModalVisible(true)} />
            <TouchableOpacity onPress={() => navigation.navigate('Encounter')}>
                <Text style={styles.subButton}>Tanishuvlar bo'limi</Text>
            </TouchableOpacity>
            <SubscriptionModal products={products} isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: normalize(22),
        fontWeight: '600',
    },
    subTitle: {
        fontSize: fontSize.medium,
        color: COLOR.grey,
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 23,
    },
    button: {
        width: normalize(200),
        paddingHorizontal: 62,
        backgroundColor: COLOR.black,
        marginVertical: 32,
    },
    subButton: {
        fontSize: fontSize.small,
        color: COLOR.grey,
    },
})
