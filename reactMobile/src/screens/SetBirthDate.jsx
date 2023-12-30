import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import normalize from 'react-native-normalize'
import moment from 'moment'
import RNModal from 'react-native-modal'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import ButtonOutline from '../components/common/ButtonOutline'

export default function SetBirthDate({ route }) {
    const [loading, setLoading] = useState(false)
    const [birthdate, setBirthDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [validationError, setValidationError] = useState('')
    const navigation = useNavigation()
    const { phoneNumber, password, name } = route.params || ''

    // eslint-disable-next-line max-len
    const fullYear = `${birthdate.getDate()}.${(birthdate.getMonth() + 1).toString().padStart(2, '0')}.${birthdate.getFullYear()}`
    const ageCheck = new Date().getFullYear() - birthdate.getFullYear()

    async function onSubmit() {
        if (ageCheck >= 18) {
            await setLoading(true)
            setValidationError('')
            navigation.navigate('SetGender', {
                phoneNumber,
                password,
                name,
                birthdate: moment(birthdate).format('YYYY-MM-DD'),
            })
        } else if (ageCheck <= 17) {
            setValidationError('Yoshingiz 18 dan katta bo\'lishi kerak')
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

                <TouchableOpacity activeOpacity={0.7} onPress={() => setShowDatePicker(true)} style={styles.date}>
                    <Text style={styles.dateTitle}>{fullYear}</Text>
                </TouchableOpacity>
                {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}

                <RNModal
                    isVisible={showDatePicker}
                    style={styles.modal}
                    animationOutTiming={350}
                    backdropTransitionOutTiming={0}
                    hasBackdrop
                    onBackdropPress={() => setShowDatePicker(false)}>

                    <View style={styles.datePicker}>
                        <RNDateTimePicker
                            value={birthdate}
                            mode="date"
                            display="spinner"
                            style={{ flex: 3 }}
                            onChange={async (event, d) => setBirthDate(new Date(d))}
                            maximumDate={new Date()}
                            minimumDate={new Date(1945, 1, 1)} />

                        <View style={{ flex: 1 }}>
                            <ButtonOutline title="Tasdiqlash" onPress={() => setShowDatePicker(!showDatePicker)} />
                        </View>
                    </View>
                </RNModal>
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
        fontSize: fontSize.extraLarge,
        fontWeight: '500',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 30,
        lineHeight: 19.5,
        fontSize: fontSize.small,
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
    modal: {
        height: normalize(400),
        justifyContent: 'flex-end',
        margin: 0,
    },
    datePicker: {
        height: normalize(325),
        width: '100%',
        backgroundColor: COLOR.white,
        paddingHorizontal: 20,
        paddingVertical: 0,
        borderRadius: 15,
        // marginTop: 20,
    },
})
