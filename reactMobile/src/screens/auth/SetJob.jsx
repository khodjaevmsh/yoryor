import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import { COLOR } from '../../utils/colors'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import { fontSize } from '../../utils/fontSizes'
import ValidationError from '../../components/common/ValidationError'

export default function SetJob({ route }) {
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState('')
    const navigation = useNavigation()
    const { phoneNumber, password, name, birthdate, gender, region, education } = route.params

    async function onSubmit(data) {
        setLoading(true)
        setValidationError('')

        if (!data.jobTitle || !data.jobCompany) {
            setValidationError("Barcha maydonlarni to'ldirish majburiy")
            setLoading(false)
            return
        }

        navigation.navigate('SetGoal', {
            phoneNumber,
            password,
            name,
            birthdate,
            gender,
            region,
            education,
            job: {
                title: data.jobTitle,
                company: data.jobCompany,
            },
        })

        setLoading(false)
    }

    return (
        <KeyboardAvoiding>
            <Container>

                <Text style={styles.title}>Lavozim va ish joyingiz</Text>
                <Text style={styles.subTitle}>
                    Foydalanuvchilarga kim bo'lib ishlashingiz va qayerda ishlashingiz haqida ma'lumot bering.
                </Text>
                <Formik
                    initialValues={{ jobTitle: '', jobCompany: '' }}
                    validationSchema={null}
                    onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                        <View style={styles.inputWrapper}>
                            <Input
                                name="jobTitle"
                                keyboardType="default"
                                placeholder="Prokuror" />
                            <Input
                                name="jobCompany"
                                keyboardType="default"
                                placeholder="Toshkent shahar prokuraturasi"
                                inputWrapperStyle={{ marginTop: 12, marginBottom: 12 }} />

                            <ValidationError validationError={validationError} />

                            <View style={styles.buttonWrapper}>
                                <Button
                                    title="Davom etish"
                                    onPress={handleSubmit}
                                    buttonStyle={styles.button}
                                    loading={loading} />
                            </View>
                        </View>
                    )}
                </Formik>
            </Container>
        </KeyboardAvoiding>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(26),
        fontWeight: '600',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 15,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    inputWrapper: {
        flex: 1,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
