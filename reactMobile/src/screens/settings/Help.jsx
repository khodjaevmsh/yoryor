import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import Button from '../../components/common/Button'
import { COLOR } from '../../utils/colors'
import { fontSize } from '../../utils/fontSizes'

export default function Help() {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    return (
        <Container>
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '500', marginBottom: 2 }}>+998 90 6351001</Text>
                <Text style={{ fontWeight: '500' }}>@sovchisupport</Text>
            </View>

            <View style={styles.buttonWrapper}>
                <Button
                    title="Tushunarli"
                    buttonStyle={styles.button}
                    loading={loading}
                    onPress={() => navigation.goBack()} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(28),
        fontWeight: '500',
        marginBottom: 22,
    },
    lang: {
        width: '100%',
        height: normalize(52),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 18,
        marginVertical: 7,
        backgroundColor: COLOR.extraLightGrey,
    },
    activeLang: {
        backgroundColor: COLOR.lightPrimary,
    },

    langTitle: {
        fontSize: fontSize.medium,
        color: COLOR.black,
        fontWeight: '500',
    },
    radio: {
        width: normalize(24),
        height: normalize(24),
        borderWidth: 2,
        borderRadius: 100,
    },
    activeRadio: {
        width: normalize(24),
        height: normalize(24),
        borderWidth: 6,
        borderRadius: 100,
    },

})
