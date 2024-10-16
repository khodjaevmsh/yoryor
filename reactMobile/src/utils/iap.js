import { Platform } from 'react-native'
import { clearTransactionIOS, finishTransaction,
    getSubscriptions,
    initConnection,
    purchaseErrorListener,
    purchaseUpdatedListener, requestSubscription } from 'react-native-iap'
import { subscriptionFields } from './choices'
import { baseAxios } from '../hooks/requests'
import { SUBSCRIPTION } from '../urls'
import { showToast } from '../components/common/Toast'

const itemSkus = Platform.select({
    ios: ['gold', 'platinum'],
    android: [],
})

export const initIAP = async (setProducts, setLoading = null) => {
    try {
        setLoading(true)
        const connected = await initConnection()

        if (connected) {
            const availableProducts = await getSubscriptions({ skus: itemSkus })

            const sortedProducts = availableProducts.sort((a, b) => (
                ['gold', 'platinum'].indexOf(a.productId) - ['gold', 'platinum'].indexOf(b.productId)
            ))

            const products = sortedProducts.map((product) => ({
                ...product,
                ...subscriptionFields[product.productId],
            }))
            setProducts(products)
        }
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
}

export const purchaseUpdateSubscription = purchaseUpdatedListener(
    async (purchase) => {
        if (purchase.transactionReceipt) {
            await finishTransaction({ purchase })
            console.log('Purchase updated listener work...')
        }
    },
)

export const purchaseErrorSubscription = purchaseErrorListener((error) => {
    console.warn('Purchase error', error)
})

export const handlePurchase = async (productId, user, setSubscription, setLoading, setModalVisible = {}) => {
    try {
        setLoading(true)
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

            setModalVisible(false)

            showToast('success', 'Woohoo!', `Siz ${productId} tarifini xarid qildingiz`)
        }
    } catch (error) {
        console.log(error.message || error.response.data)
    } finally {
        setLoading(false)
    }
}
