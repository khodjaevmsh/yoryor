import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from './common/Container'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import Button from './common/Button'

export default function EmptyEncounter({ setModalVisible }) {
    const navigation = useNavigation()
    return (
        <Container containerStyle={styles.container}>
            <Text style={styles.title}>Ko'proq xoxlayapsizmi?</Text>
            <Text style={styles.subTitle}>
                Hoziroq yana kimlar bilan suhbatlashish mumkinligini koʻring yoki filtr sozlamalarini oʻzgartiring.
            </Text>
            <Button title="Ko'rish" buttonStyle={styles.button} onPress={() => navigation.navigate('Discover')} />
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
    button: {
        paddingHorizontal: 62,
        backgroundColor: COLOR.black,
        marginVertical: 32,
    },
    subButton: {
        fontSize: fontSize.small,
        color: COLOR.grey,
    },
})
