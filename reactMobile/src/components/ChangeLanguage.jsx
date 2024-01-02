import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext } from 'react'
import { View } from 'react-native'
import { GlobalContext } from '../context/GlobalContext'
import Button from './common/Button'

const languages = [
    { name: 'O\'zbek', value: 'uz' },
    { name: 'Русский', value: 'ru' },
    { name: 'English', value: 'en' },
]

export default function ChangeLanguage() {
    const { language, setLanguage } = useContext(GlobalContext)

    async function onPressLang(item) {
        await AsyncStorage.setItem('storageLanguage', item.value)
        setLanguage(item.value)
    }
    return (
        <View>
            {languages.map((item) => (
                <Button key={item.value} title={item.name} onPress={() => onPressLang(item)} />
            ))}
        </View>
    )
}
