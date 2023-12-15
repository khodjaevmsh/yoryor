import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CodeField, useBlurOnFulfill, useClearByFocusCell, Cursor } from 'react-native-confirmation-code-field'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import { COLOR } from '../utils/colors'
import Button from '../components/common/Button'
import { baseAxios } from '../hooks/requests'
import { CONFIRM_CODE } from '../urls'
import ServerError from '../components/common/ServerError'
import { fontSize } from '../utils/fontSizes'

export default function CheckConfirmationCode({ route }) {
    const [value, setValue] = useState('')
    const [validationError, setValidationError] = useState('')
    const [serverError, setServerError] = useState()
    const [loading, setLoading] = useState(false)
    const ref = useBlurOnFulfill({ value, cellCount: 6 })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue })
    const { phoneNumber } = route.params
    const navigation = useNavigation()

    async function onSubmit() {
        setValidationError('')

        if (!value && value.length > 0) {
            setValidationError('Majburiy maydon')
        } else if (value.length !== 6) {
            setValidationError('Tasdiqlash kodi 6 ta raqamdan iborat bo\'lishi kerak')
        } else {
            try {
                setLoading(true)
                await baseAxios.post(CONFIRM_CODE, {
                    phoneNumber,
                    confirmationCode: value,
                })
                navigation.navigate('SetPassword', { phoneNumber })
            } catch (error) {
                setServerError(error.response)
            } finally {
                setLoading(false)
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
                <ServerError error={serverError} style={{ position: 'absolute' }} />
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
                    loading={loading} />
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
        marginTop: 48,
        justifyContent: 'space-between',
        paddingHorizontal: 2,
    },
    cell: {
        width: 48,
        height: 42,
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: COLOR.grey,

    },
    cellText: {
        lineHeight: 32,
        fontSize: normalize(32),
        textAlign: 'center',
    },
    focusCell: {
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: COLOR.primary,
    },
    validationError: {
        color: COLOR.primary,
        marginTop: 3,
    },
    button: {
        marginTop: 55,
    },
})
