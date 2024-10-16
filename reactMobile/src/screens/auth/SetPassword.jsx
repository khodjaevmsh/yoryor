import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import ServerError from '../../components/common/ServerError'
import Button from '../../components/common/Button'
import { COLOR } from '../../utils/colors'
import { fontSize } from '../../utils/fontSizes'
import AgreementModal from '../../components/AgreementModal'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import SecureTextEntryIcon from '../../components/common/SecureTextEntryIcon'

export default function SetPassword({ route }) {
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
        <Container>
            <View>
                <Text style={styles.title}>Parol o'rnating</Text>
                <Text style={styles.subTitle}>
                    Akkauntingiz uchun yangi parol o'ylab toping va uni tasdiqlang.
                    Parolingiz 8 tadan ortiq harflardan va sonlardan iborat bo'lishi lozim!
                </Text>
            </View>
            <Formik
                initialValues={{ password: '', password2: '' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ handleSubmit }) => (
                    <>
                        <Input
                            name="password"
                            keyboardType="default"
                            right={(
                                <SecureTextEntryIcon
                                    secureTextEntry={secureTextEntry}
                                    setSecureTextEntry={() => setSecureTextEntry(!secureTextEntry)} />
                            )}
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
                            secureTextEntry={secureTextEntrySecond}
                            inputWrapperStyle={{ marginTop: 12 }} />

                        <ServerError error={serverError} />

                        <View style={styles.bottomWrapper}>
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
        marginBottom: 20,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    bottomWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
