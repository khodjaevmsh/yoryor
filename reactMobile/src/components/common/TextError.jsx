import { Text, StyleSheet, View } from 'react-native'
import React from 'react'
import { AlertCircle } from 'react-native-feather'
import { COLOR } from '../../utils/colors'

export default function TextError({ children, wrapperErrorStyle, textErrorStyle }) {
    // eslint-disable-next-line react/destructuring-assignment
    return (
        <View style={[styles.wrapper, wrapperErrorStyle]}>
            <AlertCircle width={17} height={17} color={COLOR.red} strokeWidth={2.3} />
            <Text style={[styles.textStyle, textErrorStyle]}>{children}</Text>
        </View>
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
