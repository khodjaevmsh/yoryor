import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AlertCircle } from 'react-native-feather'
import { COLOR } from '../../utils/colors'

export default function ServerError({ error, wrapperStyle, textStyle }) {
    const err = error ? Object.keys(error.data).map((fieldName) => error.data[fieldName][0]) : null

    return (
        err ? (
            <View style={[styles.wrapper, wrapperStyle]}>
                <AlertCircle width={17} height={17} color={COLOR.red} strokeWidth={2.2} />
                <Text style={[styles.textStyle, textStyle]}>{err || null}</Text>
            </View>
        ) : null
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    textStyle: {
        color: COLOR.red,
        marginTop: 1,
        marginLeft: 4,
    },
})
