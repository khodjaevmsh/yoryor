import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import Input from '../components/common/Input'
import ServerError from '../components/common/ServerError'
import Button from '../components/common/Button'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'

export default function SignIn({ route }) {
    const [serverError, setServerError] = useState()
    const navigation = useNavigation()

    return (
        <Container>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Kirish</Text>
                <Text style={styles.subTitle}>
                    Iltimos, akkauntingizga kirish uchun telefon raqamingiz va parolingizni kiriting.
                </Text>

                <Formik
                    initialValues={{ phoneNumber: '', password: '' }}
                    validationSchema={null}
                    onSubmit={null}>
                    {({ handleSubmit, setFieldValue, form, field }) => (
                        <>
                            <Input
                                name="phoneNumber"
                                keyboardType="default"
                                placeholder="+9989 90 635 10 01" />

                            <Input
                                name="password"
                                keyboardType="default"
                                placeholder="Parol"
                                inputStyle={{ marginTop: 18 }} />
                            <ServerError error={serverError} />

                            <Button
                                title="Davom etish"
                                onPress={handleSubmit}
                                buttonStyle={styles.button}
                                loading={null} />
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
