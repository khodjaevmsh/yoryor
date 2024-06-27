import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { domain } from '../hooks/requests'
import { COLOR } from '../utils/colors'

export default function LikedUsers({ likedUsers }) {
    const navigation = useNavigation()

    const renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={{ marginRight: 16, paddingBottom: 16 }}
            onPress={() => navigation.navigate('ChatDetail', { receiver: item.sender })}>
            <View style={{ alignItems: 'center' }}>
                <FastImage
                    style={styles.likedUserImage}
                    source={{
                        uri: item.sender ? `${domain + item.sender.images[0].image}` : null,
                        priority: FastImage.priority.high,
                    }} resizeMode={FastImage.resizeMode.cover} />
                <Text style={styles.likedUserName}>{item.sender.name}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View>
            <FlatList
                data={likedUsers && likedUsers.length > 0 ? likedUsers : []}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                horizontal
                showsHorizontalScrollIndicator={false} />
        </View>
    )
}

const styles = StyleSheet.create({
    likedUserName: {
        fontWeight: '500',
        color: COLOR.darkGrey,
    },
    likedUserImage: {
        width: normalize(66),
        height: normalize(66),
        borderRadius: 100,
        marginBottom: 10,
    },

    title: {
        fontSize: normalize(26),
        fontWeight: '500',
    },
})
