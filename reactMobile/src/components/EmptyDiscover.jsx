import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import Container from './common/Container'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'

export default function EmptyDiscover({ setModalVisible }) {
    return (
        <Container containerStyle={styles.container}>
            <Text style={styles.title}>Boshqa topilmadi!</Text>
            <Text style={styles.subTitle}>
                Filtr sozlamalarini oʻzgartiring va boshqa foydalanuvchilarni toping.
            </Text>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.subButton}>Filtr sozlamalari</Text>
            </TouchableOpacity>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
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
    subButton: {
        marginVertical: 32,
        fontSize: fontSize.small,
        color: COLOR.grey,
    },
})
