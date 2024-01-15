import React, { useState } from 'react'
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import ServerError from '../../components/common/ServerError'
import Button from '../../components/common/Button'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import { COLOR } from '../../utils/colors'
import { baseAxios } from '../../hooks/requests'
import { CHANGE_PASSWORD } from '../../urls'
import { showToast } from '../../components/common/Toast'

export default function ChangePassword() {
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .min(8, 'Parol kamida 8 tadan iborat bo\'lishi kerak'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Parollar bir xil bo\'lishi kerak'),
    })

    async function onSubmit(data) {
        if (data.oldPassword && data.newPassword && data.confirmPassword) {
            try {
                setLoading(true)
                await baseAxios.post(CHANGE_PASSWORD, {
                    oldPassword: data.oldPassword,
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword,
                })
                navigation.goBack()
                showToast('success', 'Muvaffaqiyatli', 'Yangi parol tasdiqlandi.')
            } catch (error) {
                setServerError(error.response)
            } finally {
                setLoading(false)
            }
        } else {
            navigation.goBack()
        }
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <Text style={styles.title}>Parolni yangilash</Text>
                <Formik
                    initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                        <>
                            <View style={{ flex: 1 }}>
                                <Input
                                    name="oldPassword"
                                    keyboardType="default"
                                    placeholder="sovchi@gmail.com"
                                    label="* Eski parolingiz"
                                    inputStyle={styles.input}
                                    labelStyle={{
                                        color: COLOR.grey,
                                        fontWeight: '500',
                                    }} />

                                <View style={styles.newPasswords}>
                                    <Input
                                        name="newPassword"
                                        keyboardType="default"
                                        label="* Yangi parol o'ylab toping"
                                        labelStyle={{
                                            color: COLOR.grey,
                                            fontWeight: '500',
                                        }}
                                        inputStyle={styles.input}
                                        placeholder="sovchi@gmail.com" />

                                    <Input
                                        name="confirmPassword"
                                        keyboardType="default"
                                        inputStyle={styles.input}
                                        placeholder="sovchi@gmail.com" />
                                </View>

                                <ServerError error={serverError} style={styles.serverError} />
                            </View>

                            <View style={styles.buttonWrapper}>
                                <Button
                                    title="Tasdiqlash"
                                    buttonStyle={styles.button}
                                    loading={loading}
                                    onPress={() => {
                                        handleSubmit()
                                        Keyboard.dismiss()
                                    }} />
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
        fontWeight: '500',
        marginBottom: 22,
    },
    newPasswords: {
        marginTop: 22,
    },
    input: {
        marginVertical: 8,
    },
})
