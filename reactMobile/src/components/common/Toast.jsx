import Toast from 'react-native-toast-message'
import { Text, View, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'

export const toastConfig = {
    success: ({ text1, text2 }) => (
        <View style={styles.wrapper}>
            <View style={styles.leftSide} />
            <View style={styles.txtWrapper}>
                <Text style={styles.text1}>{text1}</Text>
                <Text style={styles.text2}>{text2}</Text>
            </View>
        </View>
    ),

    warning: ({ text1, text2 }) => (
        <View style={styles.wrapper}>
            <View style={[styles.leftSide, { backgroundColor: '#f6aa1c' }]} />
            <View style={styles.txtWrapper}>
                <Text style={styles.text1}>{text1}</Text>
                <Text style={styles.text2}>{text2}</Text>
            </View>
        </View>
    ),

    error: ({ text1, text2 }) => (
        <View style={styles.wrapper}>
            <View style={[styles.leftSide, { backgroundColor: '#ef233c' }]} />
            <View style={styles.txtWrapper}>
                <Text style={styles.text1}>{text1}</Text>
                <Text style={styles.text2}>{text2}</Text>
            </View>
        </View>
    ),
}

export function showToast(type, text1, text2) {
    Toast.show({
        type,
        text1,
        text2,
        topOffset: normalize(50),
        autoHide: true,
    })
}

const styles = StyleSheet.create({
    wrapper: {
        width: '95%',
        height: normalize(80),
        backgroundColor: '#495057',
        borderRadius: 15,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    leftSide: {
        width: normalize(18),
        height: '100%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2bc016',
    },
    txtWrapper: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 16,
    },
    text1: {
        fontSize: fontSize.small,
        fontWeight: '600',
        color: COLOR.white,
    },
    text2: {
        fontSize: fontSize.small,
        color: COLOR.white,
        marginTop: 2,
    },
})
