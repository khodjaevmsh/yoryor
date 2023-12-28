import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import normalize from 'react-native-normalize'
import moment from 'moment'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import Modal from '../components/Modal'
import ButtonOutline from '../components/common/ButtonOutline'

export default function SetBirthDate({ route }) {
    const [loading, setLoading] = useState(false)
    const [birthdate, setBirthDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [validationError, setValidationError] = useState('')
    const navigation = useNavigation()
    const { phoneNumber, password, name } = route.params

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

                <Modal
                    isModalVisible={showDatePicker}
                    styleModal={styles.styleModal}
                    onBackdropPress={() => setShowDatePicker(false)}
                    styleChildren={styles.styleChildren}>
                    <View style={{ flex: 2 }}>
                        <RNDateTimePicker
                            value={birthdate}
                            mode="date"
                            display="spinner"
                            onChange={(event, d) => setBirthDate(new Date(d))}
                            maximumDate={new Date()}
                            minimumDate={new Date(1945, 1, 1)} />
                    </View>

                    <View style={{ flex: 1 }}>
                        <ButtonOutline title="Tasdiqlash" onPress={() => setShowDatePicker(!showDatePicker)} />
                    </View>
                </Modal>
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
    styleModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    styleChildren: {
        height: '38%',
        backgroundColor: COLOR.white,
        paddingHorizontal: 24,
    },
    datePicker: {
        width: 300,
        marginTop: 20,
    },
})
