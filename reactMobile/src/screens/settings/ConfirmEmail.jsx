import React from 'react'
import { Keyboard, View, StyleSheet, Text } from 'react-native'
import { Formik } from 'formik'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import Input from '../../components/common/Input'
import ServerError from '../../components/common/ServerError'
import Button from '../../components/common/Button'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import { COLOR } from '../../utils/colors'
import { fontSize } from '../../utils/fontSizes'

export default function ConfirmEmail() {
    return (
        <KeyboardAvoiding>
            <Container>
                <Text style={styles.title}>Email</Text>
                <Text style={styles.subTitle}>
                    Tasdiqlangan elektron pochta, akkauntingizni himoyalashga yordam beradi.
                </Text>
                <Formik initialValues={{ email: '' }} validationSchema={null} onSubmit={null}>
                    {({ handleSubmit }) => (
                        <>
                            <View style={{ flex: 1 }}>
                                <Input
                                    name="email"
                                    keyboardType="email-address"
                                    placeholder="sovchi@gmail.com" />

                                <ServerError error={null} style={styles.serverError} />
                            </View>

                            <View style={styles.buttonWrapper}>
                                <Button title="Davom etish" buttonStyle={styles.button} loading={null} onPress={() => {
                                    handleSubmit()
                                    Keyboard.dismiss()
                                }} />
                            </View>
                        </>
                    )}
                </Formik>

            </Container>
        </KeyboardAvoiding>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(28),
        fontWeight: '500',
        marginBottom: 2,
    },
    subTitle: {
        fontSize: fontSize.small,
        marginBottom: 22,
        color: COLOR.grey,
        lineHeight: 20,
    },
})
