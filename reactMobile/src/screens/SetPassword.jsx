import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import Input from '../components/common/Input'
import ServerError from '../components/common/ServerError'
import Button from '../components/common/Button'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import AgreementModal from '../components/AgreementModal'

export default function CheckConfirmationCode({ route }) {
    const [serverError, setServerError] = useState()
    const [loading, setLoading] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const { phoneNumber } = route.params
    const navigation = useNavigation()

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Majburiy maydon')
            .min(8, 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Parol kamida bitta katta harf, bitta kichik harf, bitta son va bitta maxsus belgidan iborat bo\'lishi kerak',
            ),
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
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Parol</Text>
                <Text style={styles.subTitle}>
                    Iltimos, akkauntingiz uchun parol o'ylab toping.
                    Parolingiz 8 tadan ortiq harflardan va sonlardan iborat bo'lishi lozim!
                </Text>

                <Formik
                    initialValues={{ password: 'helloWorld1001$', password2: 'helloWorld1001$' }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
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
