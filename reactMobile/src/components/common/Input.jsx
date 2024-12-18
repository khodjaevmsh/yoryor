import React from 'react'
import { Text, TextInput, View, StyleSheet, SafeAreaView } from 'react-native'
import { Field, ErrorMessage } from 'formik'
import normalize from 'react-native-normalize'
import { COLOR } from '../../utils/colors'
import TextError from './TextError'
import { fontSize } from '../../utils/fontSizes'

export default function Input({
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
    right,
    rightStyle,
    ...attributes
}) {
    const Component = safeArea ? SafeAreaView : View

    return (
        <Component>
            {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}

            <View style={[styles.inputWrapper, inputWrapperStyle, { paddingRight: right ? 55 : 20 }]}>
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
                {right ? <View style={[styles.right, rightStyle]}>{right}</View> : null}
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
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        borderWidth: 1.5,
        borderColor: COLOR.lightGrey,
        borderRadius: 55,
        marginVertical: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    input: {
        width: '100%',
        height: normalize(46),
        fontSize: normalize(16),
    },
    right: {
        position: 'absolute',
        top: 9,
        right: 18,
    },
})
