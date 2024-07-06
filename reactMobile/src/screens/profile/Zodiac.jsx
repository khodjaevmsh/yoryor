import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import Container from '../../components/common/Container'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import { baseAxios } from '../../hooks/requests'
import { PROFILE } from '../../urls'
import Button from '../../components/common/Button'
import { GlobalContext } from '../../context/GlobalContext'
import { showToast } from '../../components/common/Toast'
import { zodiacs } from '../../utils/choices'
import PickerSelect from '../../components/common/PickerSelect'

export default function Zodiac({ route }) {
    const { props } = route.params
    const [zodiac, setZodiac] = useState(props.key)
    const [loading, setLoading] = useState(false)
    const { profile, setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    async function onSubmit() {
        try {
            setLoading(true)
            await baseAxios.put(PROFILE.replace('{id}', profile.id), { zodiac })
            navigation.goBack()
            if (props.key !== zodiac) {
                setRender(true)
                showToast('success', 'Woohoo!', 'Burjingiz o\'zgartirildi')
            }
        } catch (error) {
            console.log(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Text style={styles.title}>Burjingiz</Text>
            <Text style={styles.subTitle}>Burjingizni belgilang.</Text>

            <View style={styles.pickerWrapper}>
                <PickerSelect
                    placeholder={{ label: 'Javobsiz qoldirish', value: '' }}
                    items={Object.entries(zodiacs).map(([key, title]) => ({ label: title, value: key }))}
                    value={zodiac}
                    onValueChange={(val) => setZodiac(val)} />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    title="Davom etish"
                    onPress={onSubmit}
                    buttonStyle={styles.button}
                    loading={loading} />
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
    validationError: {
        color: COLOR.primary,
        marginTop: 8,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
