import LinearGradient from 'react-native-linear-gradient'
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'
import React, { useContext, useState } from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { BlurView } from '@react-native-community/blur'
import { COLOR } from '../utils/colors'
import { shortenText } from '../utils/string'
import ProfileImage from './ProfileImage'
import { SubscriptionContext } from '../context/SubscriptionContext'
import CenteredModal from './CenteredModal'
import Button from './common/Button'

export default function LikeItem({ item }) {
    const [isModalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation()
    const age = new Date().getFullYear() - moment(item.sender.birthdate).format('YYYY')
    const { subscription } = useContext(SubscriptionContext)

    const onPress = () => {
        if (subscription.isActive) {
            navigation.navigate('ReceiverDetail', { receiverId: item.sender.id })
        } else {
            setModalVisible(true)
        }
    }

    return (
        <>
            <TouchableOpacity
                style={styles.item}
                activeOpacity={1}
                onPress={onPress}>
                <ProfileImage
                    blurred
                    image={item.sender && item.sender.images && item.sender.images[0]}
                    imageStyle={styles.image} />
                {!subscription.isActive ? (
                    <BlurView style={styles.absoluteBlur} blurType="light" blurAmount={12} />
                ) : null}
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
                    start={{ x: 0.5, y: 0.0 }}
                    style={styles.linearGradient}>
                    <Text style={styles.bottomText}>{shortenText(item.sender.name, 15)}, {age}</Text>
                </LinearGradient>
            </TouchableOpacity>
            <CenteredModal isModalVisible={isModalVisible} setModalVisible={setModalVisible}>
                <Text style={styles.modalText}>
                    Kim like qoyganini ko'rish uchun siz Gold yoki Platinum tarifini xarid qilishingiz kerak.
                </Text>
                <Button title="Xarid qilish" buttonStyle={styles.modalButtonStyle} onPress={() => {
                    navigation.navigate('Profile')
                    setModalVisible(false)
                }} />
            </CenteredModal>
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: 4,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 24,
    },
    image: {
        width: '100%',
        height: normalize(220),
        borderRadius: 24,
    },
    absoluteBlur: {
        position: 'absolute',
        top: 0,
        bottom: 4.5,
        left: 4,
        right: 4,
        borderRadius: 24,
    },
    bottomText: {
        color: COLOR.white,
        fontSize: normalize(Platform.OS === 'ios' ? 13 : 15),
        fontWeight: '600',
        paddingLeft: 15,
        paddingRight: 5,
        paddingVertical: 14,
    },
    linearGradient: {
        position: 'absolute',
        bottom: 4.5,
        left: 4,
        right: 4,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalText: {
        fontSize: normalize(15),
        textAlign: 'center',
        fontWeight: '300',
        color: COLOR.darkGrey,
        lineHeight: 22,
        marginBottom: 22,
    },
    modalButtonStyle: {
        height: normalize(44),
    },
})
