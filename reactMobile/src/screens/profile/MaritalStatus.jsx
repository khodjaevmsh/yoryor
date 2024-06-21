import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { maritalStatus } from '../../utils/choices'

export default function MaritalStatus({ route }) {
    const { props } = route.params
    const [status, setStatus] = useState(props.key)
    const [loading, setLoading] = useState(false)
    const { profile, setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    async function onSubmit() {
        try {
            setLoading(true)
            await baseAxios.put(PROFILE.replace('{id}', profile.id), { maritalStatus: status })
            navigation.goBack()
            if (props.key !== status) {
                setRender(true)
                showToast('success', 'Muvaffaqiyatli', 'Oilaviy ahvolingiz o\'zgartirildi.')
            }
        } catch (error) {
            console.log(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container scrollable>
            <Text style={styles.title}>Oilaviy ahvolingiz</Text>
            <Text style={styles.subTitle}>
                Foydalanuvchilar sizning oilaviy ahvolingizga qarab munosabat bildirishadi.
            </Text>
            <View style={styles.pickerWrapper}>
                {Object.entries(maritalStatus).map(([key, value]) => (
                    <TouchableOpacity
                        key={key}
                        activeOpacity={0.7}
                        onPress={() => setStatus(key)}
                        style={[styles.status, status === key && styles.activeStatus]}>
                        <Text style={styles.statusText}>{value}</Text>
                        <View style={[styles.radio, status === key && styles.activeRadio]} />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.buttonWrapper}>
                <Button title="Davom etish" onPress={onSubmit} buttonStyle={styles.button} loading={loading} />
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
        marginTop: 22,
    },
    status: {
        width: '100%',
        height: 52,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 18,
        marginVertical: 7,
        backgroundColor: COLOR.extraLightGrey,
    },
    statusText: {
        fontSize: fontSize.medium,
        color: COLOR.black,
        fontWeight: '500',
    },
    radio: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderRadius: 100,
    },
    activeRadio: {
        width: 24,
        height: 24,
        borderWidth: 6,
        borderRadius: 100,
    },
    activeStatus: {
        backgroundColor: COLOR.lightPrimary,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
