import { Text, View, StyleSheet } from 'react-native'
import { COLOR } from '../utils/colors'

export default function NotFound() {
    return (
        <View style={styles.wrapper}>
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
    },
    text: {
        fontWeight: '500',
    },
})
