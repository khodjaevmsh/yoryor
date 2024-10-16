import React from 'react'
import { Text, StyleSheet, View, Linking, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import { COLOR } from '../utils/colors'
import ButtonOutline from '../components/common/ButtonOutline'
import { AppLogo } from '../components/common/Svgs'

export default function Splash() {
    const navigation = useNavigation()

    async function openURL() {
        const url = 'https://www.privacypolicies.com/live/d9ca7230-885b-40c7-a5e2-0465c1a06990'
        try {
            await Linking.openURL(url)
        } catch (error) {
            console.error('An error occurred', error)
        }
    }

    return (
        <Container containerStyle={styles.containerStyle}>
            <View style={styles.logoWrapper}>
                <AppLogo />
            </View>
            <View style={styles.policyAndTermsWrapper}>
                <TouchableOpacity activeOpacity={1} onPress={openURL}>
                    <Text style={styles.policyAndTerms}>
                        “Ro‘yxatdan o‘tish” tugmasini bosish orqali siz Shartlarimizga rozilik bildirasiz.
                        Maʼlumotlaringizni qanday qayta ishlatishimizni Maxfiylik va Cookie siyosatlarimizdan
                        bilib oling.
                    </Text>
                </TouchableOpacity>

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
        paddingHorizontal: 5,
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
        marginTop: 7,
        backgroundColor: COLOR.white,
    },
    policyAndTermsWrapper: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
    },
    policyAndTerms: {
        fontSize: normalize(12),
        lineHeight: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: COLOR.white,
        marginBottom: 20,
    },
})
