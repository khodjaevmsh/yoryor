import React, { useState } from 'react'
import { Text, StyleSheet, View, Keyboard } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import { COLOR } from '../utils/colors'
import Input from '../components/common/Input'
import { baseAxios } from '../hooks/requests'
import { SEND_CODE } from '../urls'
import ServerError from '../components/common/ServerError'
import { fontSize } from '../utils/fontSizes'
import KeyboardAvoiding from '../components/common/KeyboardAvoiding'

export default function SignUp() {
    const [serverError, setServerError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{12}$/, 'Raqamingiz 12 ta raqamdan iborat bo\'lishi kerak')
            .required('Majburiy maydon'),
    })

    async function onSubmit(data) {
        try {
            setLoading(true)
            await baseAxios.post(SEND_CODE, {
                phoneNumber: data.phoneNumber,
            })
            navigation.navigate('CheckConfirmationCode', { phoneNumber: data.phoneNumber })
            setServerError(null)
        } catch (error) {
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Telefon raqamingiz</Text>
                    <Text style={styles.subTitle}>
                        Iltimos, shaxsiy telefon raqamingizni kiriting.
                        Akkauntingizni tasdiqlash uchun sizga 6 xonali kod yuboramiz.
                    </Text>

                    <Formik
                        initialValues={{ phoneNumber: '+998906351005' }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                        {({ handleSubmit, errors }) => (
                            <>
                                <View style={{ flex: 1 }}>
                                    <Input
                                        name="phoneNumber"
                                        keyboardType="numeric"
                                        placeholder="+9989 90 635 10 01" />
                                    <ServerError
                                        error={serverError}
                                        style={[styles.serverError, { marginTop: errors.phoneNumber ? 4 : 8 }]} />
                                </View>

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
                </View>
            </Container>
        </KeyboardAvoiding>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: fontSize.extraLarge,
        fontWeight: '500',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 30,
        lineHeight: 19.5,
        fontSize: fontSize.small,
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
