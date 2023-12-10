import React from 'react'
import { Text, TextInput, View, StyleSheet, SafeAreaView } from 'react-native'
import { Field, ErrorMessage } from 'formik'
import { COLOR } from '../../utils/colors'
import TextError from './TextError'

export default function Input({
    safeArea,
    label,
    name,
    inputStyle,
    keyboardType,
    placeholder,
    placeholderTextColor = COLOR.lightGrey,
    ...attributes
}) {
    const Component = safeArea ? SafeAreaView : View

    return (
        <Component>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <Field name={name}>
                {({ field, form }) => (
                    <TextInput
                        style={[styles.input, inputStyle]}
                        keyboardType={keyboardType}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        onChangeText={(value) => form.setFieldValue(name, value)}
                        value={String(field.value)}
                        {...attributes} />
                )}
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </Component>
    )
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 55,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: COLOR.lightGrey,
        borderRadius: 12,
    },
})
