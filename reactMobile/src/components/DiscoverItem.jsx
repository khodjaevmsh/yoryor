import { StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import React, { memo } from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { domain } from '../hooks/requests'
import ReceiverName from './ReceiverName'

const DiscoverItem = memo(({ item }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={1}
            onPress={() => navigation.navigate('ReceiverDetail', { receiverId: item.id })}>
            <FastImage
                style={styles.cardImage}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                    uri: item.images ? `${domain + item.images[0].image}` : null,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.web,
                }} />
            <ReceiverName item={item} wrapperStyle={styles.nameWrapper} />
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
        borderRadius: 15,
        marginBottom: 15,
    },
    cardImage: {
        flex: 1,
        height: '100%',
        borderRadius: 15,
    },
    nameWrapper: {
        marginVertical: 8,
        paddingHorizontal: 4,
    },
})
