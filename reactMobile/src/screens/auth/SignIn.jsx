import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import * as Yup from 'yup'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import ServerError from '../../components/common/ServerError'
import Button from '../../components/common/Button'
import { COLOR } from '../../utils/colors'
import { fontSize } from '../../utils/fontSizes'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import SecureTextEntryIcon from '../../components/common/SecureTextEntryIcon'
import { baseAxios } from '../../hooks/requests'
import { SIGN_IN } from '../../urls'
import { GlobalContext } from '../../context/GlobalContext'
import { getToken } from '../../hooks/usePushNotification'

export default function SignIn() {
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState()
    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const { auth } = useContext(GlobalContext)
    const navigation = useNavigation()

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^\+?[0-9]{12}$/, 'Raqamingiz 12 ta raqamdan iborat bo\'lishi kerak')
            .required('Majburiy maydon'),
        password: Yup.string()
            .required('Majburiy maydon'),
    })

    async function onSubmit(data) {
        try {
            setLoading(true)
            const response = await baseAxios.post(SIGN_IN, {
                phoneNumber: data.phoneNumber,
                password: data.password,
            })
            auth(response.data.token, response.data.user, response.data.profile)
            navigation.reset({ index: 0, routes: [{ name: 'TabScreen' }] })
            navigation.navigate('TabScreen')
            await getToken()
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
                    <Text style={styles.title}>Kirish</Text>
                    <Text style={styles.subTitle}>
                        Iltimos, akkauntingizga kirish uchun telefon raqamingiz va parolingizni kiriting.
                    </Text>

                    <Formik
                        initialValues={{ phoneNumber: '998906351010', password: 'helloWorld1001$' }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                        {({ handleSubmit }) => (
                            <>
                                <Input
                                    name="phoneNumber"
                                    keyboardType="numeric"
                                    placeholder="+9989 90 635 10 01" />

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
                                    rightStyle={{ bottom: normalize(14) }}
                                    inputStyle={{ marginTop: 18 }} />
                                <ServerError error={serverError} />

                                <View style={styles.buttonWrapper}>
                                    <Button title="Davom etish" onPress={handleSubmit} loading={loading} />
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
        fontSize: fontSize.small,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
