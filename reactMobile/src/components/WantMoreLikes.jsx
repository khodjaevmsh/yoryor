import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from './common/Container'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import Button from './common/Button'

export default function WantMoreLikes() {
    const navigation = useNavigation()
    return (
        <Container containerStyle={styles.container}>
            <Text style={styles.wantMore}>Ko'proq like olishni istaysizmi?</Text>
            <Text style={styles.change}>
                Unda tanishuvlar bo'limida faol bo'ling yoki Premium akkauntni xarid qiling.
            </Text>
            <Button title="Xarid qilish" buttonStyle={styles.button} onPress={() => navigation.navigate('Profile')} />
            <TouchableOpacity onPress={() => navigation.navigate('Encounter')}>
                <Text style={styles.filter}>Tanishuvlar bo'limi</Text>
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
        textAlign: 'center',
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
        width: normalize(200),
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
