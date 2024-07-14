import React, { useState } from 'react'
import { Text, TextInput, View, StyleSheet, SafeAreaView } from 'react-native'
import { Field, ErrorMessage } from 'formik'
import normalize from 'react-native-normalize'
import CountryPicker from 'react-native-country-picker-modal'
import { COLOR } from '../../utils/colors'
import TextError from './TextError'
import { fontSize } from '../../utils/fontSizes'

export default function PhoneInput({
    safeArea,
    label,
    labelStyle,
    name,
    inputWrapperStyle,
    inputStyle,
    keyboardType,
    placeholder,
    placeholderTextColor = COLOR.lightGrey,
    secureTextEntry,
    wrapperErrorStyle,
    textErrorStyle,
    setCallingCode,
    ...attributes
}) {
    const Component = safeArea ? SafeAreaView : View
    const [countryCode, setCountryCode] = useState('UZ')

    return (
        <Component>
            {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

            <View style={[styles.inputWrapper, inputWrapperStyle]}>
                <CountryPicker
                    countryCode={countryCode}
                    withFilter
                    withFlag
                    withCallingCode
                    withCallingCodeButton
                    withAlphaFilter
                    withEmoji
                    visible={false}
                    onSelect={(country) => {
                        setCountryCode(country.cca2)
                        setCallingCode(country.callingCode[0])
                    }}
                    theme={styles.theme}
                    containerButtonStyle={styles.containerButtonStyle}
                    closeButtonImageStyle={styles.closeButtonImageStyle} />

                <Field name={name}>
                    {({ field, form }) => (
                        <TextInput
                            style={[styles.input, inputStyle]}
                            keyboardType={keyboardType}
                            placeholder={placeholder}
                            placeholderTextColor={placeholderTextColor}
                            onChangeText={(value) => form.setFieldValue(name, value)}
                            value={String(field.value)}
                            secureTextEntry={secureTextEntry}
                            {...attributes} />
                    )}
                </Field>

            </View>

            <ErrorMessage
                name={name}
                component={TextError}
                wrapperErrorStyle={wrapperErrorStyle}
                textErrorStyle={textErrorStyle} />
        </Component>
    )
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 4,
        marginLeft: 4,
        fontSize: fontSize.medium,
    },
    theme: {
        flagSizeButton: normalize(26),
        flagSize: normalize(28),
        fontSize: normalize(16),
    },
    containerButtonStyle: {
        paddingLeft: 20,
        paddingRight: 12,
        borderRightWidth: 1.5,
        borderColor: COLOR.lightGrey,
    },
    closeButtonImageStyle: {
        width: normalize(48),
        height: normalize(48),
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        borderWidth: 1.5,
        borderColor: COLOR.lightGrey,
        borderRadius: 55,
        overflow: 'hidden',
        marginVertical: 5,
    },
    input: {
        width: '100%',
        height: normalize(46),
        paddingLeft: 15,
        paddingRight: 100,
        fontSize: normalize(16),
    },
})
