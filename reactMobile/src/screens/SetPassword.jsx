import React, { useContext, useState } from 'react'
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
import { GlobalContext } from '../context/GlobalContext'
import { SIGN_UP } from '../urls'
import { baseAxios } from '../hooks/requests'
import AgreementModal from '../components/AgreementModal'

export default function CheckConfirmationCode({ route }) {
    const [serverError, setServerError] = useState()
    const [loading, setLoading] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation()
    const { phoneNumber } = route.params
    const { auth } = useContext(GlobalContext)

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

    async function onSubmit(data) {
        try {
            // Код, который может вызвать исключение
            setLoading(true)
            const response = await baseAxios.post(SIGN_UP, { phoneNumber, password: data.password2 })
            await auth(response.data.token, response.data.user)
            setModalVisible(false)
            setServerError(null)
            setModalVisible(false)
            navigation.navigate('SetName')
        } catch (error) {
            // Обработка ошибки
            setServerError(error.response)
        } finally {
            // Код, который выполнится в любом случае
            setLoading(false)
        }
    }

    function nextAction() {
        setModalVisible(true)
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
                    initialValues={{ password: 'Hello1001$', password2: 'Hello1001$' }}
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

                            <ServerError error={serverError} style={{ position: 'absolute' }} />

                            <Button title="Davom etish"
                                onPress={nextAction}
                                buttonStyle={styles.button}
                                loading={loading} />

                            <AgreementModal isModalVisible={isModalVisible} handleSubmit={handleSubmit} />
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
        fontSize: fontSize.small,
    },
    button: {
        marginTop: 55,
    },
})
