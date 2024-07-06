import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import normalize from 'react-native-normalize'
import { X } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import { domain } from '../hooks/requests'
import { Goal, Heart, MapPoint } from './common/Svgs'
import { COLOR } from '../utils/colors'
import { goals } from '../utils/choices'

const { height: screenHeight } = Dimensions.get('window')
const imageHeight = screenHeight * 0.76 // Например, чтобы изображение занимало 75% высоты экрана

export default function EncounterItem({ swiperRef, receiver }) {
    const navigation = useNavigation()

    return (
        <View style={styles.card}>
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
                    <Text style={styles.topTag}>{receiver.region.title}</Text>
                </View>
            </LinearGradient>
            <TouchableOpacity
                onPress={() => navigation.navigate('ReceiverDetail', { receiverId: receiver.id, swiperRef })}
                style={styles.touchable}
                activeOpacity={1}>
                <FastImage
                    style={styles.cardImage}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                        uri: receiver && receiver.images ? `${domain + receiver.images[0].image}` : null,
                        priority: FastImage.priority.normal,
                        cache: FastImage.cacheControl.web,
                    }} />
            </TouchableOpacity>
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.2)', 'transparent']}
                start={{ x: 0.5, y: 0.7 }}
                end={{ x: 0.5, y: 0.0 }}
                style={styles.bottomLinearGradient}>
                <TouchableOpacity
                    style={styles.iconWrapper}
                    activeOpacity={0.7}
                    onPress={() => swiperRef.current.swipeLeft()}>
                    <X height={38} width={38} color={COLOR.black} strokeWidth={4} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.iconWrapper, { paddingTop: 12, paddingBottom: 9 }]}
                    activeOpacity={0.7}
                    onPress={() => swiperRef.current.swipeRight()}>
                    <Heart height={38} width={38} color={COLOR.black} />
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: imageHeight,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    touchable: {
        flex: 1,
        position: 'relative',
    },
    cardImage: {
        flex: 1,
        width: '100%',
        height: imageHeight,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingHorizontal: 25,
        paddingVertical: 38,
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
        width: normalize(60),
        height: normalize(60),
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.white,
    },
})
