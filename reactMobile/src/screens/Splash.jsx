import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import { COLOR } from '../utils/colors'
import ButtonOutline from '../components/common/ButtonOutline'

export default function Splash() {
    const navigation = useNavigation()
    return (
        <Container containerStyle={styles.containerStyle}>
            <View style={styles.logoWrapper}>
                <Text style={{ fontSize: 82, color: COLOR.white, fontWeight: '400' }}>sovcHi</Text>
            </View>
            <View style={styles.policyAndTermsWrapper}>
                <Text style={styles.policyAndTerms}>
                    “Ro‘yxatdan o‘tish” tugmasini bosish orqali siz Shartlarimizga rozilik bildirasiz.
                    Maʼlumotlaringizni qanday qayta ishlatishimizni Maxfiylik va Cookie siyosatlarimizdan
                    bilib oling.
                </Text>

                <ButtonOutline
                    title="Ro'yxatdan o'tish"
                    textStyle={{ color: COLOR.black }}
                    buttonStyle={[styles.button, { marginBottom: 6 }]}
                    onPress={() => navigation.navigate('SignUp')} />

                <ButtonOutline
                    title="Kirish"
                    textStyle={{ color: COLOR.black }}
                    buttonStyle={styles.button}
                    onPress={() => navigation.navigate('SignIn')} />
            </View>

        </Container>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        marginHorizontal: 0,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: COLOR.primary,
        paddingBottom: 32,
        paddingHorizontal: 10,
    },
    logoWrapper: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 100,
    },
    button: {
        borderWidth: 0,
        marginTop: 6,
        backgroundColor: COLOR.white,
    },
    policyAndTermsWrapper: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    policyAndTerms: {
        fontSize: normalize(12),
        lineHeight: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: COLOR.white,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
})
