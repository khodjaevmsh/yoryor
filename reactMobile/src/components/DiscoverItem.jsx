import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import React, { memo } from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { COLOR } from '../utils/colors'
import { domain } from '../hooks/requests'
import { shortenText } from '../utils/string'

const DiscoverItem = memo(({ item }) => {
    const navigation = useNavigation()
    const age = new Date().getFullYear() - moment(item.birthdate).format('YYYY')

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('ReceiverDetail', { receiverId: item.id })}>
            <FastImage
                style={styles.profileImage}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                    uri: item.images ? `${domain + item.images[0].image}` : null,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.web,
                }} />
            <View style={styles.profileInfo}>
                <Text style={styles.name}>{shortenText(item.name, 15)}, {age}</Text>
            </View>
        </TouchableOpacity>
    )
})

export default DiscoverItem
const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: normalize(170),
        margin: 6,
        overflow: 'hidden',
        borderRadius: 16,
        marginBottom: 15,
    },
    profileInfo: {
        marginVertical: 8,
        paddingHorizontal: 6,
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
})
