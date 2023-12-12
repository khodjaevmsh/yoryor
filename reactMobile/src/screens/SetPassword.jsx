import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import { X } from 'react-native-feather'
import normalize from 'react-native-normalize'
import Container from '../components/common/Container'
import Input from '../components/common/Input'
import ServerError from '../components/common/ServerError'
import Button from '../components/common/Button'
import { COLOR } from '../utils/colors'
import { usePostRequest } from '../hooks/requests'
import { SET_PASSWORD } from '../urls'
import { fontSize } from '../utils/fontSizes'
import Modal from '../components/Modal'

export default function SetPassword({ route }) {
    const [serverError, setServerError] = useState()
    const [isModalVisible, setModalVisible] = useState(false)
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
            // navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] })
            setModalVisible(true)
        }

        if (error) {
            setServerError(error)
        }
    }

    function toggleModal() {
        setModalVisible(!isModalVisible)
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

                <Button onPress={toggleModal} />

                <Modal
                    style={{ backgroundColor: 'white', paddingTop: 42, paddingBottom: 25 }}
                    isModalVisible={isModalVisible}
                    animationIn="slideInUp"
                    coverScreen
                    hasBackdrop
                    backdropColor="white"
                    backdropOpacity={1}
                    animationOut="slideOutDown">

                    <View style={{ flex: 2 }}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <X width={34} height={34} color={COLOR.grey} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.welcome}>Welcome to sovcHi.</Text>
                            <Text style={styles.please}>Iltimos ushbu qoidalarga rioya qiling.</Text>
                        </View>
                    </View>

                    <View style={{ flex: 5 }}>
                        <View style={styles.rules}>
                            <Text style={styles.modalTitle}>Be yourself.</Text>
                            <Text style={styles.modalSubTitle}>
                                Rasmlaringiz, yoshingiz hamda qolgan ma'lumotlaringiz to'g'ri ekanligiga ishonch hosil
                                qiling.
                            </Text>
                        </View>

                        <View style={styles.rules}>
                            <Text style={styles.modalTitle}>Play cool.</Text>
                            <Text style={styles.modalSubTitle}>
                                Ishtirokchilarni hurmat qiling, barchasi hurmatdan boshlanadi.
                            </Text>
                        </View>

                        <View style={styles.rules}>
                            <Text style={styles.modalTitle}>Be proactive.</Text>
                            <Text style={styles.modalSubTitle}>
                                Shubxali xatti-harakatlar to'g'risida Bizga xabar bering.
                            </Text>
                        </View>

                    </View>

                    <View style={{ flex: 1 }}>
                        <Button title="Roziman" onPress={toggleModal} />
                    </View>

                </Modal>
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
    welcome: {
        fontSize: normalize(32),
        fontWeight: '600',
        marginTop: 22,
    },
    please: {
        fontSize: fontSize.medium,
        color: COLOR.grey,
        marginTop: 7,
    },
    rules: {
        marginBottom: 28,
    },
    modalTitle: {
        fontSize: fontSize.large,
        fontWeight: '500',
    },
    modalSubTitle: {
        fontSize: fontSize.medium,
        color: COLOR.grey,
        marginTop: 5,
        lineHeight: 21,
    },
})
