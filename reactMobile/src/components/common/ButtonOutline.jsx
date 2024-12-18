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
        height: normalize(50),
        justifyContent: 'center',
        backgroundColor: COLOR.white,
        padding: 8,
        borderRadius: 55,
        borderWidth: 2,
        borderColor: COLOR.lightGrey,
        alignItems: 'center',
    },
    text: {
        color: COLOR.primary,
        fontWeight: '500',
        fontSize: normalize(15),
    },
})
