import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Animated, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import ReceiverHead from '../../components/ReceiverHead'
import { baseAxios } from '../../hooks/requests'
import { LIKE, LIKES, PROFILE } from '../../urls'
import ActivityIndicator from '../../components/common/ActivityIndicator'
import ProfileHeaderLeft from '../../components/ProfileHeaderLeft'
import ProfileHeaderRight from '../../components/ProfileHeaderRight'
import { ChatRounded, Heart } from '../../components/common/Svgs'
import { COLOR } from '../../utils/colors'
import ReceiverBody from '../../components/ReceiverBody'
import { showToast } from '../../components/common/Toast'
import MatchModal from '../../components/MatchModal'
import { GlobalContext } from '../../context/GlobalContext'

export default function ReceiverDetail({ route }) {
    const { receiverId } = route.params
    const [loading, setLoading] = useState(true)
    const [receiver, seReceiver] = useState(null)
    const [like, setLike] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false)
    const { profile: sender } = useContext(GlobalContext)
    const navigation = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <ProfileHeaderLeft name={receiver?.name} birthdate={receiver?.birthdate} />,
            headerRight: () => <ProfileHeaderRight onPress={() => navigation.goBack()} />,
            animation: 'fade_from_bottom',
        })
    }, [navigation, receiver])

    useEffect(() => {
        async function fetchReceiver() {
            try {
                setLoading(true)
                const response = await baseAxios.get(PROFILE.replace('{id}', receiverId))
                seReceiver(response.data)

                const likeResponse = await baseAxios.get(LIKE.replace('{id}', receiverId))
                setLike(likeResponse.data)
            } catch (error) {
                console.log(error.response)
            } finally {
                setLoading(false)
            }
        }
        fetchReceiver()
    }, [receiverId])

    async function onLike() {
        try {
            if (receiver && receiver.id) {
                const response = await baseAxios.post(LIKES, {
                    sender: sender.id,
                    receiver: receiver.id,
                })
                setLike({ id: sender.id })
                setModalVisible(response.data.match)
            }
        } catch (error) {
            showToast('error', 'Oops!', 'Nomalum xatolik')
        }
    }

    const iconOpacity = scrollY.interpolate({
        inputRange: [0, 90],
        outputRange: [1, 1],
        extrapolate: 'clamp',
    })

    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
    )

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <>
            <Animated.ScrollView
                onScroll={onScroll}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}>
                <ReceiverHead receiver={receiver} isModalVisible={isModalVisible} />
                <ReceiverBody receiver={receiver} />
            </Animated.ScrollView>
            <Animated.View style={[styles.bottomIcons, { opacity: iconOpacity }]}>
                <TouchableOpacity style={styles.iconContainer} activeOpacity={0.9}>
                    <ChatRounded width={38} height={38} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={like && !like.id ? onLike : null}
                    activeOpacity={0.9}>
                    <View style={{ marginTop: 3 }}>
                        <Heart width={38} height={38} color={like && like.id ? COLOR.red : COLOR.black} />
                    </View>
                </TouchableOpacity>
            </Animated.View>

            <MatchModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                sender={sender}
                receiver={receiver} />
        </>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingTop: 22,
        paddingHorizontal: 10,
        paddingBottom: 90,
    },
    bottomIcons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 25,
        padding: 10,
    },
    iconContainer: {
        backgroundColor: COLOR.white,
        width: normalize(60),
        height: normalize(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 55,
        ...Platform.select({
            ios: {
                shadowColor: COLOR.grey,
                shadowOffset: { width: 0, height: 1.5 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    heart: {
        width: normalize(65),
        height: normalize(65),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.white,
    },
})
