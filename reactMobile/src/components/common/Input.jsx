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
    inputStyle,
    keyboardType,
    placeholder,
    placeholderTextColor = COLOR.lightGrey,
    secureTextEntry,
    textErrorStyle,
    right,
    rightStyle,
    ...attributes
}) {
    const Component = safeArea ? SafeAreaView : View

    return (
        <Component>
            {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
            <Field name={name}>
                {({ field, form }) => (
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={[styles.input, inputStyle]}
                            keyboardType={keyboardType}
                            placeholder={placeholder}
                            placeholderTextColor={placeholderTextColor}
                            onChangeText={(value) => form.setFieldValue(name, value)}
                            value={String(field.value)}
                            secureTextEntry={secureTextEntry}
                            {...attributes} />

                        {right ? <View style={[styles.right, rightStyle]}>{right}</View> : null}

                    </View>
                )}
            </Field>
            <ErrorMessage name={name} component={TextError} textErrorStyle={textErrorStyle} />
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
    },
    input: {
        width: '100%',
        height: normalize(50),
        paddingHorizontal: 20,
        borderWidth: 1.5,
        borderColor: COLOR.lightGrey,
        borderRadius: 15,
        fontSize: normalize(16),
    },
    right: {
        position: 'absolute',
        right: 15,
    },
})
