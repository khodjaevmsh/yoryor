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

export default function Weight({ route }) {
    const { props } = route.params
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState(null)
    const [weight, setWeight] = useState(props.value)
    const { profile, setRender } = useContext(GlobalContext)
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
            setRender(true)
        } catch (error) {
            setServerError(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoiding>
            <Container>
                <Text style={styles.title}>Vazningiz?</Text>

                <View style={{ flex: 1, marginTop: 22 }}>
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
        </KeyboardAvoiding>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(28),
        fontWeight: '500',
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 8,
        fontSize: fontSize.small,
        lineHeight: 19.5,
    },
    inputWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: normalize(15),
        paddingLeft: normalize(25),
        paddingRight: normalize(20),
        borderRadius: normalize(15),
        borderWidth: 2,
        borderColor: COLOR.lightGrey,
        marginTop: 22,
    },
    input: {
        width: '100%',
        minHeight: normalize(100),
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        fontSize: fontSize.medium,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})