import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import normalize from 'react-native-normalize'
import moment from 'moment'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Button from '../../components/common/Button'
import Container from '../../components/common/Container'
import { COLOR } from '../../utils/colors'
import { fontSize } from '../../utils/fontSizes'
import ValidationError from '../../components/common/ValidationError'

export default function SetBirthDate({ route }) {
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(new Date())
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [validationError, setValidationError] = useState('')
    const navigation = useNavigation()
    const { phoneNumber, password, name } = route.params

    const birthdate = moment(date).format('D MMMM, YYYY')
    const age = new Date().getFullYear() - date.getFullYear()

    async function onSubmit() {
        if (age >= 18) {
            await setLoading(true)
            setValidationError('')
            navigation.navigate('SetGender', {
                phoneNumber,
                password,
                name,
                birthdate: moment(date).format('YYYY-MM-DD'),
            })
        } else if (age <= 17) {
            setValidationError("Yoshingiz 17 dan katta bo'lishi lozim")
        }
        setLoading(false)
    }

    return (
        <Container>
            <View style={{ flex: 1 }}>
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
                    <ValidationError validationError={validationError} />
                </View>
            </View>

            <View style={styles.buttonWrapper}>
                <Button
                    title="Davom etish"
                    onPress={onSubmit}
                    buttonStyle={styles.button}
                    loading={loading} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(28),
        fontWeight: '600',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 20,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    date: {
        width: '100%',
        height: 52,
        justifyContent: 'center',
        backgroundColor: COLOR.extraLightGrey,
        paddingHorizontal: 18,
        borderRadius: 12,
    },
    dateTitle: {
        fontSize: normalize(28),
        color: COLOR.grey,
    },
    validationError: {
        color: COLOR.primary,
        marginTop: 8,
    },
    datePicker: {
        height: normalize(220),
        width: '100%',
        backgroundColor: COLOR.white,
        borderRadius: 15,
    },
})
