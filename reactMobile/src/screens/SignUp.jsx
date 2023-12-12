import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import { COLOR } from '../utils/colors'
import Input from '../components/common/Input'
import { usePostRequest } from '../hooks/requests'
import { SIGN_UP } from '../urls'
import ServerError from '../components/common/ServerError'

export default function SignUp() {
    const sendVerificationCode = usePostRequest({ url: SIGN_UP })
    const [serverError, setServerError] = useState()
    const navigation = useNavigation()

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{12}$/, 'Telefon raqami 12 ta raqamdan iborat bo\'lishi kerak')
            .required('Majburiy maydon'),
    })

    async function onSubmit(data) {
        const { success, error } = await sendVerificationCode.request({ data })

        if (success) {
            navigation.navigate('ConfirmCode', { phoneNumber: data.phoneNumber })
        }

        if (error) {
            setServerError(error)
        }
    }

    return (
        <Container>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Telefon raqamingiz</Text>
                <Text style={styles.subTitle}>
                    Iltimos, shaxsiy telefon raqamingizni kiriting.
                    Akkauntingizni tasdiqlash uchun sizga 6 xonali kod yuboramiz.
                </Text>

                <Formik initialValues={{ phoneNumber: '+99890635102' }} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ handleSubmit, setFieldValue, form, field }) => (
                        <>
                            <Input
                                label="Telefon raqam"
                                name="phoneNumber"
                                keyboardType="numeric"
                                placeholder="+9989 90 635 10 01"
                            />
                            <ServerError error={serverError} />

                            <Button title="Davom etish" onPress={handleSubmit} buttonStyle={styles.button} />
                        </>
                    )}
                </Formik>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 38,
        fontWeight: '500',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 30,
    },
    button: {
        marginTop: 55,
    },
})
