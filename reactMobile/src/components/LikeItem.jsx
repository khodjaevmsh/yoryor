import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'
import React from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { domain } from '../hooks/requests'
import { COLOR } from '../utils/colors'
import { shortenText } from '../utils/string'

export default function LikeItem({ item }) {
    const navigation = useNavigation()
    const age = new Date().getFullYear() - moment(item.sender.birthdate).format('YYYY')

    return (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={1}
            onPress={() => navigation.navigate('ReceiverDetail', { receiverId: item.sender.id })}>
            <FastImage
                style={styles.image}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                    uri: item.sender && item.sender.images ? `${domain + item.sender.images[0].image}` : null,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.web,
                }} />
            <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
                start={{ x: 0.5, y: 0.0 }}
                style={styles.linearGradient}>
                <Text style={styles.bottomText}>{shortenText(item.sender.name, 15)}, {age}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: 4,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 24,
    },
    image: {
        width: '100%',
        height: normalize(220),
        borderRadius: 24,
    },
    bottomText: {
        color: COLOR.white,
        fontSize: normalize(Platform.OS === 'ios' ? 14 : 16),
        fontWeight: '600',
        paddingHorizontal: 15,
        paddingVertical: 14,
    },
    linearGradient: {
        position: 'absolute',
        bottom: 4.5,
        left: 4,
        right: 4,
        borderRadius: 24,
    },
})
