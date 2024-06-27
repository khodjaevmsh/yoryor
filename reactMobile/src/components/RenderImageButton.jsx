import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Edit2, Plus } from 'react-native-feather'
import React from 'react'
import normalize from 'react-native-normalize'
import FastImage from 'react-native-fast-image'
import { COLOR } from '../utils/colors'
import { domain } from '../hooks/requests'

export default function RenderImageButton({
    image,
    index,
    images,
    fetchedImages,
    imageLoading,
    handleImagePress,
    token,
}) {
    const isDisabled = index === 0
        ? !(images[index] || (fetchedImages && fetchedImages[index]))
        : !(images[index - 1] || (fetchedImages && fetchedImages[index - 1]))

    return (
        <TouchableOpacity
            key={index}
            activeOpacity={0.3}
            onPress={() => handleImagePress(index)}
            disabled={isDisabled}
            style={styles.imageButton}>

            {/* eslint-disable-next-line no-nested-ternary */}
            {imageLoading[index] ? (
                <ActivityIndicator size="small" color={COLOR.primary} />
            ) : (
            // eslint-disable-next-line no-nested-ternary
                image && image[0] && image[0].uri !== '' ? (
                    <FastImage
                        style={styles.imageButton}
                        source={{
                            uri: image[0].uri,
                            headers: { Authorization: `Token ${token}` },
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover} />
                ) : fetchedImages && fetchedImages[index] ? (
                    <FastImage
                        style={styles.imageButton}
                        source={{
                            uri: `${domain + fetchedImages[index].image}`,
                            headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover} />
                ) : null
            )}

            <View style={styles.addIcon}>
                {!image && !fetchedImages[index] ? (
                    <Plus width={18} height={18} color={COLOR.white} />
                ) : (
                    <Edit2 width={18} height={18} color={COLOR.white} />
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imageButton: {
        width: normalize(103),
        height: normalize(135),
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: COLOR.extraLightGrey,
        borderWidth: 1.2,
        borderColor: COLOR.extraLightGrey,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 9,
        marginVertical: 6,
    },
    addIcon: {
        backgroundColor: COLOR.primary,
        padding: 7,
        borderRadius: 20,
        position: 'absolute',
        bottom: -5,
        right: -5,
    },
})
