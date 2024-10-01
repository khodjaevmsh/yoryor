import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Dimensions, Platform, StyleSheet, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Settings } from 'react-native-feather'
import { useNavigation } from '@react-navigation/native'
import { clearTransactionIOS,
    endConnection,
    finishTransaction,
    getSubscriptions,
    initConnection, purchaseErrorListener, purchaseUpdatedListener,
    requestSubscription } from 'react-native-iap'
import Container from '../components/common/Container'
import { baseAxios } from '../hooks/requests'
import { SINGLE_PROFILE_IMAGE, SUBSCRIPTION } from '../urls'
import { GlobalContext } from '../context/GlobalContext'
import { COLOR } from '../utils/colors'
import SubscriptionCard from '../components/SubscriptionCard'
import MyProfileHeader from '../components/MyProfileHeader'
import HeaderLeft from '../components/common/HeaderLeft'
import HeaderRight from '../components/common/HeaderRight'
import SkeletonMyProfile from '../components/SkeletonMyProfile'
import { SubscriptionContext } from '../context/SubscriptionContext'
import { showToast } from '../components/common/Toast'
import { subscriptionFields } from '../utils/choices'

const itemWidth = Dimensions.get('window').width * 0.90
const sliderWidth = Dimensions.get('window').width

const itemSkus = Platform.select({
    ios: ['gold', 'platinum'],
    android: [],
})

export default function Profile() {
    const [loading, setLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [myProfileImage, setMyProfileImage] = useState({})
    const [products, setProducts] = useState([])
    const { user, profile } = useContext(GlobalContext)
    const { setSubscription } = useContext(SubscriptionContext)
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
            }
        }
        fetchMyProfile()
    }, [profile.id])

    useEffect(() => {
        const initIAP = async () => {
            try {
                setLoading(true)
                const connected = await initConnection()

                if (connected) {
                    const availableProducts = await getSubscriptions({ skus: itemSkus })

                    const sortedProducts = availableProducts.sort((a, b) => (
                        ['gold', 'platinum'].indexOf(a.productId) - ['gold', 'platinum'].indexOf(b.productId)
                    ))

                    const enhancedProducts = sortedProducts.map((product) => ({
                        ...product,
                        ...subscriptionFields[product.productId],
                    }))
                    setProducts(enhancedProducts)
                }
            } catch (error) {
                console.warn(error)
            } finally {
                setLoading(false)
            }
        }

        initIAP()

        const purchaseUpdateSubscription = purchaseUpdatedListener(
            async (purchase) => {
                if (purchase.transactionReceipt) {
                    await finishTransaction({ purchase })
                    console.log('Purchase updated listener work...')
                }
            },
        )

        const purchaseErrorSubscription = purchaseErrorListener((error) => {
            console.warn('Purchase error', error)
        })

        return () => {
            purchaseUpdateSubscription.remove()
            purchaseErrorSubscription.remove()
            endConnection()
        }
    }, [])

    const handlePurchase = async (productId) => {
        try {
            setButtonLoading(true)

            if (Platform.OS === 'ios') {
                await clearTransactionIOS()
            }
            const purchase = await requestSubscription({ sku: productId })

            const response = await baseAxios.post(SUBSCRIPTION, {
                productId: purchase.productId,
                transactionId: purchase.transactionId,
                purchaseToken: purchase.purchaseToken,
                receiptData: purchase.transactionReceipt,
                platform: Platform.OS,
                user: user.id,
            })

            if (response.status === 201) {
                await finishTransaction({ purchase })

                setSubscription({ isActive: true, type: response.data.productId })

                showToast('success', 'Woohoo!', `Siz ${productId} tarifini xarid qildingiz`)
            }
        } catch (error) {
            console.log(error.message || error.response.data)
        } finally {
            setButtonLoading(false)
        }
    }

    if (loading) {
        return <SkeletonMyProfile />
    }

    return (
        <Container containerStyle={styles.container}>
            <MyProfileHeader myProfileImage={myProfileImage} />
            <View style={styles.carouselWrapper}>
                <Carousel
                    layout="default"
                    data={products}
                    renderItem={({ item }) => (
                        <SubscriptionCard
                            item={item}
                            handlePurchase={handlePurchase}
                            buttonLoading={buttonLoading} />
                    )}
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
