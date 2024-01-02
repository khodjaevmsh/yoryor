import { Text as RNText, View, StyleSheet } from 'react-native'

export default function Text({ children }) {
    return (
        <View>
            <RNText style={styles.text}>{children}</RNText>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Gilroy-Regular.ttf',
    },
})
