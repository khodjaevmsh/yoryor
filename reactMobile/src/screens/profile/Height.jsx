import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../../components/common/Container'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import { baseAxios } from '../../hooks/requests'
import { PROFILE } from '../../urls'
import Button from '../../components/common/Button'
import PickerSelect from '../../components/common/PickerSelect'
import ServerError from '../../components/common/ServerError'
import { GlobalContext } from '../../context/GlobalContext'
import { showToast } from '../../components/common/Toast'

export default function Height({ route }) {
    const { props } = route.params
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState(null)
    const [height, setHeight] = useState(props.value)
    const { profile } = useContext(GlobalContext)
    const navigation = useNavigation()

    const heightArray = []

    for (let i = 90; i <= 249; i += 1) {
        const heightInMeters = (i / 100).toFixed(2)
        heightArray.push({ label: `${heightInMeters} m`, value: `${heightInMeters} m` })
    }

    async function onSubmit() {
        try {
            setLoading(true)
            await baseAxios.put(PROFILE.replace('{id}', profile.id), { height })
            navigation.goBack()
            if (props.value !== height) {
                showToast('success', 'Woohoo!', 'Bo\'yingiz o\'zgartirildi')
            }
        } catch (error) {
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Text style={styles.title}>Bo'yingiz?</Text>
            <Text style={styles.subTitle}>Bo'yingizni belgilang.</Text>
            <View style={{ flex: 1, marginTop: 22 }}>
                <PickerSelect
                    placeholder={{ label: 'Javobsiz qoldirish', value: '' }}
                    items={heightArray.map((item) => ({ label: item.label, value: item.value }))}
                    value={height}
                    onValueChange={(val) => setHeight(val)} />
                <ServerError error={serverError} style={styles.serverError} />
            </View>
            <View style={styles.buttonWrapper}>
                <Button title="Qo'shish" onPress={onSubmit} loading={loading} />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(26),
        fontWeight: '600',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 8,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
