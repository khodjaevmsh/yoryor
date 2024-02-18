import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import React from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import { domain } from '../hooks/requests'

export default function RenderProfileCard({ item }) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProfileCardDetail', { profile: item })}>

            <FastImage
                style={styles.profileImage}
                source={{
                    uri: `${domain + item.images[0].image}`,
                    // uri: '',
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover} />

            <View style={styles.profileInfo}>
                <Text style={styles.name}>
                    {item.name}, {new Date().getFullYear() - moment(item.birthdate).format('YYYY')}
                </Text>
                <Text style={styles.city}>{item.region.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: normalize(255),
        margin: 8,
        overflow: 'hidden',
        borderRadius: 15,
    },
    profileInfo: {
        marginVertical: 10,
        paddingHorizontal: 5,
    },
    profileImage: {
        width: '100%',
        height: normalize(200),
        borderRadius: 15,
    },
    name: {
        fontSize: fontSize.medium,
        fontWeight: '500',
    },
    city: {
        color: COLOR.lightGrey,
        fontWeight: '500',
        marginTop: 3,
    },
})
