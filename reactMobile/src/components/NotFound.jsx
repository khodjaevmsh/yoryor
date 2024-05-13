import { Text, View, StyleSheet } from 'react-native'
import { COLOR } from '../utils/colors'

export default function NotFound({ wrapperStyle }) {
    return (
        <View style={[styles.wrapper, wrapperStyle]}>
            <Text style={styles.text}>Hozircha mavjud emas</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        paddingVertical: 12,
        backgroundColor: COLOR.extraLightGrey,
        marginTop: 18,
    },
    text: {
        fontWeight: '500',
    },
})
