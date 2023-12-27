import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import normalize from 'react-native-normalize'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'

export default function SetGender({ route }) {
    const [loading, setLoading] = useState(false)
    const [validationError, setValidationError] = useState('')
    const [gender, setGender] = useState(null)
    const navigation = useNavigation()
    const { phoneNumber, password, name, birthdate } = route.params

    useEffect(() => {
        setValidationError('')
    }, [gender])

    async function onSubmit() {
        if (!gender) {
            setValidationError('Jinsigzini tanlang')
        } else {
            setLoading(true)
            navigation.navigate('SetCity', { phoneNumber, password, name, birthdate })
        }
        setLoading(false)
    }

    return (
        <Container>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Jinsingiz?</Text>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setGender('male')}
                    style={[styles.gender, gender === 'male' && styles.activeGender]}>
                    <Text style={styles.genderText}>Erkar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setGender('female')}
                    style={[styles.gender, gender === 'female' && styles.activeGender]}>
                    <Text style={styles.genderText}>Ayol</Text>
                </TouchableOpacity>
                {validationError ? <Text style={styles.validationError}>{validationError}</Text> : null}
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
        fontSize: fontSize.extraLarge,
        fontWeight: '500',
        marginBottom: 18,
    },
    subTitle: {
        color: COLOR.grey,
        marginTop: 7,
        marginBottom: 30,
        lineHeight: 19.5,
        fontSize: fontSize.small,
    },
    gender: {
        width: '100%',
        height: 52,
        backgroundColor: COLOR.extraLightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginVertical: 7,
    },
    genderText: {
        fontSize: fontSize.medium,
        color: COLOR.black,
        fontWeight: '500',
    },
    activeGender: {
        borderColor: COLOR.primary,
        borderWidth: 1.2,
    },
    validationError: {
        color: COLOR.primary,
        marginTop: 3,
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
