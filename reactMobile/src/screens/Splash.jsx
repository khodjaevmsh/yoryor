import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import logo from '../assets/images/logo.png'
import Button from '../components/common/Button'
import { COLOR } from '../utils/colors'
import ButtonOutline from '../components/common/ButtonOutline'
import { FONT_SIZE } from '../utils/fontSizes'

export default function Splash() {
    const navigation = useNavigation()
    return (
        <Container containerStyle={{ paddingBottom: 45 }}>
            <View style={styles.logoWrapper}>
                <Image style={styles.logo} source={logo} />
            </View>
            <View style={styles.policyAndTermsWrapper}>
                <Text style={styles.policyAndTerms}>
                    “Ro‘yxatdan o‘tish” tugmasini bosish orqali siz Shartlarimizga rozilik bildirasiz.
                    Maʼlumotlaringizni qanday qayta ishlashimizni Maxfiylik siyosatimiz va Cookie siyosatimizdan
                    bilib oling.
                </Text>
                <Button title="Ro'yxatdan o'tish" buttonStyle={styles.button} onPress={() => navigation.navigate('SignUp')} />
                <ButtonOutline title="Kirish" buttonStyle={styles.button} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    logoWrapper: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logo: {
        width: 185,
        height: 100,
    },
    button: {
        marginVertical: 6,
    },
    policyAndTermsWrapper: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    policyAndTerms: {
        fontSize: normalize(11),
        lineHeight: 16,
        fontWeight: '500',
        textAlign: 'center',
        color: COLOR.grey,
        marginBottom: 20,
    },
})
