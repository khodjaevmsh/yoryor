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
import { fontSize } from '../../utils/fontSizes'

export default function Job({ route }) {
    const { props } = route.params
    const [loading, setLoading] = useState(false)
    const { profile } = useContext(GlobalContext)
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
                showToast('success', 'Woohoo!', 'Ish joyingiz o\'zgartirildi')
            }
        } catch (error) {
            console.log(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Lavozim va ish joyingiz</Text>
                    <Text style={styles.subTitle}>
                        Foydalanuvchilarga kim bo'lib ishlashingiz va qayerda ishlashingiz haqida ma'lumot bering.
                    </Text>
                    <Formik
                        initialValues={{ jobTitle: props.job?.jobTitle || '', jobCompany: props.job?.jobCompany || '' }}
                        validationSchema={null}
                        onSubmit={onSubmit}>
                        {({ handleSubmit }) => (
                            <View style={styles.inputWrapper}>
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
        fontSize: normalize(26),
        fontWeight: '600',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 8,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    inputWrapper: {
        flex: 1,
        marginTop: 18,
    },
    input: {
        marginVertical: 8,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
