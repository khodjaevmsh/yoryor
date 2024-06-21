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
import { showToast } from '../../components/common/Toast'
import { levels } from '../../utils/choices'

export default function Education({ route }) {
    const { props } = route.params
    const [level, setLevel] = useState(props.level)
    const [loading, setLoading] = useState(false)
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
            if (props.level !== level || props.school !== data.school) {
                setRender(true)
                showToast('success', 'Muvaffaqiyatli', 'Ma\'lumotingiz o\'zgartirildi.')
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
                <Text style={styles.title}>Ma'lumotingiz darajasini tanlang</Text>
                <Text style={styles.subTitle}>O'qish darajangiz va o'qish joyingizni kiriting.</Text>
                <Formik
                    initialValues={{ school: props.school || '' }}
                    onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                        <View style={styles.pickerWrapper}>
                            <PickerSelect
                                placeholder={{ label: 'Javobsiz qoldirish', value: '' }}
                                items={Object.entries(levels).map(([key, title]) => ({ label: title, value: key }))}
                                value={level}
                                onValueChange={(val) => setLevel(val)} />
                            <Input
                                name="school"
                                keyboardType="default"
                                placeholder="Tashkent State University of Law" />
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
        marginBottom: 8,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    pickerWrapper: {
        flex: 1,
        marginTop: 28,
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
