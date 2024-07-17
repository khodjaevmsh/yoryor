import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Platform, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import ReceiverHead from '../../components/ReceiverHead'
import { baseAxios } from '../../hooks/requests'
import { LIKE, PROFILE } from '../../urls'
import ActivityIndicator from '../../components/common/ActivityIndicator'
import ProfileHeaderLeft from '../../components/ProfileHeaderLeft'
import ProfileHeaderRight from '../../components/ProfileHeaderRight'
import { ChatRounded, Heart } from '../../components/common/Svgs'
import { COLOR } from '../../utils/colors'
import ReceiverBody from '../../components/ReceiverBody'
import { GlobalContext } from '../../context/GlobalContext'

export default function EncounterDetail({ route }) {
    const { receiverId } = route.params
    const [loading, setLoading] = useState(true)
    const [likeLoading, setLikeLoading] = useState(false)
    const [receiver, seReceiver] = useState({})
    const [like, setLike] = useState({})
    const navigation = useNavigation()
    const { swiperRef } = useContext(GlobalContext)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <ProfileHeaderLeft name={receiver?.name} birthdate={receiver?.birthdate} />,
            headerRight: () => <ProfileHeaderRight onPress={() => navigation.goBack()} />,
            animation: 'fade_from_bottom',
            animationDuration: 170,
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
                console.log(error.response.data)
            } finally {
                setLoading(false)
            }
        }
        fetchReceiver()
    }, [receiverId])

    function onSwipe() {
        setLikeLoading(true)
        swiperRef.current.swipeRight()
        setLikeLoading(false)
        navigation.goBack()
    }

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}>
                <ReceiverHead receiver={receiver} />
                <ReceiverBody receiver={receiver} />
            </ScrollView>

            <View style={styles.bottomIcons}>
                <TouchableOpacity style={styles.iconContainer} activeOpacity={1}>
                    <ChatRounded width={38} height={38} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={like && !like.id ? onSwipe : null}
                    activeOpacity={1}>
                    <View style={{ marginTop: !likeLoading ? 3 : 0 }}>
                        {!likeLoading ? (
                            <Heart width={38} height={38} color={like && like.id ? COLOR.red : COLOR.black} />
                        ) : <ActivityIndicator />}
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingTop: 10,
        paddingBottom: 135,
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
