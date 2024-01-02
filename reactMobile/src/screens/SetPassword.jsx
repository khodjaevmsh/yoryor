import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import Container from '../components/common/Container'
import Input from '../components/common/Input'
import ServerError from '../components/common/ServerError'
import Button from '../components/common/Button'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import AgreementModal from '../components/AgreementModal'
import KeyboardAvoiding from '../components/common/KeyboardAvoiding'
import SecureTextEntryIcon from '../components/common/SecureTextEntryIcon'

export default function CheckConfirmationCode({ route }) {
    const [serverError, setServerError] = useState()
    const [loading, setLoading] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState(false)
    const [secureTextEntrySecond, setSecureTextEntrySecond] = useState(false)
    const { phoneNumber } = route.params

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Majburiy maydon')
            .min(8, 'Parol kamida 8 tadan iborat bo\'lishi kerak'),
        password2: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Parollar bir xil bo\'lishi kerak')
            .required('Parolni tasdiqlash talab qilinadi'),
    })

    function onSubmit(data) {
        if (data.password === data.password2) {
            setLoading(true)
            setModalVisible(true)
        }
        setLoading(false)
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <View>
                    <Text style={styles.title}>Parol</Text>
                    <Text style={styles.subTitle}>
                        Iltimos, akkauntingiz uchun parol o'ylab toping.
                        Parolingiz 8 tadan ortiq harflardan va sonlardan iborat bo'lishi lozim!
                    </Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Formik
                        initialValues={{ password: 'helloWorld1001$', password2: 'helloWorld1001$' }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                        {({ handleSubmit, errors }) => (
                            <>
                                <Input
                                    name="password"
                                    keyboardType="default"
                                    right={(
                                        <SecureTextEntryIcon
                                            secureTextEntry={secureTextEntry}
                                            setSecureTextEntry={() => setSecureTextEntry(!secureTextEntry)} />
                                    )}
                                    rightStyle={{ bottom: normalize(14) }}
                                    secureTextEntry={secureTextEntry}
                                    placeholder="Parol" />

                                <Input
                                    name="password2"
                                    keyboardType="default"
                                    placeholder="Parolni tasdiqlang"
                                    right={(
                                        <SecureTextEntryIcon
                                            secureTextEntry={secureTextEntrySecond}
                                            /* eslint-disable-next-line max-len */
                                            setSecureTextEntry={() => setSecureTextEntrySecond(!secureTextEntrySecond)} />
                                    )}
                                    rightStyle={{ bottom: normalize(14) }}
                                    secureTextEntry={secureTextEntrySecond}
                                    inputStyle={{ marginTop: errors.password ? 13 : 18 }} />

                                <ServerError error={serverError} />

                                <View style={styles.buttonWrapper}>
                                    <Button title="Davom etish"
                                        onPress={handleSubmit}
                                        buttonStyle={styles.button}
                                        loading={loading} />
                                </View>

                                <AgreementModal
                                    isModalVisible={isModalVisible}
                                    setModalVisible={setModalVisible}
                                    phoneNumber={phoneNumber}
                                    setServerError={setServerError} />
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
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
