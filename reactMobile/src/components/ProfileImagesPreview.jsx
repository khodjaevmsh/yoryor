import RNModal from 'react-native-modal'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { X } from 'react-native-feather'
import Carousel from 'react-native-snap-carousel'
import FastImage from 'react-native-fast-image'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { baseAxios, domain } from '../hooks/requests'
import { PROFILE_IMAGES } from '../urls'

const { width: screenWidth } = Dimensions.get('window')
const SLIDER_WIDTH = screenWidth
const SLIDER_ITEM_WIDTH = screenWidth

export default function ProfileImagesPreview({ previewModal, setPreviewModal, profile }) {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [serverError, setServerError] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        async function fetchImages() {
            try {
                setLoading(true)

                const response = await baseAxios.get(PROFILE_IMAGES, { params: { profile: profile.id } })
                setImages(response.data)
            } catch (error) {
                setServerError(error.response)
            } finally {
                setLoading(false)
            }
        }

        fetchImages()
    }, [profile?.id])

    const renderItem = ({ item }) => (
        <View style={styles.carouselItem}>
            {!loading ? (
                <FastImage
                    style={styles.image}
                    /* eslint-disable-next-line no-unsafe-optional-chaining */
                    source={{ uri: `${domain + item?.image}`, priority: FastImage.priority.high }}
                    resizeMode={FastImage.resizeMode.cover} />
            ) : <ActivityIndicator />}
        </View>
    )

    return (
        <RNModal
            isVisible={previewModal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            style={styles.modal}
            backdropOpacity={1}>
            <View style={styles.childrenModal}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setPreviewModal(false)}>
                        <X width={32} height={32} color={COLOR.white} />
                    </TouchableOpacity>
                    <Text style={styles.imagesCount}>{`${activeIndex + 1} dan ${images.length}`}</Text>
                    <View style={{ width: normalize(36) }} />
                </View>

                <View style={styles.images}>
                    <Carousel
                        layout="default"
                        data={images}
                        renderItem={renderItem}
                        onSnapToItem={(index) => setActiveIndex(index)}
                        inactiveSlideOpacity={0}
                        sliderWidth={SLIDER_WIDTH}
                        containerCustomStyle={{ paddingLeft: 0, marginLeft: 0 }}
                        itemWidth={SLIDER_ITEM_WIDTH} />
                </View>
            </View>
        </RNModal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        margin: 0,
        paddingVertical: 74,
    },
    childrenModal: {
        flex: 1,
        backgroundColor: COLOR.black,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    imagesCount: {
        fontSize: fontSize.medium,
        color: COLOR.white,
        fontWeight: '600',
        // textAlign: 'center',
    },
    images: {
        flex: 2,
    },
    carouselItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: SLIDER_ITEM_WIDTH,
        height: normalize(465),
    },
})
