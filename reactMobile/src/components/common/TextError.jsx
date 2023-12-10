import { Text, StyleSheet } from 'react-native'
import { COLOR } from '../../utils/colors'

export default function TextError(props) {
    return <Text style={styles.error}>{props.children}</Text>
}

const styles = StyleSheet.create({
    error: {
        color: COLOR.primary,
        marginTop: 6,
    },
})
