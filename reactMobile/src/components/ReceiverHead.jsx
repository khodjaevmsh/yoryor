import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import normalize from 'react-native-normalize'
import LinearGradient from 'react-native-linear-gradient'
import { domain } from '../hooks/requests'
import { Goal, MapPoint } from './common/Svgs'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { goals } from '../utils/choices'

const { height: screenHeight } = Dimensions.get('window')
const imageHeight = screenHeight * 0.66

export default function ReceiverHead({ receiver }) {
    return (
        <View>
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.50)', 'transparent']}
                start={{ x: 0.5, y: 0.0 }}
                end={{ x: 0.5, y: 0.75 }}
                style={styles.topLinearGradient}>
                <View style={[styles.topTagWrapper, { backgroundColor: COLOR.white }]}>
                    <Goal width={15} height={15} />
                    <Text style={[styles.topTag, { color: COLOR.black }]}>{goals[receiver.goal]}</Text>
                </View>
                <View style={styles.topTagWrapper}>
                    <MapPoint width={15} height={15} color={COLOR.white} />
                    <Text style={styles.topTag}>{receiver.region?.title}</Text>
                </View>
            </LinearGradient>
            <FastImage
                style={styles.image}
                source={{
                    uri: receiver && receiver.images ? `${domain + receiver.images[0].image}` : null,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.web,
                }}
                resizeMode={FastImage.resizeMode.cover} />
        </View>
    )
}

const styles = StyleSheet.create({
    topLinearGradient: {
        position: 'absolute',
        width: '100%',
        height: '30%',
        paddingHorizontal: 22,
        paddingVertical: 20,
        top: 0,
        zIndex: 1,
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
    },
})
