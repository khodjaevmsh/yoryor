import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
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
            onPress={() => navigation.navigate('ProfileCardDetail', { profile: item.sender })}>
            <FastImage
                style={styles.image}
                source={{
                    uri: item.sender ? `${domain + item.sender.images[0].image}` : null,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover} />
            <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.7)']}
                start={{ x: 0.5, y: 0.2 }}
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
        height: normalize(260),
        borderRadius: 18,
    },
    bottomText: {
        color: COLOR.white,
        fontSize: normalize(14),
        fontWeight: '600',
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    linearGradient: {
        position: 'absolute',
        bottom: 4.5,
        left: 4,
        right: 4,
        borderRadius: 18,
    },
})
