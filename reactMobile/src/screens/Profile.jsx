import React, { useCallback, useContext, useLayoutEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Settings } from 'react-native-feather'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { endConnection } from 'react-native-iap'
import Container from '../components/common/Container'
import { baseAxios } from '../hooks/requests'
import { SINGLE_PROFILE_IMAGE } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import { COLOR } from '../utils/colors'
import HeaderLeft from '../components/common/HeaderLeft'
import HeaderRight from '../components/common/HeaderRight'
import SkeletonMyProfile from '../components/SkeletonMyProfile'
import PurchaseItem from '../components/PurchaseItem'
import ProfileHeader from '../components/ProfileHeader'
import SubscriptionModal from '../components/SubscriptionModal'
import { initIAP, purchaseUpdateSubscription, purchaseErrorSubscription } from '../utils/iap'
import SubscriptionItem from '../components/SubscriptionItem'

const itemWidth = Dimensions.get('window').width * 0.90
const sliderWidth = Dimensions.get('window').width

export default function Profile() {
    const [loading, setLoading] = useState(false)
    const [profileImage, setProfileImage] = useState({})
    const [products, setProducts] = useState([])
    const [isModalVisible, setModalVisible] = useState(false)
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

    useFocusEffect(
        useCallback(() => {
            async function fetchProfileImage() {
                try {
                    setLoading(true)
                    const response = await baseAxios.get(SINGLE_PROFILE_IMAGE, {
                        params: { profile: profile.id },
                    })
                    setProfileImage(response.data)
                } catch (error) {
                    console.log(error.response.data)
                }
            }

            fetchProfileImage()

            initIAP(setProducts, setLoading)

            return () => {
                purchaseUpdateSubscription.remove()
                purchaseErrorSubscription.remove()
                endConnection()
            }
        }, [profile.id]),
    )

    if (loading) {
        return <SkeletonMyProfile />
    }

    return (
        <Container containerStyle={styles.container}>
            <ProfileHeader image={profileImage} loading={loading} />
            <PurchaseItem />
            <View style={styles.carouselWrapper}>
                <Carousel
                    layout="default"
                    data={products}
                    renderItem={({ item }) => (
                        <SubscriptionItem
                            item={item}
                            setModalVisible={setModalVisible}
                            // subscription={subscription}
                            // setSubscription={setSubscription}
                            // user={user}
                        />
                    )}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    inactiveSlideScale={0.95}
                    firstItem={1}
                    inactiveSlideOpacity={1} />
            </View>
            <SubscriptionModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                products={products} />
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
