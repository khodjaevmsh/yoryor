import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import { COLOR } from '../../utils/colors'
import Loader from './Loader'

export default function Button({ title = 'Enter own title', onPress, buttonStyle, textStyle, loading }) {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress} disabled={loading}>
            {loading ? <Loader color="white" /> : <Text style={[styles.text, textStyle]}>{title}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: normalize(54),
        justifyContent: 'center',
        backgroundColor: COLOR.primary,
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
    },
    text: {
        color: '#ffffff',
        fontWeight: '500',
        fontSize: 16,
    },
})
