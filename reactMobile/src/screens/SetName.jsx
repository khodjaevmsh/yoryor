import { StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'

export default function SetName({ route }) {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { phoneNumber, password } = route.params

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[a-zA-Z\s]*$/, 'Faqat harflardan iborat bo\'lishi lozim')
            .min(4, 'Ismingiz kamida 4 ta harfdan iborat bo\'lishi kerak')
            .required('Majburiy maydon'),
    })

    async function onSubmit(data) {
        if (data.name.length >= 4) {
            setLoading(true)
            navigation.navigate('SetBirthDate', { phoneNumber, password, name: data.name })
        }
        setLoading(false)
    }

    return (
        <Container>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Ismingiz</Text>
                <Text style={styles.subTitle}>
                    Ismingizni kiriting. Familiyani kiritish xoxishiy!
                    Keyinchalik ismingizni o'zgartirish imkoni bo'lmaydi!
                </Text>

                <Formik
                    initialValues={{ name: 'Timur' }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                        <>
                            <Input name="name" keyboardType="default" placeholder="Maksudbek" />

                            <View style={styles.buttonWrapper}>
                                <Button
                                    title="Davom etish"
                                    onPress={handleSubmit}
                                    buttonStyle={styles.button}
                                    loading={loading} />
                            </View>
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
