import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import Container from '../components/common/Container'
import Button from '../components/common/Button'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { GlobalContext } from '../context/GlobalContext'
import { FlagRussian, FlagUSA, FlagUzbekistan } from '../components/common/Svgs'
import { showToast } from '../components/common/Toast'

const languages = [
    { name: 'O\'zbek', value: 'uz', icon: <FlagUzbekistan /> },
    { name: 'Русский', value: 'ru', icon: <FlagRussian /> },
    { name: 'English', value: 'en', icon: <FlagUSA /> },
]

export default function ChangeLanguage() {
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false)
    const { setLanguage, language } = useContext(GlobalContext)
    const navigation = useNavigation()

    function onChangeLanguage(lang) {
        setLanguage(lang.value)
    }

    return (
        <Container>
            <Text style={styles.title}>Ilova tilni tanlang</Text>

            <View style={{ flex: 1, marginTop: 0 }}>
                {languages.map((item) => (
                    <TouchableOpacity
                        key={item.value}
                        activeOpacity={0.7}
                        onPress={() => onChangeLanguage({ name: item.name, value: item.value })}
                        style={[styles.lang, language === item.value && styles.activeLang]}>

                        <Text style={styles.langTitle}>{item.name}</Text>
                        <View>{item.icon}</View>

                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.buttonWrapper}>
                <Button
                    title="Tasdiqlash"
                    buttonStyle={styles.button}
                    loading={loading}
                    onPress={() => {
                        navigation.goBack()
                        showToast('success', 'Muvaffaqiyatli', 'Ilova tili o\'zgartirildi.')
                    }} />
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

})
