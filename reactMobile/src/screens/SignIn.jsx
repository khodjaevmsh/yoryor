import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Formik } from 'formik'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import Container from '../components/common/Container'
import Input from '../components/common/Input'
import ServerError from '../components/common/ServerError'
import Button from '../components/common/Button'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import KeyboardAvoiding from '../components/common/KeyboardAvoiding'
import SecureTextEntryIcon from '../components/common/SecureTextEntryIcon'

export default function SignIn({ route }) {
    const [serverError, setServerError] = useState()
    const [secureTextEntry, setSecureTextEntry] = useState(false)
    const navigation = useNavigation()

    return (
        <KeyboardAvoiding>
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
                        {({ handleSubmit }) => (
                            <>
                                <Input
                                    name="phoneNumber"
                                    keyboardType="default"
                                    placeholder="+9989 90 635 10 01" />

                                <Input
                                    name="password"
                                    keyboardType="default"
                                    placeholder="Parol"
                                    secureTextEntry={secureTextEntry}
                                    right={(
                                        <SecureTextEntryIcon
                                            secureTextEntry={secureTextEntry}
                                            setSecureTextEntry={() => setSecureTextEntry(!secureTextEntry)} />
                                    )}
                                    rightStyle={{ bottom: normalize(14) }}
                                    inputStyle={{ marginTop: 18 }} />
                                <ServerError error={serverError} />

                                <View style={styles.buttonWrapper}>
                                    <Button title="Davom etish" onPress={handleSubmit} loading={null} />
                                </View>
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
        fontSize: fontSize.small,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
