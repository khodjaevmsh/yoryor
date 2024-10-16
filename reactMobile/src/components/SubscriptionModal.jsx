import { Text, View, StyleSheet, Platform, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import RNModal from 'react-native-modal'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { X, Check, Lock } from 'react-native-feather'
import LinearGradient from 'react-native-linear-gradient'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import Button from './common/Button'
import { handlePurchase } from '../utils/iap'
import { SubscriptionContext } from '../context/SubscriptionContext'
import { GlobalContext } from '../context/GlobalContext'

const itemWidth = Dimensions.get('window').width * 0.90
const sliderWidth = Dimensions.get('window').width

export default function SubscriptionModal({ isModalVisible, setModalVisible, products }) {
    const [loading, setLoading] = useState(false)
    const [index, setIndex] = useState(0)
    const selectedProduct = products.length > 0 ? products[index] : []

    const { user } = useContext(GlobalContext)
    const { subscription, setSubscription } = useContext(SubscriptionContext)

    const purchase = () => {
        handlePurchase(selectedProduct.productId, user, setSubscription, setLoading, setModalVisible)
    }

    return (
        <RNModal
            isVisible={isModalVisible}
            animationIn="bounceInUp"
            animationOut="fadeOutDown"
            style={styles.modal}>
            <View style={styles.modalContent}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <X width={32} height={32} color={COLOR.black} strokeWidth={2.5} />
                    </TouchableOpacity>
                    <Text style={styles.headerLabel}>Obunalar</Text>
                    <X width={32} height={32} color={COLOR.black} opacity={0} strokeWidth={2.5} />
                </View>
                <View style={styles.subscriptionWrapper}>
                    <Carousel
                        layout="default"
                        data={products}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={purchase}
                                style={[styles.shadow, { shadowColor: item.color }]}>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 0, y: 2 }}
                                    colors={item.background}
                                    style={[styles.subscriptionItem, { borderColor: item.color }]}>
                                    <Text style={styles.logo}>YorYor</Text>
                                    <View style={[styles.tagWrapper, { backgroundColor: item.color }]}>
                                        <Text style={styles.tag}>{item.productId}</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        )}
                        activeSlideAlignment="center"
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                        inactiveSlideScale={0.95}
                        onSnapToItem={(i) => setIndex(i)} />
                    <Pagination
                        dotsLength={products.length}
                        activeDotIndex={index}
                        containerStyle={styles.paginationContainer}
                        dotStyle={styles.paginationDot}
                        inactiveDotStyle={styles.inactivePaginationDot}
                        inactiveDotOpacity={0.5}
                        inactiveDotScale={0.6}
                    />
                </View>

                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.scrollViewItem}>
                        {selectedProduct?.description?.map((desc, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                            <View style={styles.descriptionWrapper} key={i}>
                                {desc.available ? (
                                    <Check width={22} height={22} strokeWidth={4.5} color={COLOR.primary} />
                                ) : (
                                    <Lock width={22} height={22} strokeWidth={3.5} color={COLOR.grey} />
                                )}
                                <Text style={styles.description}>{desc.label}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Button
                        title={subscription.type !== selectedProduct?.productId ? (
                            `Aktivlashtirish $${selectedProduct?.price} - oyiga`
                        ) : (
                            'Xarid qilingan'
                        )}
                        textStyle={styles.buttonStyle}
                        buttonStyle={{
                            backgroundColor: selectedProduct?.color,
                            opacity: selectedProduct?.productId === subscription.type ? 0.6 : 1,
                        }}
                        disabled={selectedProduct?.productId === subscription.type}
                        onPress={purchase}
                        loading={loading} />
                </View>
            </View>
        </RNModal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        backgroundColor: COLOR.white,
    },
    modalContent: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        paddingVertical: Platform.OS === 'ios' ? 58 : 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    headerLabel: {
        fontSize: fontSize.medium,
        fontWeight: '600',
    },
    subscriptionWrapper: {
        // flex: 1,
        // backgroundColor: 'red',
    },
    shadow: {
        // Shadow for iOS
        shadowOffset: { width: 1, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        // Shadow for Android
        elevation: 5,
    },
    subscriptionItem: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        marginVertical: 20,

    },
    logo: {
        fontSize: 28,
        fontWeight: '700',
    },
    tagWrapper: {
        padding: 4,
        borderRadius: 3,
        marginLeft: 7,
        marginTop: 3,
    },
    tag: {
        fontSize: 12,
        color: COLOR.white,
        fontWeight: '700',
        fontStyle: 'italic',
        textTransform: 'uppercase',
    },
    paginationContainer: {
        paddingVertical: 0,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    inactivePaginationDot: {
        width: 10,
        height: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    scrollViewItem: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: COLOR.lightGrey,
        borderRadius: 8,
        padding: 17,
    },
    descriptionWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
    },
    description: {
        fontSize: fontSize.small,
        color: COLOR.darkGrey,
        fontWeight: '600',
        marginLeft: 12,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingHorizontal: 15,
        borderTopWidth: 0.3,
        borderTopColor: COLOR.darkGrey,
    },
    buttonStyle: {
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
})
