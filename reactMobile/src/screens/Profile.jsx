import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Settings } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import Container from '../components/common/Container'
import { baseAxios } from '../hooks/requests'
import { SINGLE_PROFILE_IMAGE } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import { COLOR } from '../utils/colors'
import SubscriptionCard from '../components/SubscriptionCard'
import MyProfileHeader from '../components/MyProfileHeader'
import HeaderLeft from '../components/common/HeaderLeft'
import HeaderRight from '../components/common/HeaderRight'
import SkeletonMyProfile from '../components/SkeletonMyProfile'

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
    const [myProfileImage, setMyProfileImage] = useState({})
    const { profile } = useContext(GlobalContext)
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <HeaderLeft title="Profil" />,
            headerRight: () => (
                <HeaderRight
                    icon={<Settings width={25} height={25} color={COLOR.black} />}
                    onPress={() => navigation.navigate('Settings')} />
            ),
        })
    }, [navigation])

    useEffect(() => {
        async function fetchMyProfile() {
            try {
                setLoading(true)
                const response = await baseAxios.get(SINGLE_PROFILE_IMAGE, { params: { profile: profile.id } })
                setMyProfileImage(response.data)
            } catch (error) {
                console.log(error.response.data)
            } finally {
                setLoading(false)
            }
        }
        fetchMyProfile()
    }, [])

    if (loading) {
        return <SkeletonMyProfile />
    }

    return (
        <Container containerStyle={styles.container}>
            <MyProfileHeader myProfileImage={myProfileImage} />
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
        </Container>
    )
}

const styles = StyleSheet.create({
    carouselWrapper: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    footerWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        marginHorizontal: 8,
    },
})
