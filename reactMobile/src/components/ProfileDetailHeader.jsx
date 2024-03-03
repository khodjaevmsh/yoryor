import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import normalize from 'react-native-normalize'
import Carousel from 'react-native-snap-carousel'
import { Edit2 } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import moment from 'moment'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { CheckMarkBlue } from './common/Svgs'
import { domain } from '../hooks/requests'
import { GlobalContext } from '../context/GlobalContext'
import { determineFontSize } from '../utils/string'

const itemWidth = Dimensions.get('window').width * 0.84

export default function ProfileDetailHeader({ profileImages }) {
    const { profile } = useContext(GlobalContext)
    const navigation = useNavigation()

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.carouselItem}
            onPress={() => navigation.navigate('AddProfileImage', { profile: profile.id })}>
            <FastImage
                style={styles.carouselImage}
                source={{
                    uri: `${domain + item.image}`,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover} />
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
            <View style={styles.nameWrapper}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.name, { fontSize: determineFontSize(profile.name, 26) }]}>
                        {profile.name}, {new Date().getFullYear() - moment(profile.birthdate).format('YYYY')}
                    </Text>
                    <CheckMarkBlue width={22} height={22} />
                </View>
                <Text style={styles.region}>{profile.region.title}</Text>
            </View>

            <View style={styles.sliderWrapper}>
                <Carousel
                    layout="default"
                    data={profileImages && profileImages}
                    renderItem={renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={itemWidth}
                    inactiveSlideScale={0.91}
                    inactiveSlideOpacity={0.7} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nameWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 12,
        paddingHorizontal: 10,
    },
    name: {
        fontWeight: '600',
        marginRight: 8,
    },
    region: {
        fontSize: fontSize.medium,
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
        height: normalize(380),
        borderRadius: 16,
        overflow: 'hidden',
    },
    carouselImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 14,
    },

    updateButton: {
        position: 'absolute',
        top: 12,
        right: 12,
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
        height: normalize(380), // Adjust the height as needed
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: COLOR.extraLightGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
