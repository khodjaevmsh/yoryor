import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import normalize from 'react-native-normalize'
import { X } from 'react-native-feather'
import { domain } from '../hooks/requests'
import { Goal, Heart, MapPoint } from './common/Svgs'
import { COLOR } from '../utils/colors'
import ReceiverBody from './ReceiverBody'

const { height: screenHeight } = Dimensions.get('window')
const imageHeight = screenHeight * 0.75 // Например, чтобы изображение занимало 75% высоты экрана

export default function EncounterItem({ swiperRef, receiver }) {
    const [isVisible, setIsVisible] = useState(true)
    const [animation] = useState(new Animated.Value(1))

    useEffect(() => {
        if (!isVisible) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 200, // Duration of the animation in milliseconds
                useNativeDriver: true, // Enable native driver for performance
            }).start()
        } else {
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start()
        }
    }, [isVisible, animation])

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y
        if (offsetY > 150) { // Пороговое значение для скрытия элемента
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }
    }

    return (
        <View style={styles.card}>
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.50)', 'transparent']}
                start={{ x: 0.5, y: 0.0 }}
                end={{ x: 0.5, y: 0.75 }}
                style={styles.topLinearGradient}>
                <Text style={styles.name}>
                    {receiver.name}, {new Date().getFullYear() - moment(receiver?.birthdate).format('YYYY')}
                </Text>
                {isVisible && (
                    <>
                        <Animated.View style={[styles.topTagWrapper, {
                            backgroundColor: COLOR.white,
                            opacity: animation,
                        }]}>
                            <Goal width={15} height={15} />
                            <Text style={[styles.topTag, { color: COLOR.black }]}>{receiver?.goal?.label}</Text>
                        </Animated.View>

                        <Animated.View style={[styles.topTagWrapper, { opacity: animation }]}>
                            <MapPoint width={15} height={15} color={COLOR.white} />
                            <Text style={styles.topTag}>{receiver.region.title}</Text>
                        </Animated.View>
                    </>
                )}
            </LinearGradient>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                bounces={false}>
                <TouchableOpacity style={styles.touchable} activeOpacity={1}>
                    <FastImage style={styles.cardImage} source={{
                        uri: receiver ? `${domain + receiver.images[0].image}` : null,
                        priority: FastImage.priority.normal,
                    }} resizeMode={FastImage.resizeMode.cover} />
                    {receiver ? (
                        <View style={{ marginHorizontal: 18 }}>
                            <ReceiverBody receiver={receiver} />
                        </View>
                    ) : null}
                </TouchableOpacity>
            </ScrollView>
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.2)', 'transparent']}
                start={{ x: 0.5, y: 0.7 }}
                end={{ x: 0.5, y: 0.0 }}
                style={styles.bottomLinearGradient}>
                <TouchableOpacity
                    style={styles.iconWrapper}
                    activeOpacity={0.7}
                    onPress={() => swiperRef.current.swipeLeft()}>
                    <X height={34} width={34} color={COLOR.black} strokeWidth={3} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.iconWrapper, { paddingTop: 12, paddingBottom: 9 }]}
                    activeOpacity={0.7}
                    onPress={() => swiperRef.current.swipeRight()}>
                    <Heart color={COLOR.black} />
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 0.75,
        borderRadius: 32,
        justifyContent: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    scrollView: {
        paddingBottom: 125,
    },
    touchable: {
        flex: 1,
        position: 'relative',
    },
    cardImage: {
        flex: 1,
        width: '100%',
        height: imageHeight,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
    },
    topLinearGradient: {
        position: 'absolute',
        width: '100%',
        height: '20%',
        justifyContent: 'flex-start',
        paddingHorizontal: 22,
        paddingVertical: 20,
        top: 0,
        zIndex: 1,
    },
    bottomLinearGradient: {
        position: 'absolute',
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingHorizontal: 25,
        paddingVertical: 20,
        bottom: 0,
        zIndex: 1,
    },
    name: {
        fontSize: normalize(26),
        fontWeight: '600',
        color: COLOR.white,
        marginBottom: 2,
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

    iconWrapper: {
        width: normalize(55),
        height: normalize(55),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.white,
        marginBottom: 5,
    },

    informationWrapper: {
        flex: 1,
        marginTop: 28,
        marginHorizontal: 18,
    },
    informationTitle: {
        fontSize: normalize(16),
        marginBottom: 10,
        color: COLOR.grey,
        fontWeight: '500',
    },
    informationSubTitle: {
        fontSize: normalize(22),
        fontWeight: '600',
        color: COLOR.black,
    },
    tagsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})
