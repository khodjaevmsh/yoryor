import React, { useContext, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import { COLOR } from '../utils/colors'
import Input from '../components/common/Input'
import { usePostRequest } from '../hooks/requests'
import { SEND_VERIFICATION_CODE } from '../urls'
import ServerError from '../components/common/ServerError'

export default function SignUp() {
    const sendVerificationCode = usePostRequest({ url: SEND_VERIFICATION_CODE })
    const [serverError, setServerError] = useState()
    const navigation = useNavigation()

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{12}$/, 'Номер телефона должен состоять из 12 цифр')
            .required('Обязательное поле'),
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
                <Text style={styles.title}>Номер телефона</Text>
                <Text style={styles.subTitle}>
                    Пожалуйста, введите свой действующий номер телефона.
                    Мы вышлем вам 6-значный код для подтверждения вашей учетной записи.
                </Text>

                <Formik initialValues={{ phoneNumber: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ handleSubmit, setFieldValue, form, field }) => (
                        <>
                            <Input
                                label="Номер телефон"
                                name="phoneNumber"
                                keyboardType="numeric"
                                placeholder="+9989 90 635 10 01"
                            />
                            <ServerError error={serverError} />

                            <Button title="Продолжить" onPress={handleSubmit} buttonStyle={styles.button} />
                        </>
                    )}
                </Formik>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 36,
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
