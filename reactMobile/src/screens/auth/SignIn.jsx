import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import * as Yup from 'yup'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { COLOR } from '../../utils/colors'
import { fontSize } from '../../utils/fontSizes'
import SecureTextEntryIcon from '../../components/common/SecureTextEntryIcon'
import { baseAxios } from '../../hooks/requests'
import { SIGN_IN } from '../../urls'
import { GlobalContext } from '../../context/GlobalContext'
import { getToken } from '../../hooks/PushNotification'
import ServerError from '../../components/common/ServerError'
import PhoneInput from '../../components/common/PhoneInput'

export default function SignIn() {
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [callingCode, setCallingCode] = useState('998')
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const { auth } = useContext(GlobalContext)
    const navigation = useNavigation()

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^\d+$/, 'Telefon raqamingiz formati xato')
            .required('Majburiy maydon')
            .min(9, 'Telefon raqamingiz formati xato')
            .max(15, 'Telefon raqamingiz formati xato'),
        password: Yup.string()
            .required('Majburiy maydon'),
    })

    async function onSubmit(data) {
        try {
            setLoading(true)
            const response = await baseAxios.post(SIGN_IN, {
                countryCode: callingCode,
                phoneNumber: data.phoneNumber,
                password: data.password,
            })

            auth(response.data.token, response.data.user, response.data.profile)

            navigation.navigate('TabScreen')
            navigation.reset({ index: 0, routes: [{ name: 'TabScreen' }] })
            await getToken()
        } catch (error) {
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Text style={styles.title}>Kirish</Text>
            <Text style={styles.subTitle}>
                Akkauntingizga kirish uchun telefon raqamingiz va parolingizni kiriting.
            </Text>

            <Formik
                initialValues={{ phoneNumber: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ handleSubmit, values }) => (
                    <>
                        <PhoneInput
                            name="phoneNumber"
                            keyboardType="numeric"
                            placeholder="90 635 10 01"
                            setCallingCode={setCallingCode} />

                        <Input
                            name="password"
                            keyboardType="default"
                            placeholder="Parol"
                            autoCapitalize="none"
                            secureTextEntry={secureTextEntry}
                            right={(
                                <SecureTextEntryIcon
                                    secureTextEntry={secureTextEntry}
                                    setSecureTextEntry={() => setSecureTextEntry(!secureTextEntry)} />
                            )}
                            inputWrapperStyle={{ marginTop: 12 }} />

                        <ServerError error={serverError} />

                        <View style={styles.bottomWrapper}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.forgotPassWrapper}
                                onPress={() => navigation.navigate('ForgotYourPassword', {
                                    phoneNumber: values.phoneNumber,
                                })}>
                                <Text style={styles.forgotPass}>Parol esingizda emasmi?</Text>
                            </TouchableOpacity>
                            <Button title="Davom etish" onPress={handleSubmit} loading={loading} />
                        </View>
                    </>
                )}
            </Formik>
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
        marginBottom: 15,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    containerButtonStyle: {
        marginTop: 1,
        marginHorizontal: 20,
        paddingRight: 10,
        borderRightWidth: 1.5,
        borderColor: COLOR.lightGrey,
    },
    bottomWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    forgotPassWrapper: {
        marginBottom: 22,
    },
    forgotPass: {
        fontSize: normalize(12),
        color: COLOR.grey,
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
})
