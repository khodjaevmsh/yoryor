import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Button from '../components/common/Button'
import { COLOR } from '../utils/colors'
import SplashCarousel from '../components/SplashCarousel'

export default function Splash() {
    const navigation = useNavigation()
    return (
        <View style={styles.wrapper}>

            <SplashCarousel />

            <View style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 25 }}>
                <Button title="Создать аккаунт" onPress={() => navigation.navigate('SignUpWith')} />
                <View style={styles.haveAccountWrapper}>
                    <Text style={styles.haveAccount}>У вас уже есть аккаунт?</Text>
                    <TouchableOpacity>
                        <Text style={styles.signIn}>Войти</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 45,
        justifyContent: 'space-evenly',
    },
    haveAccountWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 18,
    },
    haveAccount: {
        marginRight: 5,
    },
    signIn: {
        color: COLOR.primary,
        fontWeight: '500',
    },
})
