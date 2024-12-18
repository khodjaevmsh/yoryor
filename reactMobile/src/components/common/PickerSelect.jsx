import { StyleSheet, Text, View } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import React from 'react'
import { ChevronDown } from 'react-native-feather'
import normalize from 'react-native-normalize'
import { COLOR } from '../../utils/colors'

export default function PickerSelect({
    label,
    placeholder,
    value,
    onValueChange,
    items,
    props,
    style,
    labelStyle,
}) {
    return (
        <View>
            {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
            <RNPickerSelect
                placeholder={{ ...placeholder }}
                value={value}
                onValueChange={onValueChange}
                useNativeAndroidPickerStyle={false}
                items={items}
                style={{ ...pickerSelectStyles, ...style }}
                Icon={() => <ChevronDown width={26} height={26} color={COLOR.black} />}
                {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: normalize(15),
        fontWeight: '500',
        marginBottom: normalize(10),
        marginHorizontal: normalize(5),
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        flexGrow: 1,
        width: '100%',
        height: normalize(48),
        fontSize: normalize(16),
        color: 'black',
        borderWidth: 1,
        borderRadius: 55,
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderColor: '#F2F2F2',
        marginBottom: normalize(16),
        backgroundColor: COLOR.extraLightGrey,
    },
    inputAndroid: {
        flexGrow: 1,
        width: '100%',
        height: normalize(48),
        fontSize: normalize(16),
        color: 'black',
        borderWidth: 1,
        borderRadius: 55,
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderColor: '#F2F2F2',
        overflow: 'hidden',
        marginBottom: normalize(16),
        backgroundColor: COLOR.extraLightGrey,
    },
    iconContainer: {
        top: 14,
        right: 20,
    },
    placeholder: {
        color: COLOR.grey,
    },
    defaultError: {
        paddingTop: normalize(20),
        color: COLOR.primary,
    },
})
