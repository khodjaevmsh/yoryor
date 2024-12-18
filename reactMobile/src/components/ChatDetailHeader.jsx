import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ChevronLeft } from 'react-native-feather'
import React from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { domain } from '../hooks/requests'
import ReceiverName from './ReceiverName'

export default function ChatDetailHeader({ receiver }) {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ChevronLeft width={34} height={34} color={COLOR.primary} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ReceiverDetail', { receiverId: receiver.id })}>
                <FastImage
                    style={styles.profileImage}
                    source={{
                        uri: receiver && receiver.images ? `${domain + receiver.images[0].image}` : null,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover} />
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('ReceiverDetail', { receiverId: receiver.id })}>
                <ReceiverName item={receiver} hideAge nameStyle={styles.name} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: Platform.OS === 'ios' ? 68 : 12,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: COLOR.extraLightGrey,
    },
    profileImage: {
        width: normalize(42),
        height: normalize(42),
        borderRadius: 100,
        marginLeft: 14,
        marginRight: 12,
    },
    name: {
        fontSize: fontSize.large,
        fontWeight: '500',
    },
    lastSeen: {
        color: COLOR.darkGrey,
    },
})
