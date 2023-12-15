import { StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'
import Input from '../components/common/Input'
import ServerError from '../components/common/ServerError'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { baseAxios } from '../hooks/requests'
import { SEND_CODE, SET_NAME } from '../urls'
import { GlobalContext } from '../context/GlobalContext'

export default function SetName() {
    const [serverError, setServerError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { user } = useContext(GlobalContext)

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            // .matches(/^\+?[a-z]{5}$/, 'Ismingizni to\'liq bo\'lishi kerak')
            .required('Majburiy maydon'),
    })

    async function onSubmit(data) {
        try {
            // setLoading(true)
            await baseAxios.post(SET_NAME, {
                name: data.name,
                user: user.id,
            })
            console.log('Success')
            setServerError(null)
        } catch (error) {
            setServerError(error.response)
            console.log(error.response.data)
        } finally {
            setLoading(false)
        }
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
                    {({ handleSubmit, setFieldValue, form, field }) => (
                        <>
                            <Input
                                name="name"
                                keyboardType="default"
                                placeholder="Maksudbek" />

                            <ServerError error={serverError} style={{ marginTop: 6, position: 'absolute' }} />

                            <Button
                                title="Davom etish"
                                onPress={handleSubmit}
                                buttonStyle={styles.button}
                                loading={loading} />
                        </>
                    )}
                </Formik>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 38,
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
