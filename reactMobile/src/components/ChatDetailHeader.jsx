import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ChevronLeft } from 'react-native-feather'
import FastImage from 'react-native-fast-image'
import React from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { domain } from '../hooks/requests'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'

export default function ChatDetailHeader({ receiver }) {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ChevronLeft width={34} height={34} color={COLOR.primary} />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ReceiverDetail', { receiver })}>
                <FastImage
                    style={styles.profileImage}
                    source={{
                        uri: receiver ? `${domain + receiver.images[0].image}` : null,
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover} />
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ReceiverDetail', { receiver })}>
                <Text style={styles.profileName}>{receiver.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: Platform.OS === 'ios' ? 72 : 12,
        paddingBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: COLOR.lightGrey,
    },
    profileImage: {
        width: normalize(40),
        height: normalize(40),
        borderRadius: 100,
        marginLeft: 14,
        marginRight: 12,
    },
    profileName: {
        fontSize: fontSize.large,
        fontWeight: '500',
    },
    lastSeen: {
        color: COLOR.darkGrey,
    },
})
