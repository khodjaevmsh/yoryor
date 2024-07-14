import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import moment from 'moment'
import { baseAxios, domain } from '../hooks/requests'
import { GlobalContext } from '../context/GlobalContext'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { PROFILE } from '../urls'
import { shortenText } from '../utils/string'

export default function RoomItem({ room }) {
    const { profile } = useContext(GlobalContext)
    const [sender, setSender] = useState({})
    const [receiver, setReceiver] = useState({})
    const navigation = useNavigation()

    const senderId = room.participants?.find((participant) => participant === profile.id)
    const receiverId = room.participants?.find((participant) => participant !== profile.id)
    const unSeen = room.lastMessage.user === receiver.id && (room.unSeen || room.unseen > 0)

    useEffect(() => {
        async function fetchReceiver() {
            try {
                const senderResponse = await baseAxios.get(PROFILE.replace('{id}', senderId))
                setSender(senderResponse.data)

                const receiverResponse = await baseAxios.get(PROFILE.replace('{id}', receiverId))
                setReceiver(receiverResponse.data)
            } catch (error) {
                console.log(error.response.data)
            }
        }
        fetchReceiver()
    }, [senderId, receiverId])

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('ChatDetail', { room, sender, receiver })}
            style={styles.roomItemWrapper}>
            <FastImage
                style={styles.receiverImage}
                source={{
                    uri: receiver && receiver.images ? `${domain + receiver.images[0].image}` : null,
                    priority: FastImage.priority.medium,
                    cache: FastImage.cacheControl.web,
                }}
                resizeMode={FastImage.resizeMode.cover} />

            <View style={styles.receiverMsg}>
                <View style={styles.createdAtWrapper}>
                    <Text style={styles.receiverName}>{receiver.name}</Text>
                    <Text style={styles.createdAt}>
                        {moment(room.message?.createdAt || room.lastMessage.createdAt).format('HH:mm')}
                    </Text>
                </View>
                <View style={[styles.createdAtWrapper, { marginTop: 4 }]}>
                    <Text style={styles.receiverMsgContent}>
                        {shortenText(room.message?.text || room.lastMessage.content, 25) || 'Bu match!' }
                    </Text>
                    {unSeen ? (
                        <View style={styles.tagWrapper}>
                            <Text style={styles.tag}>{room.unseen || room.unSeen}</Text>
                        </View>
                    ) : null}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    //    ROOM ITEM
    roomItemWrapper: {
        flex: 1,
        borderBottomColor: COLOR.lightGrey,
        borderBottomWidth: 0.3,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    receiverImage: {
        width: normalize(58),
        height: normalize(58),
        borderRadius: 100,
    },
    receiverMsg: {
        flex: 1,
        paddingHorizontal: 14,
    },
    createdAtWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    createdAt: {
        fontSize: fontSize.small,
        color: COLOR.darkGrey,
    },
    receiverName: {
        fontSize: fontSize.large,
        fontWeight: '500',
    },
    receiverMsgContent: {
        fontSize: fontSize.small,
        color: COLOR.grey,
    },
    tagWrapper: {
        backgroundColor: COLOR.primary,
        borderRadius: 55,
        paddingHorizontal: 7,
        paddingVertical: 4.5,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: normalize(23),
    },
    tag: {
        color: COLOR.white,
        fontSize: 12,
        fontWeight: '700',
    },
})
