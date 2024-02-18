import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import normalize from 'react-native-normalize'
import { domain } from '../hooks/requests'
import { ChatRounded, Heart } from './common/Svgs'
import ProfileImagesPreview from './ProfileImagesPreview'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'

export default function ProfileCardHeader({ profileImage, profile }) {
    const [previewModal, setPreviewModal] = useState(false)

    return (
        <TouchableOpacity onPress={() => setPreviewModal(true)} activeOpacity={1}>
            <View style={styles.top}>
                <Text style={styles.name}>
                    {/* eslint-disable-next-line max-len */}
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

                <TouchableOpacity style={styles.heart}>
                    <View style={{ marginTop: 3 }}>
                        <Heart />
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
        fontWeight: '500',
        lineHeight: 19.5,
        marginTop: 4,
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
