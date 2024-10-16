import React from 'react'
import FastImage from 'react-native-fast-image'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import normalize from 'react-native-normalize'
import { domain } from '../hooks/requests'

export default function ProfileImage({ image, imageStyle, loading = false }) {
    return (
        !loading ? (
            <FastImage
                style={[styles.image, imageStyle]}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                    uri: image && image.image ? `${domain + image.image}` : null,
                    priority: FastImage.priority.medium,
                    cache: FastImage.cacheControl.web,
                }} />
        ) : (
            <View style={styles.image}>
                <ActivityIndicator />
            </View>
        )

    )
}

const styles = StyleSheet.create({
    image: {
        width: normalize(110),
        height: normalize(110),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
