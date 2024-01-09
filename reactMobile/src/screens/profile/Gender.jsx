import React, { useContext, useEffect, useState } from 'react'
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
import ServerError from '../../components/common/ServerError'

const genders = [
    { id: 'male', title: 'Erkak' },
    { id: 'female', title: 'Ayol' },
    { id: 'other', title: 'Boshqasi' },
]

export default function Gender({ route }) {
    const { props } = route.params
    const [gender, setGender] = useState(props.gender.value)
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState('')
    const [validationError, setValidationError] = useState('')
    const { profile, setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    useEffect(() => {
        setValidationError('')
    }, [gender])

    async function onSubmit() {
        if (!gender) {
            setValidationError('* Jinsigzini tanlang')
        } else {
            try {
                setLoading(true)
                await baseAxios.put(PROFILE.replace('{id}', profile.id), { gender })
                navigation.goBack()
                setRender(true)
            } catch (error) {
                setServerError(error.response)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <Container>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Jinsingiz?</Text>

                <View style={{ marginTop: 22 }}>
                    {genders.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.7}
                            onPress={() => setGender(item.id)}
                            style={[styles.gender, gender === item.id && styles.activeGender]}>
                            <Text style={styles.genderText}>{item.title}</Text>
                            <View style={[styles.radio, gender === item.id && styles.activeRadio]} />
                        </TouchableOpacity>
                    ))}
                </View>

                <ServerError error={serverError} style={styles.serverError} />
                {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}

                <View style={styles.buttonWrapper}>
                    <Button
                        title="Davom etish"
                        onPress={onSubmit}
                        buttonStyle={styles.button}
                        loading={loading} />
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: normalize(28),
        fontWeight: '500',
    },
    gender: {
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
    genderText: {
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
    activeGender: {
        backgroundColor: COLOR.lightPrimary,
    },
    validationError: {
        color: COLOR.primary,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
