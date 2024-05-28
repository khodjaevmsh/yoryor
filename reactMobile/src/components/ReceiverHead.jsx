import React, { useContext, useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import normalize from 'react-native-normalize'
import LinearGradient from 'react-native-linear-gradient'
import { baseAxios, domain } from '../hooks/requests'
import { ChatRounded, Goal, Heart, MapPoint } from './common/Svgs'
import ProfileImagesPreview from './ProfileImagesPreview'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { LIKE, LIKES } from '../urls'
import { showToast } from './common/Toast'
import { GlobalContext } from '../context/GlobalContext'
import MatchModal from './MatchModal'
import { goals } from '../utils/choices'

const { height: screenHeight } = Dimensions.get('window')
const imageHeight = screenHeight * 0.68

export default function ReceiverHead({ receiver }) {
    const [like, setLike] = useState(null)
    const [room, setRoom] = useState(null)
    const [previewModal, setPreviewModal] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const { profile: sender } = useContext(GlobalContext)

    useEffect(() => {
        async function fetchLike() {
            try {
                const likeResponse = await baseAxios.get(LIKE.replace('{id}', receiver.id))
                setLike(likeResponse.data)
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchLike()
    }, [receiver])

    async function onLike() {
        try {
            if (receiver.id) {
                const response = await baseAxios.post(LIKES, { sender: sender.id, receiver: receiver.id })
                setLike({ id: sender.id })
                setModalVisible(response.data.match)
                setRoom(response.data.room)
            }
        } catch (error) {
            console.log(error.response.data)
            showToast('error', 'Oops!', 'Nomalum xatolik.')
        }
    }

    return (
        <TouchableOpacity onPress={() => setPreviewModal(true)} activeOpacity={1}>
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.50)', 'transparent']}
                start={{ x: 0.5, y: 0.0 }}
                end={{ x: 0.5, y: 0.75 }}
                style={styles.topLinearGradient}>
                <Text style={styles.name}>
                    {receiver?.name}, {new Date().getFullYear() - moment(receiver?.birthdate).format('YYYY')}
                </Text>

                <View style={[styles.topTagWrapper, { backgroundColor: COLOR.white }]}>
                    <Goal width={15} height={15} />
                    <Text style={[styles.topTag, { color: COLOR.black }]}>{goals[receiver.goal]}</Text>
                </View>
                <View style={styles.topTagWrapper}>
                    <MapPoint width={15} height={15} color={COLOR.white} />
                    <Text style={styles.topTag}>{receiver?.region?.title}</Text>
                </View>
            </LinearGradient>

            <FastImage style={styles.image} source={{
                uri: receiver ? `${domain + receiver.images[0].image}` : null,
                priority: FastImage.priority.normal,
            }} resizeMode={FastImage.resizeMode.cover} />

            <LinearGradient
                colors={['rgba(0, 0, 0, 0.2)', 'transparent']}
                start={{ x: 0.5, y: 0.7 }}
                end={{ x: 0.5, y: 0.0 }}
                style={styles.bottomLinearGradient}>
                <TouchableOpacity style={styles.heart}>
                    <ChatRounded />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.heart}
                    onPress={like && !like.id ? onLike : null}
                    activeOpacity={like && !like.id ? 0.5 : 1}>
                    <View style={{ marginTop: 3 }}>
                        <Heart color={like && like.id ? COLOR.red : COLOR.black} />
                    </View>
                </TouchableOpacity>
            </LinearGradient>

            <ProfileImagesPreview previewModal={previewModal} setPreviewModal={setPreviewModal} receiver={receiver} />

            <MatchModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                room={room}
                sender={sender}
                receiver={receiver} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    topLinearGradient: {
        position: 'absolute',
        width: '100%',
        height: '30%',
        justifyContent: 'flex-start',
        paddingHorizontal: 22,
        paddingVertical: 20,
        top: 0,
        zIndex: 1,
        borderRadius: 32,
    },
    name: {
        fontSize: normalize(24),
        fontWeight: '600',
        color: COLOR.white,
        marginBottom: 4,
        marginLeft: 2,
    },
    topTag: {
        fontSize: normalize(12),
        color: COLOR.white,
        marginLeft: 4,
    },
    topTagWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 55,
        marginVertical: 4,
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
        height: imageHeight,
        borderRadius: 32,
    },
    bottomLinearGradient: {
        position: 'absolute',
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingHorizontal: 25,
        paddingVertical: 38,
        bottom: 0,
        zIndex: 1,
        borderRadius: 32,
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
