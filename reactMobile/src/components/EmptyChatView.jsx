import { Text, View, StyleSheet, Platform } from 'react-native'
import normalize from 'react-native-normalize'
import { EmptyChat } from './common/Svgs'
import { COLOR } from '../utils/colors'

export default function EmptyChatView() {
    return (
        <View style={styles.container}>
            <View style={styles.emptyBox}>
                <EmptyChat width={28} height={28} color={COLOR.white} />
            </View>
            <Text style={styles.text}>Hali hech qanday xabar yo'q!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        ...Platform.select({
            ios: {
                transform: [{ scaleY: -1 }],
            },
            android: {
                transform: [{ scaleX: -1 },
                    {
                        scaleY: -1,
                    },
                ],
            },
        }),
    },
    emptyBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.grey,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 32,
    },
    text: {
        fontSize: normalize(16),
        color: COLOR.grey,
        textAlign: 'center',
        marginTop: 18,
    },
})
