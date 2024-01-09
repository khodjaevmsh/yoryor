import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import { baseAxios } from '../../hooks/requests'
import { PROFILE } from '../../urls'
import Button from '../../components/common/Button'
import { GlobalContext } from '../../context/GlobalContext'
import ServerError from '../../components/common/ServerError'

const zodiacList = [
    { id: 'aries', title: 'Qo\'y' },
    { id: 'taurus', title: 'Buqa' },
    { id: 'gemini', title: 'Egizaklar' },
    { id: 'cancer', title: 'Qisqichbaqa' },
    { id: 'leo', title: 'Arslon' },
    { id: 'virgo', title: 'Parizod' },
    { id: 'libra', title: 'Tarozi' },
    { id: 'scorpio', title: 'Chayon' },
    { id: 'sagittarius', title: 'O\'q otar' },
    { id: 'capricorn', title: 'Tog\' echkisi' },
    { id: 'aquarius', title: 'Qovg\'a' },
    { id: 'pisces', title: 'Baliqlar' },
]

export default function Zodiac({ route }) {
    const { props } = route.params
    const [zodiac, setZodiac] = useState(props.zodiac.value)
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [validationError, setValidationError] = useState('')
    const { profile, setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    async function onSubmit() {
        if (!zodiac) {
            setValidationError('* Burjingizni tanlang')
        } else {
            try {
                setLoading(true)
                await baseAxios.put(PROFILE.replace('{id}', profile.id), { zodiac })
                navigation.goBack()
                setRender(true)
            } catch (error) {
                setServerError(error.response)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <Container scrollable>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Burjingiz?</Text>

                <View style={{ marginTop: 22, marginBottom: 32 }}>
                    {zodiacList.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.7}
                            onPress={() => setZodiac(item.id)}
                            style={[styles.gender, zodiac === item.id && styles.activeGender]}>
                            <Text style={styles.genderText}>{item.title}</Text>
                            <View style={[styles.radio, zodiac === item.id && styles.activeRadio]} />
                        </TouchableOpacity>
                    ))}
                </View>

                <ServerError error={serverError} style={styles.serverError} />
                {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}

                <View style={styles.buttonWrapper}>
                    <Button
                        title="Davom etish"
                        onPress={onSubmit}
                        buttonStyle={styles.button}
                        loading={loading} />
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(28),
        fontWeight: '500',
    },
    gender: {
        width: '100%',
        height: normalize(52),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 18,
        marginVertical: 7,
        backgroundColor: COLOR.extraLightGrey,
    },
    genderText: {
        fontSize: fontSize.medium,
        color: COLOR.black,
        fontWeight: '500',
    },
    radio: {
        width: normalize(24),
        height: normalize(24),
        borderWidth: 2,
        borderRadius: 100,
    },
    activeRadio: {
        width: normalize(24),
        height: normalize(24),
        borderWidth: 6,
        borderRadius: 100,
    },
    activeGender: {
        backgroundColor: COLOR.lightPrimary,
    },
    validationError: {
        color: COLOR.primary,
        marginTop: 8,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
