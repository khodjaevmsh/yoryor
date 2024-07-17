import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import Container from '../../components/common/Container'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import KeyboardAvoiding from '../../components/common/KeyboardAvoiding'
import { baseAxios } from '../../hooks/requests'
import { PROFILE } from '../../urls'
import Button from '../../components/common/Button'
import PickerSelect from '../../components/common/PickerSelect'
import ServerError from '../../components/common/ServerError'
import { GlobalContext } from '../../context/GlobalContext'
import { showToast } from '../../components/common/Toast'

export default function Weight({ route }) {
    const { props } = route.params
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState(null)
    const [weight, setWeight] = useState(props.value)
    const { profile } = useContext(GlobalContext)
    const navigation = useNavigation()

    const weightArray = []

    for (let i = 40; i <= 150; i += 1) {
        weightArray.push({ label: `${i} kg`, value: `${i} kg` })
    }

    async function onSubmit() {
        try {
            setLoading(true)
            await baseAxios.put(PROFILE.replace('{id}', profile.id), { weight })
            navigation.goBack()
            if (props.value !== weight) {
                showToast('success', 'Woohoo!', 'Vazningiz o\'zgartirildi')
            }
        } catch (error) {
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Text style={styles.title}>Vazningiz?</Text>
            <Text style={styles.subTitle}>
                Vazningizni belgilang.
            </Text>
            <View style={styles.pickerWrapper}>
                <PickerSelect
                    placeholder={{ label: 'Javobsiz qoldirish', value: '' }}
                    items={weightArray.map((item) => ({ label: item.label, value: item.value }))}
                    value={weight}
                    onValueChange={(val) => setWeight(val)} />
            </View>
            <ServerError error={serverError} style={styles.serverError} />
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
    pickerWrapper: {
        flex: 1,
        marginTop: 22,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
