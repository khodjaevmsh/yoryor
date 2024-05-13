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
import { LIKE_PROFILE, LIKES } from '../urls'
import { showToast } from './common/Toast'
import { GlobalContext } from '../context/GlobalContext'
import MatchModal from './MatchModal'

export default function ProfileCardHeader({ profileImage, profile: receiverProfile }) {
    const [previewModal, setPreviewModal] = useState(false)
    const [like, setLike] = useState(null)
    const [room, setRoom] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false)
    const { profile: senderProfile } = useContext(GlobalContext)

    useEffect(() => {
        async function fetchLike() {
            try {
                const response = await baseAxios.get(LIKE_PROFILE.replace('{id}', receiverProfile.id))
                setLike(response.data)
            } catch (error) {
                console.log(error.response)
            }
        }

        fetchLike()
    }, [receiverProfile])

    async function onLike() {
        try {
            if (receiverProfile.id) {
                const response = await baseAxios.post(LIKES, {
                    sender: senderProfile.id,
                    receiver: receiverProfile.id,
                })
                setLike({ id: senderProfile.id })
                setModalVisible(response.data.match)
                setRoom(response.data.room)
            }
        } catch (error) {
            console.log(error.response.data)
            showToast('error', 'Oops!', 'Nomalum xatolik')
        }
    }

    async function onDislike() {
        try {
        // Check if there is a like to delete
            if (like && like.id) {
                await baseAxios.delete(LIKE_PROFILE.replace('{id}', receiverProfile?.id))
                setLike({})
            }
        } catch (error) {
            console.log(error.response.data)
            showToast('error', 'Oops!', 'Nomalum xatolik')
        }
    }

    return (
        <TouchableOpacity onPress={() => setPreviewModal(true)} activeOpacity={1}>
            <View style={styles.top}>
                <Text style={styles.name}>
                    {/* eslint-disable-next-line max-len */}
                    {receiverProfile?.name}, {new Date().getFullYear() - moment(receiverProfile?.birthdate).format('YYYY')}
                </Text>
                <Text style={styles.city}>{receiverProfile?.region.title}</Text>
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
                profile={receiverProfile} />

            <MatchModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                room={room}
                sender={senderProfile}
                receiver={receiverProfile} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    top: {
        marginBottom: 18,
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
        fontWeight: '500',
        lineHeight: 19.5,
        marginTop: 1,
        marginLeft: 1,
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
