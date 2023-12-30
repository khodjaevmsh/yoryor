import { TouchableOpacity } from 'react-native'
import React from 'react'
import { MonkeyHearNo, MonkeySeeNo } from './Svgs'

export default function SecureTextEntryIcon({ secureTextEntry, setSecureTextEntry }) {
    return (
        <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => setSecureTextEntry(secureTextEntry)}>
            {secureTextEntry ? (
                <MonkeySeeNo width={24} height={24} />
            ) : (
                <MonkeyHearNo width={24} height={24} />
            )}
        </TouchableOpacity>
    )
}
