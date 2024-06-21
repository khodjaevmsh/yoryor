import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Edit, Settings } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import Container from '../components/common/Container'
import { baseAxios } from '../hooks/requests'
import { PROFILE_IMAGES } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import { COLOR } from '../utils/colors'
import ProfileButton from '../components/ProfileButton'
import SubscriptionCard from '../components/SubscriptionCard'
import MyProfileHeader from '../components/MyProfileHeader'
import ActivityIndicator from '../components/common/ActivityIndicator'

const itemWidth = Dimensions.get('window').width * 0.90
const sliderWidth = Dimensions.get('window').width

const subscriptionPlans = [
    {
        id: 1,
        background: ['#ffe38e', '#ffdf8e', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
        border: '#DAA520',
        name: 'Sovchi Gold',
        price: '149 000 UZS',
        description: 'lorem isum dollor set, imut be.',
    },
    {
        id: 2,
        background: ['#cfcfca', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
        border: '#000000',
        name: 'Sovchi Platinum',
        price: '269 000 UZS',
        description: 'lorem isum dollor set, imut be.',
    },
]

export default function Profile() {
    const [loading, setLoading] = useState(false)
    const [fetchMyImages, setFetchedMyImages] = useState([])
    const { profile: myProfile, render, setRender } = useContext(GlobalContext)
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 18 }}>
                    <Text style={{ fontSize: normalize(22), fontWeight: '700' }}>
                        Profil
                    </Text>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 18 }} onPress={() => navigation.navigate('MyProfileDetail')}>
                    <Edit width={25} height={25} color={COLOR.black} />
                </TouchableOpacity>
            ),
        })
    }, [navigation])

    useEffect(() => {
        async function fetchMyProfile() {
            try {
                setLoading(true)
                const response = await baseAxios.get(PROFILE_IMAGES, { params: { profile: myProfile.id } })
                setFetchedMyImages(response.data[0])
            } catch (error) {
                console.log(error.response)
            } finally {
                setRender(false)
                setLoading(false)
            }
        }
        fetchMyProfile()
    }, [myProfile.id, render])

    if (loading) {
        return <ActivityIndicator />
    }

    return (
        <Container containerStyle={styles.container}>
            <MyProfileHeader fetchMyImages={fetchMyImages} />

            <View style={styles.carouselWrapper}>
                <Carousel
                    layout="default"
                    data={subscriptionPlans}
                    renderItem={({ item }) => <SubscriptionCard item={item} />}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    inactiveSlideScale={0.95}
                    firstItem={1}
                    inactiveSlideOpacity={1} />
            </View>

            <View style={styles.footerWrapper}>
                <ProfileButton
                    title="Sozlamalar"
                    icon={<Settings width={24} height={24} color={COLOR.black} strokeWidth={2.3} />}
                    screen="Settings" />
            </View>

        </Container>
    )
}

const styles = StyleSheet.create({
    carouselWrapper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    footerWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        marginHorizontal: 8,
    },
})
