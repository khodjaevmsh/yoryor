import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import { COLOR } from '../../utils/colors'
import Loader from './Loader'

export default function Button({ title = 'Enter own title', onPress, buttonStyle, textStyle, loading, disabled }) {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress} disabled={loading || disabled}>
            {loading ? <Loader color="white" /> : <Text style={[styles.text, textStyle]}>{title}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: normalize(50),
        justifyContent: 'center',
        backgroundColor: COLOR.primary,
        padding: 8,
        borderRadius: 55,
        alignItems: 'center',
    },
    text: {
        color: '#ffffff',
        fontWeight: '500',
        fontSize: normalize(15),
    },
})
