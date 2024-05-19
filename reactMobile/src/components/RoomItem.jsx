import React, { useContext, useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { domain } from '../hooks/requests'
import { shortenText } from '../utils/string'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { GlobalContext } from '../context/GlobalContext'

export default function RoomItem({ item }) {
    const navigation = useNavigation()
    const { profile } = useContext(GlobalContext)

    const sender = useMemo(() => item.participants.find((participant) => participant.id === profile.id), [
        item.participants,
        profile.id,
    ])

    const receiver = useMemo(
        () => item.participants.find((participant) => participant.id !== profile.id),
        [item.participants, profile.id],
    )

    const isUnread = useMemo(() => profile.id !== item.message.user && profile.id !== receiver, [
        profile.id,
        item.message.user,
        receiver,
    ])

    return (
        <TouchableOpacity
            style={styles.chat}
            onPress={() => navigation.navigate('ChatDetail', { room: item })}>
            <FastImage
                style={styles.chatImage}
                source={{
                    uri: receiver ? `${domain + receiver.images?.[0]?.image}` : null,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover} />

            <View style={{ flex: 1 }}>
                <View style={styles.chatTopSide}>
                    <Text style={styles.username}>
                        {profile.id === sender?.id ? receiver?.name : sender?.name}
                    </Text>
                    <Text>{moment(item.message.timestamp).format('HH:mm')}</Text>
                </View>

                <View style={styles.isReadWrapper}>
                    <Text style={styles.chatMessage}>
                        {item.lastMessage || item.message.content ? shortenText(
                            item?.lastMessage?.replace(/\s{2,}/g, ' ') || item.message.content.replace(/\s{2,}/g, ' '),
                            25,
                        ) : 'Bu match!'}
                    </Text>
                    {(item.unreadMessageCount > 0 || item.unreadMessagesCount > 0) && isUnread && (
                        <View style={styles.unread}>
                            <Text style={styles.unreadText}>
                                {item.unreadMessageCount || item.unreadMessagesCount}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.4,
        borderColor: COLOR.lightGrey,
        paddingVertical: 16,
    },
    chatTopSide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    username: {
        fontSize: fontSize.large,
        fontWeight: '500',
    },
    chatMessage: {
        fontSize: fontSize.small,
        color: COLOR.darkGrey,
        marginLeft: 2,
    },
    chatImage: {
        width: normalize(56),
        height: normalize(56),
        borderRadius: 100,
        marginRight: 10,
    },
    isReadWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    unread: {
        minWidth: 25,
        maxHeight: 25,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.primary,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    unreadText: {
        color: COLOR.white,
        fontWeight: '500',
        padding: 3.5,
    },
})
