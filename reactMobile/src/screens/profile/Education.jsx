import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import { baseAxios } from '../../hooks/requests'
import { PROFILE } from '../../urls'
import Button from '../../components/common/Button'
import { GlobalContext } from '../../context/GlobalContext'
import PickerSelect from '../../components/common/PickerSelect'
import Input from '../../components/common/Input'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import ServerError from '../../components/common/ServerError'
import { showToast } from '../../components/common/Toast'

const levels = [
    { value: 'high_school', label: 'O\'rta maxsus' },
    { value: 'bachelors_degree', label: 'Bakalavr' },
    { value: 'masters_degree', label: 'Magistratura' },
    { value: 'doctorate', label: 'Doktorantura' },
    { value: 'other', label: 'Boshqasi' },
]

export default function Education({ route }) {
    const { props } = route.params
    const [level, setLevel] = useState(props.education.value)
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [validationError, setValidationError] = useState('')
    const { profile, setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    async function onSubmit(data) {
        try {
            setLoading(true)
            await baseAxios.put(PROFILE.replace('{id}', profile.id), {
                educationLevel: level,
                educationSchool: data.school,
            })
            navigation.goBack()
            if (props.education.value !== level || props.value !== data.school) {
                setRender(true)
                showToast('success', 'Muvaffaqiyatli', 'Ma\'lumotingiz o\'zgartirildi.')
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
                    <Text style={styles.title}>Ma'lumotingiz darajasini tanlang ...</Text>

                    <Formik
                        initialValues={{ school: props.value || '' }}
                        validationSchema={null}
                        onSubmit={onSubmit}>
                        {({ handleSubmit }) => (
                            <View style={{ flex: 1, marginTop: 28 }}>
                                <PickerSelect
                                    placeholder={{ label: 'Javobsiz qoldirish', value: '' }}
                                    items={levels.map((item) => ({
                                        label: item.label,
                                        value: item.value,
                                    }))}
                                    value={level}
                                    onValueChange={(val) => setLevel(val)} />

                                <Input
                                    name="school"
                                    keyboardType="default"
                                    placeholder="Tashkent State University of Law" />

                                <ServerError error={serverError} style={styles.serverError} />
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
    choice: {
        width: '100%',
        height: 52,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 18,
        marginVertical: 7,
        backgroundColor: COLOR.extraLightGrey,
    },
    choiceText: {
        fontSize: fontSize.medium,
        color: COLOR.black,
        fontWeight: '500',
    },
    activeChoice: {
        backgroundColor: COLOR.lightPrimary,
    },
    radio: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderRadius: 100,
    },
    activeRadio: {
        width: 24,
        height: 24,
        borderWidth: 6,
        borderRadius: 100,
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
