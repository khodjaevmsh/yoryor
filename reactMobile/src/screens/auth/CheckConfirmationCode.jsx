import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CodeField, useBlurOnFulfill, useClearByFocusCell, Cursor } from 'react-native-confirmation-code-field'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../../components/common/Container'
import { COLOR } from '../../utils/colors'
import Button from '../../components/common/Button'
import { baseAxios } from '../../hooks/requests'
import { CONFIRM_CODE, SEND_CODE } from '../../urls'
import ServerError from '../../components/common/ServerError'
import { fontSize } from '../../utils/fontSizes'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import ValidationError from '../../components/common/ValidationError'
import { formatPhoneNumber } from '../../utils/string'
import Timer from '../../components/common/Timer'

export default function CheckConfirmationCode({ route }) {
    const [value, setValue] = useState('')
    const [validationError, setValidationError] = useState('')
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showTimer, setShowTimer] = useState(false)
    const { phoneNumber, forgotPasswordScreen } = route.params || {}
    const navigation = useNavigation()

    const ref = useBlurOnFulfill({ value, cellCount: 5 })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue })

    async function onResendCode() {
        try {
            setShowTimer(true)
            // setTimer(60)
            await baseAxios.post(SEND_CODE, {
                countryCode: '998',
                phoneNumber,
                forgotPasswordScreen: true,
            })
        } catch (error) {
            setServerError(error.response)
        }
    }

    async function onSubmit() {
        if (!value && value.length <= 0) {
            setValidationError('Majburiy maydon')
        } else if (value.length !== 5) {
            setValidationError("Tasdiqlash kodi 6 ta raqamdan iborat bo'lishi kerak")
        } else {
            try {
                setLoading(true)
                await baseAxios.post(CONFIRM_CODE, {
                    phoneNumber,
                    confirmationCode: value,
                })
                setValidationError('')
                setServerError('')
                navigation.navigate(forgotPasswordScreen ? 'SetNewPassword' : 'SetPassword', { phoneNumber })
            } catch (error) {
                setServerError(error.response)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <Text style={styles.title}>Tasdiqlash kodi</Text>
                <Text style={styles.subTitle}>
                    +{formatPhoneNumber(`998${phoneNumber}`)} raqamiga yuborilgan 5 xonali tasdiqlash kodini kiriting.
                </Text>

                <View style={styles.inputWrapper}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        autoFocus
                        onChangeText={setValue}
                        rootStyle={styles.rootStyle}
                        cellCount={5}
                        keyboardType="numeric"
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
                        )} />

                    <ValidationError validationError={validationError} />
                    <ServerError error={serverError} />
                </View>

                <View style={styles.bottomWrapper}>
                    <TouchableOpacity
                        disabled={showTimer}
                        style={styles.forgotPassWrapper}
                        onPress={onResendCode}>
                        {showTimer ? (
                            <Timer setShowTimer={setShowTimer} duration={60} />
                        ) : (
                            <Text style={styles.forgotPass}>Tasdiqlash kodini qayta yuborish</Text>
                        )}
                    </TouchableOpacity>
                    <Button
                        title="Davom etish"
                        onPress={onSubmit}
                        buttonStyle={styles.button}
                        loading={loading} />
                </View>
            </Container>
        </KeyboardAvoiding>
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
    inputWrapper: {
        flex: 2,
    },
    rootStyle: {
        marginTop: 15,
        marginBottom: 18,
        marginHorizontal: 15,
    },
    cell: {
        width: normalize(45),
        height: normalize(45),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: COLOR.lightGrey,
        borderRadius: 7,
    },
    cellText: {
        fontSize: normalize(22),
    },
    focusCell: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: COLOR.primary,
        borderRadius: 7,
    },
    bottomWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    forgotPassWrapper: {
        marginBottom: 22,
    },
    forgotPass: {
        fontSize: normalize(12),
        color: COLOR.grey,
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
})
