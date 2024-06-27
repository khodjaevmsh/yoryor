import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import React, { memo, useEffect, useState } from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { COLOR } from '../utils/colors'
import { baseAxios, domain } from '../hooks/requests'
import { Heart } from './common/Svgs'
import { LIKE } from '../urls'
import { showToast } from './common/Toast'
import { shortenText } from '../utils/string'

const DiscoverItem = memo(({ item }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('ReceiverDetail', { receiver: item })}>
            <FastImage
                style={styles.profileImage}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                    uri: `${domain + item.images[0].image}`,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.web,
                }} />
            <View style={styles.profileInfo}>
                <Text style={styles.name}>
                    {shortenText(item.name, 15)}, {new Date().getFullYear() - moment(item.birthdate).format('YYYY')}
                </Text>
                <Text style={styles.city}>{item.region.title}</Text>
            </View>
        </TouchableOpacity>
    )
})

export default DiscoverItem
const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: normalize(180),
        margin: 6,
        overflow: 'hidden',
        borderRadius: 18,
    },
    profileInfo: {
        marginVertical: 10,
        paddingHorizontal: 5,
    },
    profileImage: {
        flex: 1,
        height: '100%',
        borderRadius: 15,
    },
    name: {
        fontSize: normalize(Platform.OS === 'ios' ? 12 : 14),
        fontWeight: '500',
    },
    city: {
        color: COLOR.grey,
        fontWeight: '500',
        marginTop: 3,
        fontSize: normalize(12),
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 999, // Adjust z-index as needed to ensure the icon appears above other content
    },
})
