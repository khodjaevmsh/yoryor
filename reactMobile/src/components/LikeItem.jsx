import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'
import React from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { domain } from '../hooks/requests'
import { COLOR } from '../utils/colors'

export default function LikeItem({ item }) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={0.96}
            onPress={() => navigation.navigate('ReceiverDetail', { receiver: item.sender })}>
            <FastImage style={styles.image} source={{
                uri: item.sender ? `${domain + item.sender.images[0].image}` : null,
                priority: FastImage.priority.high,
            }} resizeMode={FastImage.resizeMode.cover} />
            <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
                start={{ x: 0.5, y: 0.0 }}
                style={styles.linearGradient}>
                <Text style={styles.bottomText}>
                    {item.sender.name}, {new Date().getFullYear() - moment(item.sender.birthdate).format('YYYY')}
                </Text>
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
        borderRadius: 18,
    },
    image: {
        width: '100%',
        height: normalize(220),
        borderRadius: 22,
    },
    bottomText: {
        color: COLOR.white,
        fontSize: normalize(Platform.OS === 'ios' ? 14 : 16),
        fontWeight: '600',
        paddingHorizontal: 16,
        paddingVertical: 18,
    },
    linearGradient: {
        position: 'absolute',
        bottom: 4.5,
        left: 4,
        right: 4,
        borderRadius: 18,
    },
})
