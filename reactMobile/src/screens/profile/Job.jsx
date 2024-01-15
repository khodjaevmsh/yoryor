import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import { COLOR } from '../../utils/colors'
import { baseAxios } from '../../hooks/requests'
import { PROFILE } from '../../urls'
import Button from '../../components/common/Button'
import { GlobalContext } from '../../context/GlobalContext'
import Input from '../../components/common/Input'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import { showToast } from '../../components/common/Toast'

export default function Job({ route }) {
    const { props } = route.params
    const [loading, setLoading] = useState(false)
    const [, setServerError] = useState('')
    const [validationError, setValidationError] = useState('')
    const { profile, setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    async function onSubmit(data) {
        try {
            setLoading(true)
            await baseAxios.put(PROFILE.replace('{id}', profile.id), {
                jobTitle: data.jobTitle,
                jobCompany: data.jobCompany,
            })
            navigation.goBack()
            if (props.job?.jobTitle !== data.jobTitle || props.job?.jobCompany !== data.jobCompany) {
                setRender(true)
                showToast('success', 'Muvaffaqiyatli', 'Ish joyingiz o\'zgartirildi.')
            }
        } catch (error) {
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Lavozim va tashkilot</Text>

                    <Formik
                        initialValues={{ jobTitle: props.job?.jobTitle || '', jobCompany: props.job?.jobCompany || '' }}
                        validationSchema={null}
                        onSubmit={onSubmit}>
                        {({ handleSubmit }) => (
                            <View style={{ flex: 1, marginTop: 18 }}>
                                <Input
                                    name="jobTitle"
                                    keyboardType="default"
                                    inputStyle={styles.input}
                                    placeholder="Prokuror" />

                                <Input
                                    name="jobCompany"
                                    keyboardType="default"
                                    inputStyle={styles.input}
                                    placeholder="Toshkent shahar prokuraturasi" />

                                {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}

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

                </View>
            </Container>
        </KeyboardAvoiding>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(28),
        fontWeight: '500',
    },
    input: {
        marginVertical: 8,
    },
    validationError: {
        color: COLOR.primary,
        marginTop: 8,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
