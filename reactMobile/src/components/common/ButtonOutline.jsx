import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import { COLOR } from '../../utils/colors'
import Loader from './Loader'

export default function ButtonOutline({ title = 'Text', onPress, buttonStyle, textStyle, loading }) {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress} disabled={loading}>
            {loading ? <Loader color="#E94057" /> : <Text style={[styles.text, textStyle]}>{title}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: normalize(54),
        justifyContent: 'center',
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
        fontSize: 16,
    },
})
