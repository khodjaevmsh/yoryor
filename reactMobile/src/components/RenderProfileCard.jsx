import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import { baseAxios, domain } from '../hooks/requests'
import { Heart } from './common/Svgs'
import { LIKE_PROFILE } from '../urls'
import { showToast } from './common/Toast'
import { GlobalContext } from '../context/GlobalContext'

export default function RenderProfileCard({ item }) {
    const navigation = useNavigation()
    const [like, setLike] = useState(null)
    const { render, setRender } = useContext(GlobalContext)

    useEffect(() => {
        async function fetchLikes() {
            try {
                const response = await baseAxios.get(LIKE_PROFILE.replace('{id}', item.id))
                setLike(response.data)
                setRender(false)
            } catch (error) {
                showToast('error', 'Oops!', 'Nomalum xatolik')
            }
        }
        fetchLikes()
    }, [item.id, render])

    return (
        <TouchableOpacity
            style={styles.card}
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
                {like && like.id ? <Heart color={COLOR.red} width={27} height={27} /> : null}
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
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 999, // Adjust z-index as needed to ensure the icon appears above other content
    },
})