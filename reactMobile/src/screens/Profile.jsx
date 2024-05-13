import React, { useContext, useEffect, useState } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Settings } from 'react-native-feather'
import normalize from 'react-native-normalize'
import LinearGradient from 'react-native-linear-gradient'
import Container from '../components/common/Container'
import { baseAxios } from '../hooks/requests'
import { PROFILE, PROFILE_IMAGES } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import ProfileHeader from '../components/ProfileHeader'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import ProfileButton from '../components/ProfileButton'

const itemWidth = Dimensions.get('window').width * 0.84

const subscriptionPlans = [
    {
        id: 1,
        background: ['#a8a9ad', '#b4b5b8', '#c0c0c3', '#cbcccd', '#d7d7d8', '#e3e3e3'],
        title: 'Silver',
        price: '99 000 UZS',
        description: 'lorem isum dollor set, imut be.',
        included: {
            likes: 'Cheksiz layklar',
        },
    },
    {
        id: 2,
        background: ['#AE8625', '#F7EF8A', '#D2AC47', '#EDC967'],
        title: 'Gold',
        price: '149 000 UZS',
        description: 'lorem isum dollor set, imut be.',
    },
    {
        id: 3,
        background: ['#494846', '#323230', '#1D1D1B', '#030200'],
        title: 'Platinum',
        price: '269 000 UZS',
        description: 'lorem isum dollor set, imut be.',
    },
]
export default function Profile() {
    const [loading, setLoading] = useState(false)
    const [, setServerError] = useState('')
    const [, setFetchedProfile] = useState([])
    const [fetchImages, setFetchedImages] = useState([])
    const { profile, render, setRender } = useContext(GlobalContext)

    useEffect(() => {
        async function fetchProfile() {
            try {
                setLoading(true)
                const profileResponse = await baseAxios.get(PROFILE.replace('{id}', profile.id))
                setFetchedProfile(profileResponse.data)

                const imagesResponse = await baseAxios.get(PROFILE_IMAGES, { params: { profile: profile.id } })
                setFetchedImages(imagesResponse.data[0])
            } catch (error) {
                setServerError(error.response)
            } finally {
                setRender(false)
                setLoading(false)
            }
        }
        fetchProfile()
    }, [profile.id, render])

    if (loading) {
        return <ActivityIndicator />
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity activeOpacity={1}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={item?.background || []}
                style={styles.carouselItem}>
                <View>
                    <View style={styles.subscriptionHeader}>
                        <Text style={[styles.subscriptionTitle, { color: item.id === 3 && COLOR.white }]}>
                            {item.title}
                        </Text>
                        <Text style={[styles.subscriptionPrice, { color: item.id === 3 && COLOR.white }]}>
                            {item.price}
                        </Text>
                    </View>
                    <Text style={[styles.subscriptionDescription, { color: item.id === 3 && COLOR.white }]}>
                        {item.description}
                    </Text>
                </View>
                <TouchableOpacity style={styles.activateButton}>
                    <Text style={styles.activateTitle}>Aktivlashtirish</Text>
                </TouchableOpacity>
            </LinearGradient>
        </TouchableOpacity>
    )

    return (
        <Container>
            <View>
                <ProfileHeader fetchImages={fetchImages} />
            </View>

            <View style={styles.carouselWrapper}>
                <Carousel
                    layout="default"
                    data={subscriptionPlans}
                    renderItem={renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={itemWidth}
                    inactiveSlideScale={0.94}
                    firstItem={1}
                    inactiveSlideOpacity={0.7} />
            </View>

            <View style={styles.footerWrapper}>
                <ProfileButton
                    title="Sozlamalar"
                    icon={<Settings width={24} height={24} color={COLOR.black} />}
                    screen="Settings" />
            </View>

        </Container>
    )
}

const styles = StyleSheet.create({
    carouselWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselItem: {
        width: '100%',
        height: normalize(185),
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: COLOR.extraLightGrey,
        padding: 20,
        justifyContent: 'space-between',
    },
    subscriptionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subscriptionTitle: {
        fontSize: normalize(24),
        fontWeight: '600',
    },
    subscriptionPrice: {
        fontSize: fontSize.large,
        fontWeight: '600',
    },
    subscriptionDescription: {
        fontSize: fontSize.medium,
        marginTop: 15,
        color: COLOR.darkGrey,
    },
    activateButton: {
        width: '100%',
        height: normalize(42),
        backgroundColor: COLOR.black,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    activateTitle: {
        fontSize: fontSize.small,
        color: COLOR.white,
        fontWeight: '500',
    },

    footerWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})
