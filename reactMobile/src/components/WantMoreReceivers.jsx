import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import Container from './common/Container'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'

export default function WantMoreReceivers({ setModalVisible }) {
    return (
        <Container containerStyle={styles.container}>
            <Text style={styles.wantMore}>Boshqa topilmadi!</Text>
            <Text style={styles.change}>
                Filtr sozlamalarini oʻzgartiring va boshqa foydalanuvchilarni toping.
            </Text>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.filter}>Filtr sozlamalari</Text>
            </TouchableOpacity>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    wantMore: {
        fontSize: normalize(26),
        fontWeight: '600',
    },
    change: {
        fontSize: fontSize.medium,
        color: COLOR.grey,
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 23,
    },
    button: {
        paddingHorizontal: 62,
        backgroundColor: COLOR.black,
        marginTop: 42,
        marginBottom: 32,
    },
    filter: {
        marginVertical: 35,
        fontSize: fontSize.small,
        color: COLOR.grey,
    },
})
