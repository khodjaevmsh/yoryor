import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import { baseAxios, domain } from '../hooks/requests'
import { GlobalContext } from '../context/GlobalContext'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { DEVICE_TOKEN } from '../urls'

export default function RoomItem({ room }) {
    const { profile } = useContext(GlobalContext)
    const sender = room.participants.find((participant) => participant.id === profile.id)
    const receiver = room.participants.find((participant) => participant.id !== profile.id)
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate('ChatDetail', { room, sender, receiver }) }}
            style={styles.roomItemWrapper}>
            <FastImage style={styles.receiverImage} source={{
                uri: receiver ? `${domain + receiver.images?.[0]?.image}` : null,
                priority: FastImage.priority.medium,
            }} resizeMode={FastImage.resizeMode.cover} />
            <View style={styles.receiverMsg}>
                <Text style={styles.receiverName}>{receiver.name}</Text>
                <Text style={styles.receiverMsgContent}>Lats Messsage</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
    receiverName: {
        fontSize: fontSize.large,
        fontWeight: '500',
    },
    receiverMsgContent: {
        fontSize: fontSize.small,
        color: COLOR.darkGrey,
        marginTop: 4,
    },
})
