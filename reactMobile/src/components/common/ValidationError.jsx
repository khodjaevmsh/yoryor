import { AlertCircle } from 'react-native-feather'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../utils/colors'

export default function ValidationError({ validationError, wrapperStyle, textStyle }) {
    return (
        validationError ? (
            <View style={[styles.wrapper, wrapperStyle]}>
                <AlertCircle width={17} height={17} color={COLOR.red} strokeWidth={2.2} />
                <Text style={[styles.textStyle, textStyle]}>{validationError}</Text>
            </View>
        ) : null
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
    },
    textStyle: {
        color: COLOR.red,
        marginTop: 1,
        marginLeft: 4,
    },
})
