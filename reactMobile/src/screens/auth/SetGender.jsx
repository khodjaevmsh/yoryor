import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import ValidationError from '../../components/common/ValidationError'
import { genders } from '../../utils/choices'

export default function SetGender({ route }) {
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState('')
    const [gender, setGender] = useState(null)
    const navigation = useNavigation()
    const { phoneNumber, password, name, birthdate } = route.params

    useEffect(() => {
        setValidationError('')
    }, [gender])

    async function onSubmit() {
        if (!gender) {
            setValidationError('Jinsigzini tanlang')
        } else {
            setLoading(true)
            navigation.navigate('SetCity', { phoneNumber, password, name, birthdate, gender })
        }
        setLoading(false)
    }

    return (
        <Container>

            <Text style={styles.title}>Jinsingiz tanlang</Text>
            <Text style={styles.subTitle}>Jinsingizni keyinchalik o'zgartirish imkoniyati bo'lmaydi!</Text>

            <View style={styles.genderWrapper}>
                {Object.entries(genders).map(([key, value]) => (
                    <TouchableOpacity
                        key={key}
                        activeOpacity={0.7}
                        onPress={() => setGender(key)}
                        style={[styles.gender, gender === key && styles.activeGender]}>
                        <Text style={styles.genderText}>{value}</Text>
                        <View style={[styles.radio, gender === key && styles.activeRadio]} />
                    </TouchableOpacity>
                ))}
            </View>

            <ValidationError validationError={validationError} />

            <View style={styles.buttonWrapper}>
                <Button
                    title="Davom etish"
                    onPress={onSubmit}
                    buttonStyle={styles.button}
                    loading={loading} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(28),
        fontWeight: '600',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 20,
        fontSize: fontSize.small,
        lineHeight: 19.5,
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
        marginTop: 3,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
