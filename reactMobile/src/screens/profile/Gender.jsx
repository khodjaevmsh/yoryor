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
import { showToast } from '../../components/common/Toast'
import { genders } from '../../utils/choices'

export default function Gender({ route }) {
    const { props } = route.params
    const [gender, setGender] = useState(props.key)
    const [loading, setLoading] = useState(false)
    const { profile, setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    async function onSubmit() {
        try {
            setLoading(true)
            await baseAxios.put(PROFILE.replace('{id}', profile.id), { gender })
            navigation.goBack()
            if (gender !== props.gender) {
                setRender(true)
                showToast('success', 'Woohoo!', 'Jinsingiz o\'zgartirildi')
            }
        } catch (error) {
            console.log(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Text style={styles.title}>Jinsingiz?</Text>
            <Text style={styles.subTitle}>
                Foydalanuvchilar Sizning jinsingizga qarab filtrlanadi va
                faqat qarama-qarshi jinsdagi foydalanuvchilar ko'rsatiladi.
            </Text>

            <View style={{ marginTop: 22 }}>
                {Object.entries(genders).map(([key, value]) => (
                    <TouchableOpacity
                        key={key}
                        activeOpacity={0.7}
                        onPress={() => setGender(key)}
                        style={[styles.gender, gender === key && styles.activeGender]}>
                        <Text style={styles.genderText}>{value}</Text>
                        <View style={[styles.radio, gender === key && styles.activeRadio]} />
                    </TouchableOpacity>
                ))}
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
