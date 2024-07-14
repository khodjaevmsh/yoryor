import React, { useState } from 'react'
import { Text, StyleSheet, View, Keyboard } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize/src/index'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'
import { COLOR } from '../../utils/colors'
import Input from '../../components/common/Input'
import { baseAxios } from '../../hooks/requests'
import { SEND_CODE } from '../../urls'
import ServerError from '../../components/common/ServerError'
import { fontSize } from '../../utils/fontSizes'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import PhoneInput from '../../components/common/PhoneInput'

export default function SignUp() {
    const [serverError, setServerError] = useState('')
    const [callingCode, setCallingCode] = useState('998')
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{9}$/, 'Telefon raqamingiz formati xato kiritilgan')
            .required('Majburiy maydon'),
    })

    async function onSubmit(data) {
        try {
            setLoading(true)
            await baseAxios.post(SEND_CODE, { countryCode: callingCode, phoneNumber: data.phoneNumber })
            navigation.navigate('CheckConfirmationCode', { phoneNumber: data.phoneNumber })
            setServerError('')
        } catch (error) {
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <Text style={styles.title}>Ro'yxatdan o'tish</Text>
                <Text style={styles.subTitle}>
                    Shaxsiy telefon raqamingizni kiriting.
                    Akkauntingizni tasdiqlash uchun sizga 5 xonali kod yuboramiz.
                </Text>

                <Formik
                    initialValues={{ phoneNumber: '906351001' }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                        <>

                            <PhoneInput
                                name="phoneNumber"
                                keyboardType="numeric"
                                placeholder="90 635 10 01"
                                setCallingCode={setCallingCode} />

                            <ServerError error={serverError} />

                            <View style={styles.buttonWrapper}>
                                <Button
                                    title="Davom etish"
                                    onPress={() => {
                                        handleSubmit()
                                        Keyboard.dismiss()
                                    }}
                                    buttonStyle={styles.button}
                                    loading={loading} />
                            </View>
                        </>
                    )}
                </Formik>
            </Container>
        </KeyboardAvoiding>
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
        marginBottom: 15,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    serverError: {
        position: 'absolute',
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: 55,
    },
})
