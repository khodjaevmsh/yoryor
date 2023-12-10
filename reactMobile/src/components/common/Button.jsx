import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { COLOR } from '../../utils/colors'

export default function Button({ title = 'Text', onPress, buttonStyle, textStyle }) {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLOR.primary,
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
    },
    text: {
        color: '#ffffff',
        fontWeight: '500',
    },
})
