import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { COLOR } from '../../utils/colors'

export default function ButtonOutline({ title = 'Text', onPress, buttonStyle, textStyle }) {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLOR.white,
        padding: 18,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLOR.lightGrey,
        alignItems: 'center',
    },
    text: {
        color: COLOR.primary,
        fontWeight: '500',
    },
})
