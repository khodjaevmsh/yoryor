import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import ServerError from '../../components/common/ServerError'
import Button from '../../components/common/Button'
import { COLOR } from '../../utils/colors'
import { fontSize } from '../../utils/fontSizes'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import SecureTextEntryIcon from '../../components/common/SecureTextEntryIcon'
import { baseAxios } from '../../hooks/requests'
import { FORGOT_PASSWORD } from '../../urls'
import { showToast } from '../../components/common/Toast'

export default function SetNewPassword({ route }) {
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(false)
    const [secureTextEntrySecond, setSecureTextEntrySecond] = useState(false)
    const { phoneNumber } = route.params
    const navigation = useNavigation()

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required('Majburiy maydon')
            .min(8, "Parol kamida 8 tadan iborat bo'lishi kerak"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], "Parollar bir xil bo'lishi kerak")
            .required('Parolni tasdiqlash talab qilinadi'),
    })

    async function onSubmit(data) {
        try {
            setLoading(true)
            await baseAxios.post(FORGOT_PASSWORD, {
                countryCode: '998',
                phoneNumber,
                newPassword: data.newPassword,
                confirmPassword: data.confirmPassword,
            })
            navigation.navigate('Splash')
            navigation.reset({ index: 0, routes: [{ name: 'Splash' }] })
            showToast('success', 'Woohoo!', 'Parolingiz qayta tiklandi')
        } catch (error) {
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <View>
                    <Text style={styles.title}>Parolni tiklash</Text>
                    <Text style={styles.subTitle}>
                        Akkauntingiz uchun yangi parol o'ylab toping va uni tasdiqlang.
                    </Text>
                </View>

                <Formik
                    initialValues={{ newPassword: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ handleSubmit, errors }) => (
                        <>
                            <Input
                                name="newPassword"
                                keyboardType="default"
                                right={(
                                    <SecureTextEntryIcon
                                        secureTextEntry={secureTextEntry}
                                        setSecureTextEntry={() => setSecureTextEntry(!secureTextEntry)} />
                                )}
                                secureTextEntry={secureTextEntry}
                                placeholder="Yangi parol" />

                            <Input
                                name="confirmPassword"
                                keyboardType="default"
                                placeholder="Yang parolni tasdiqlang"
                                right={(
                                    <SecureTextEntryIcon
                                        secureTextEntry={secureTextEntrySecond}
                                        setSecureTextEntry={() => setSecureTextEntrySecond(!secureTextEntrySecond)} />
                                )}
                                secureTextEntry={secureTextEntrySecond}
                                inputStyle={{ marginTop: 12 }} />

                            <ServerError error={serverError} />

                            <View style={styles.bottomWrapper}>
                                <Button title="Davom etish"
                                    onPress={handleSubmit}
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
        marginBottom: 20,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    bottomWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
