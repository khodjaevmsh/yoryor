import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import Input from '../components/common/Input'
import ServerError from '../components/common/ServerError'
import Button from '../components/common/Button'
import { COLOR } from '../utils/colors'
import { usePostRequest } from '../hooks/requests'
import { SET_PASSWORD } from '../urls'
import { fontSize } from '../utils/fontSizes'

export default function SetPassword({ route }) {
    const [serverError, setServerError] = useState()
    const setPassword = usePostRequest({ url: SET_PASSWORD })
    const navigation = useNavigation()
    const { phoneNumber } = route.params

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Majburiy maydon')
            .min(8, 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Parol kamida bitta katta harf, bitta kichik harf, bitta raqam va bitta maxsus belgidan iborat bo\'lishi kerak',
            ),
        password2: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Parollar bir xil bo\'lishi kerak')
            .required('Parolni tasdiqlash talab qilinadi'),
    })

    async function onSubmit(data) {
        const { success, error } = await setPassword.request({ data: {
            phoneNumber,
            ...data,
        } })

        if (success) {
            navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] })
            navigation.navigate('SignIn', { phone: phoneNumber })
        }

        if (error) {
            setServerError(error)
        }
    }

    return (
        <Container>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Parol</Text>
                <Text style={styles.subTitle}>
                    Iltimos, akkauntingiz uchun parol o'ylab toping.
                    Parolingiz 8 tadan ortiq harflardan va sonlardan iborat bo'lishi lozim!
                </Text>

                <Formik
                    initialValues={{ password: 'helloWorld1001$', password2: '' }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ handleSubmit, setFieldValue, form, field }) => (
                        <>
                            <Input
                                name="password"
                                keyboardType="default"
                                placeholder="Parol" />

                            <Input
                                name="password2"
                                keyboardType="default"
                                placeholder="Parolni tasdiqlang"
                                inputStyle={{ marginTop: 18 }} />

                            <ServerError error={serverError} />

                            <Button title="Davom etish"
                                onPress={handleSubmit}
                                buttonStyle={styles.button}
                                loading={setPassword.loading} />
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
        fontSize: fontSize.small,
    },
    button: {
        marginTop: 55,
    },
})
