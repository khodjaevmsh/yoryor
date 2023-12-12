import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CodeField, useBlurOnFulfill, useClearByFocusCell, Cursor } from 'react-native-confirmation-code-field'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import { COLOR } from '../utils/colors'
import Button from '../components/common/Button'
import { usePostRequest } from '../hooks/requests'
import { CONFIRM_CODE } from '../urls'
import ServerError from '../components/common/ServerError'
import { fontSize } from '../utils/fontSizes'

export default function ConfirmCode({ route }) {
    const [value, setValue] = useState('')
    const [validationError, setValidationError] = useState('')
    const [serverError, setServerError] = useState()
    const ref = useBlurOnFulfill({ value, cellCount: 6 })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue })
    const confirmCode = usePostRequest({ url: CONFIRM_CODE })
    const { phoneNumber } = route.params
    const navigation = useNavigation()

    async function onSubmit() {
        setValidationError('')

        if (!value && value.length > 0) {
            setValidationError('Majburiy maydon')
        } else if (value.length !== 6) {
            setValidationError('Tasdiqlash kodi 6 ta raqamdan iborat bo\'lishi kerak')
        } else {
            const { success, error } = await confirmCode.request({ data: {
                phoneNumber,
                confirmationCode: value,
            } })

            if (success) {
                console.log('Success')
                navigation.navigate('SetPassword', { phoneNumber })
            }

            if (error) {
                setServerError(error)
            }
        }
    }

    return (
        <Container>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={styles.title}>Tasdiqlash kodi</Text>
                <Text style={styles.subTitle}>
                    Iltimos, telefon raqamingizga yuborilgan tasdiqlash kodini kiriting.
                </Text>
                <ServerError error={serverError} />
                {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}
            </View>

            <View style={{ flex: 5 }}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={6}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <View
                            key={index}
                            onLayout={getCellOnLayoutHandler(index)}
                            style={[styles.cell, isFocused && styles.focusCell]}>
                            <Text
                                style={styles.cellText}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        </View>
                    )}
                />
                <Button
                    title="Davom etish"
                    onPress={onSubmit}
                    buttonStyle={styles.button}
                    loading={confirmCode.loading} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 38,
        fontWeight: '500',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 8,
        fontSize: fontSize.small,
    },
    codeFieldRoot: {
        marginTop: 20,
        justifyContent: 'space-around',
        paddingHorizontal: 18,
    },
    cell: {
        width: 38,
        height: 40,
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: COLOR.grey,

    },
    cellText: {
        lineHeight: 32,
        fontSize: normalize(28),
        textAlign: 'center',
    },
    focusCell: {
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: COLOR.primary,
    },
    validationError: {
        color: COLOR.primary,
    },
    button: {
        marginTop: 55,
    },
})
