import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'
import { ChevronLeft } from 'react-native-feather'
import normalize from 'react-native-normalize/src/index'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import { COLOR } from '../../utils/colors'
import { fontSize } from '../../utils/fontSizes'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import ConfirmModal from '../../components/ConfirmModal'

export default function SetName({ route }) {
    const [loading, setLoading] = useState(false)
    const [isModalConfirm, setModalConfirm] = useState(false)
    const navigation = useNavigation()
    const { phoneNumber, password } = route.params

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[a-zA-Z\s]*$/, "Faqat harflardan iborat bo'lishi lozim")
            .min(4, "Ismingiz kamida 4 ta harfdan iborat bo'lishi kerak")
            .max(28, 'Ismingiz 20 ta harfdan oshmasligi kerak')
            .required('Majburiy maydon'),
    })

    async function onSubmit(data) {
        setLoading(true)
        if (data.name.length >= 4) {
            navigation.navigate('SetBirthDate', { phoneNumber, password, name: data.name })
        }
        setLoading(false)
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <Text style={styles.title}>Ismingiz</Text>
                <Text style={styles.subTitle}>
                    Ismingizni kiriting.
                    Keyinchalik ismingizni o'zgartirish imkoniyati bo'lmaydi!
                </Text>
                <Formik
                    initialValues={{ name: '' }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                        <>
                            <Input name="name" keyboardType="default" placeholder="Maksudbek" />

                            <View style={styles.bottomWrapper}>
                                <Button
                                    title="Davom etish"
                                    onPress={handleSubmit}
                                    buttonStyle={styles.button}
                                    loading={loading} />
                            </View>
                        </>
                    )}
                </Formik>
                <ConfirmModal
                    title="Bekor qilmoqchimisiz?"
                    subTitle="Diqqat, siz kiritgan ma'lumotlarning barchasi bekor bo'ladi!"
                    cancelTitle="Bekor qilish"
                    isModalConfirm={isModalConfirm}
                    setModalConfirm={setModalConfirm}
                    cancel={() => navigation.navigate('Splash')} />
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
        marginBottom: 10,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    bottomWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
