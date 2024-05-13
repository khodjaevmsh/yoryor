import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import { baseAxios, domain } from '../hooks/requests'
import { Heart } from './common/Svgs'
import { LIKE_PROFILE } from '../urls'
import { showToast } from './common/Toast'

export default function RenderProfileCard({ item }) {
    const navigation = useNavigation()
    const [like, setLike] = useState(null)

    useEffect(() => {
        async function fetchLikes() {
            try {
                const response = await baseAxios.get(LIKE_PROFILE.replace('{id}', item.id))
                setLike(response.data)
            } catch (error) {
                showToast('error', 'Oops!', 'Nomalum xatolik')
            }
        }
        fetchLikes()
    }, [item.id])

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.95}
            onPress={() => navigation.navigate('ProfileCardDetail', { profile: item })}>

            <FastImage
                style={styles.profileImage}
                source={{
                    uri: `${domain + item.images[0].image}`,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover} />

            <View style={styles.profileInfo}>
                <Text style={styles.name}>
                    {item.name}, {new Date().getFullYear() - moment(item.birthdate).format('YYYY')}
                </Text>
                <Text style={styles.city}>{item.region.title}</Text>
            </View>

            <View style={styles.iconContainer}>
                {like && like.id ? <Heart color={COLOR.red} width={22} height={22} /> : null}
            </View>
        </TouchableOpacity>
    )
}

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
        fontSize: fontSize.small,
        fontWeight: '500',
    },
    city: {
        color: COLOR.grey,
        fontWeight: '500',
        marginTop: 3,
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 999, // Adjust z-index as needed to ensure the icon appears above other content
    },
})
