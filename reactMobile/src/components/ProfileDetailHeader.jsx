import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import normalize from 'react-native-normalize'
import Carousel from 'react-native-snap-carousel'
import { Edit2 } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { GlobalContext } from '../context/GlobalContext'
import ActivityIndicator from './common/ActivityIndicator'
import CheckMarks from './CheckMarks'
import NameWithAge from './NameWithAge'
import ProfileImage from './ProfileImage'

const { width } = Dimensions.get('window')
const itemWidth = Dimensions.get('window').width * 0.94

export default function ProfileDetailHeader({ profileImages, loading }) {
    const { profile } = useContext(GlobalContext)
    const navigation = useNavigation()

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.carouselItem}
            onPress={() => navigation.navigate('AddProfileImage', { profile: profile.id })}>
            <ProfileImage image={item} imageStyle={styles.carouselImage} />
            {index === 0 && (
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.updateButton}
                    onPress={() => navigation.navigate('AddProfileImage', { profile: profile.id })}>
                    <Edit2 width={16} height={16} color={COLOR.white} />
                    <Text style={styles.updateText}>O'zgartirish</Text>
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    )

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.nameWrapper}>
                    <NameWithAge textStyle={styles.name} />
                    <CheckMarks />
                </View>
                <Text style={styles.region}>{profile.region.title}</Text>
            </View>

            {!loading && profileImages ? (
                <View style={styles.sliderWrapper}>
                    <Carousel
                        layout="default"
                        data={profileImages}
                        renderItem={renderItem}
                        sliderWidth={width}
                        itemWidth={itemWidth}
                        inactiveSlideScale={0.98}
                        inactiveSlideOpacity={0.8} />
                </View>
            ) : (
                <View style={[styles.loadingWrapper, { width: itemWidth, height: normalize(475) }]}>
                    <ActivityIndicator />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 12,
        paddingHorizontal: 10,
    },
    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontWeight: '600',
        marginRight: 8,
    },
    region: {
        fontSize: fontSize.small,
        marginTop: 3,
        marginLeft: 1,
        color: COLOR.grey,
    },
    sliderWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    carouselItem: {
        position: 'relative',
        width: '100%',
        height: normalize(475),
        borderRadius: 30,
        overflow: 'hidden',
    },
    carouselImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 30,
    },
    loadingWrapper: {
        backgroundColor: COLOR.extraLightGrey,
        borderRadius: 30,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    updateButton: {
        position: 'absolute',
        top: 18,
        right: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateText: {
        color: COLOR.white,
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 5,
    },
    emptyImage: {
        position: 'relative',
        width: itemWidth,
        height: normalize(380),
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: COLOR.extraLightGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
