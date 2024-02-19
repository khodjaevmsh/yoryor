import React, { useContext, useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import normalize from 'react-native-normalize'
import { baseAxios, domain } from '../hooks/requests'
import { ChatRounded, Heart } from './common/Svgs'
import ProfileImagesPreview from './ProfileImagesPreview'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { LIKE_PROFILE } from '../urls'
import { showToast } from './common/Toast'
import { GlobalContext } from '../context/GlobalContext'

export default function ProfileCardHeader({ profileImage, profile }) {
    const [previewModal, setPreviewModal] = useState(false)
    const [like, setLike] = useState(null)
    const { setRender } = useContext(GlobalContext)

    useEffect(() => {
        async function fetchLikes() {
            try {
                const response = await baseAxios.get(LIKE_PROFILE.replace('{id}', profile.id))
                setLike(response.data)
            } catch (error) {
                showToast('error', 'Oops!', 'Nomalum xatolik')
            }
        }

        fetchLikes()
    }, [profile])

    async function onLike() {
        try {
            await baseAxios.post(LIKE_PROFILE.replace('{id}', profile.id))
            setLike({ id: profile.id })
            setRender(true)
        } catch (error) {
            showToast('error', 'Oops!', 'Nomalum xatolik')
        }
    }

    async function onDislike() {
        try {
            await baseAxios.delete(LIKE_PROFILE.replace('{id}', profile.id))
            setLike(null)
            setRender(true)
        } catch (error) {
            showToast('error', 'Oops!', 'Nomalum xatolik')
        }
    }

    return (
        <TouchableOpacity onPress={() => setPreviewModal(true)} activeOpacity={1}>
            <View style={styles.top}>
                <Text style={styles.name}>
                    {profile?.name}, {new Date().getFullYear() - moment(profile?.birthdate).format('YYYY')}
                </Text>
                <Text style={styles.city}>{profile?.region.title}</Text>
            </View>

            <FastImage
                style={styles.image}
                source={{
                    uri: profileImage ? `${domain + profileImage[0].image}` : null,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover} />

            <View style={styles.overlyBottom}>
                <TouchableOpacity style={styles.heart}>
                    <ChatRounded />
                </TouchableOpacity>

                <TouchableOpacity style={styles.heart} onPress={like && like.id ? onDislike : onLike}>
                    <View style={{ marginTop: 3 }}>
                        <Heart color={like && like.id ? COLOR.red : COLOR.black} />
                    </View>
                </TouchableOpacity>
            </View>
            <ProfileImagesPreview
                previewModal={previewModal}
                setPreviewModal={setPreviewModal}
                profile={profile} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    top: {
        marginBottom: 22,
        marginLeft: 6,
    },
    name: {
        fontSize: 28,
        color: COLOR.black,
        fontWeight: '600',
    },
    city: {
        fontSize: fontSize.small,
        color: COLOR.grey,
        fontWeight: '400',
        lineHeight: 19.5,
        marginTop: 3,
    },
    image: {
        width: '100%',
        height: normalize(485),
        borderRadius: 22,
    },
    overlyBottom: {
        ...StyleSheet.absoluteFill,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingHorizontal: 18,
        paddingBottom: 38,
    },
    heart: {
        width: normalize(55),
        height: normalize(55),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.white,
    },
})
