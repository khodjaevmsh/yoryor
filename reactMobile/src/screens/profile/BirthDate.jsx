import React, { useContext, useState } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import Container from '../../components/common/Container'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import { baseAxios } from '../../hooks/requests'
import { PROFILE } from '../../urls'
import Button from '../../components/common/Button'
import { GlobalContext } from '../../context/GlobalContext'
import { showToast } from '../../components/common/Toast'

export default function BirthDate({ route }) {
    const { props } = route.params
    const { profile } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState('')
    const [date, setDate] = useState(new Date(profile.birthdate))
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const navigation = useNavigation()

    const birthdate = moment(date).format('D MMMM, YYYY')
    const ageCheck = new Date().getFullYear() - date.getFullYear()

    async function onSubmit() {
        if (ageCheck >= 18) {
            try {
                setLoading(true)
                await baseAxios.put(PROFILE.replace('{id}', profile.id), {
                    birthdate: moment(date).format('YYYY-MM-DD'),
                })
                if (props.value !== birthdate) {
                    showToast('success', 'Woohoo!', 'Tug\'ilgan yil o\'zgartirildi')
                }
                navigation.goBack()
            } catch (error) {
                console.log(error.response)
            } finally {
                setLoading(false)
            }
        } else if (ageCheck <= 17) {
            setValidationError('* Yoshingiz 18 dan katta bo\'lishi kerak')
        }
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <Text style={styles.title}>Tug'ilgan kuningiz?</Text>
                <Text style={styles.subTitle}>
                    Foydalanuvchilarga Siznining yoshingiz ko'rsatiladi, tug'ilgan kuningiz emas!
                </Text>

                {Platform.OS === 'android' ? (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setDatePickerVisibility(true)}
                        style={styles.date}>
                        <Text style={styles.dateTitle}>{birthdate}</Text>
                    </TouchableOpacity>
                ) : null}

                <View style={styles.datePicker}>
                    {Platform.OS === 'ios' ? (
                        <RNDateTimePicker
                            value={date}
                            mode="date"
                            display="spinner"
                            onChange={async (event, d) => setDate(new Date(d))}
                            maximumDate={new Date()}
                            minimumDate={new Date(1945, 1, 1)} />
                    ) : (
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            display="compact"
                            onChange={(d) => setDate(new Date(d))}
                            maximumDate={new Date()}
                            minimumDate={new Date(1945, 1, 1)}
                            onConfirm={(d) => {
                                setDate(d)
                                setDatePickerVisibility(false)
                            }}
                            onCancel={() => setDatePickerVisibility(false)} />
                    )}
                    {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}
                </View>

                <View style={styles.buttonWrapper}>
                    <Button title="Qo'shish" onPress={onSubmit} loading={loading} />
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
    datePicker: {
        height: normalize(220),
        width: '100%',
        backgroundColor: COLOR.white,
        borderRadius: 15,
        marginTop: 22,
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
