import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import normalize from 'react-native-normalize'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import Container from '../../components/common/Container'
import { COLOR } from '../../utils/colors'
import { fontSize } from '../../utils/fontSizes'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import { baseAxios } from '../../hooks/requests'
import { SEND_CODE } from '../../urls'
import ServerError from '../../components/common/ServerError'

export default function ForgotYourPassword({ route }) {
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const navigation = useNavigation()
    const { phoneNumber } = route.params

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{9}$/, 'Telefon raqamingiz formati xato')
            .required('Majburiy maydon'),
    })

    async function onSubmit() {
        try {
            setLoading(true)
            await baseAxios.post(SEND_CODE, {
                countryCode: '998',
                phoneNumber,
                forgotPasswordScreen: true,
            })
            navigation.navigate('CheckConfirmationCode', { phoneNumber, forgotPasswordScreen: true })
        } catch (error) {
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <Text style={styles.title}>Parolni qayta tiklash</Text>
                <Text style={styles.subTitle}>
                    Akkauntingiz parolini qayta tiklash uchun telefon raqamingizni kiriting.
                    Telefon raqamingizga 5 xonali tasdiqlash kodi yuboriladi.
                </Text>

                <Formik
                    initialValues={{ phoneNumber: phoneNumber }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                        <>
                            <Input
                                name="phoneNumber"
                                keyboardType="numeric"
                                placeholder="90 635 10 01" />

                            <ServerError error={serverError} />

                            <View style={styles.bottomWrapper}>
                                <Button title="Davom etish" onPress={handleSubmit} loading={loading} />
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
        marginBottom: 20,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    bottomWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
})