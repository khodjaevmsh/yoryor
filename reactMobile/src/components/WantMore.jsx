import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from './common/Container'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import Button from './common/Button'

export default function WantMore({ setModalVisible }) {
    const navigation = useNavigation()
    return (
        <Container containerStyle={styles.container}>
            <Text style={styles.wantMore}>Ko'proq xoxlayapsizmi?</Text>
            <Text style={styles.change}>
                Hoziroq yana kimlar bilan suhbatlashish mumkinligini koʻring yoki filtr sozlamalarini oʻzgartiring.
            </Text>
            <Button title="Ko'rish" buttonStyle={styles.button} onPress={() => navigation.navigate('Discover')} />
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
        fontSize: fontSize.small,
        color: COLOR.grey,
    },
})
