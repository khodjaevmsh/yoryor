import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from './common/Container'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import Button from './common/Button'

export default function EmptyChat() {
    const navigation = useNavigation()
    return (
        <Container containerStyle={styles.container}>
            <Text style={styles.match}>MATCH</Text>
            <Text style={styles.title}>qilishga harakat qiling!</Text>
            <Text style={styles.subTitle}>
                Siz va boshqa foydalanuvchi bir-birlaringizga like bosganingizdan so'ng
                xabar yozish imkoniyatiga ega bo'lasiz.
            </Text>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    match: {
        fontSize: normalize(38),
        fontStyle: 'italic',
        fontWeight: '800',
        color: COLOR.primary,
    },
    title: {
        textAlign: 'center',
        fontSize: normalize(26),
        fontWeight: '600',
    },
    subTitle: {
        fontSize: fontSize.medium,
        color: COLOR.grey,
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 23,
    },
})
