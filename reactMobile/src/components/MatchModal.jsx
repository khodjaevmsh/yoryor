import RNModal from 'react-native-modal'
import React from 'react'
import { Text, StyleSheet, View, ImageBackground } from 'react-native'
import normalize from 'react-native-normalize'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { COLOR } from '../utils/colors'
import confetti from '../assets/images/confetti.png'
import { fontSize } from '../utils/fontSizes'
import { domain } from '../hooks/requests'
import Button from './common/Button'
import Container from './common/Container'
import ButtonOutline from './common/ButtonOutline'

export default function MatchModal({ isModalVisible, setModalVisible, room, sender, receiver }) {
    const navigation = useNavigation()

    async function onSendMessage() {
        await setModalVisible(false)
        setTimeout(() => {
            navigation.navigate('ChatDetail', { room })
        }, 300)
    }

    return (
        <RNModal
            isVisible={isModalVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={400}
            animationOutTiming={300}
            style={styles.modal}>
            <View style={styles.childrenModal}>
                <ImageBackground source={confetti} resizeMode="cover" style={styles.background}>
                    <Text style={styles.congratulation}>TABRIKLAYMIZ</Text>
                    <View style={styles.matchTextWrapper}>
                        <Text style={styles.subCongratulation}>BU </Text>
                        <View style={styles.matchWrapper}>
                            <Text style={styles.matchText}>MATCH!</Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.contentWrapper}>
                    <FastImage
                        style={[styles.userImg, { position: 'relative', left: 25 }]}
                        source={{
                            uri: sender ? `${domain + sender.images[0].image}` : null,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover} />

                    <FastImage
                        style={[styles.userImg, { position: 'relative', right: 25 }]}
                        source={{
                            uri: receiver ? `${domain + receiver.images[0].image}` : null,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover} />
                </View>

                <View style={styles.preFooterWrapper}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={styles.youAndText}>Siz va</Text>
                        <View style={styles.receiverNameWrapper}>
                            <Text style={styles.receiverName}>{receiver.name}</Text>
                        </View>
                        <Text style={styles.youAndText}>like qoydingizlar!</Text>
                    </View>

                    <Text style={styles.youAndSubText}>
                        Muloqotni hoziroq boshlang
                    </Text>
                </View>

                <Container>
                    <View style={styles.footer}>
                        <Button title="Xabar yuborish" buttonStyle={styles.button} onPress={onSendMessage} />
                        <ButtonOutline title="Qidirishni davom ettirish" onPress={() => setModalVisible(false)} />
                    </View>
                </Container>
            </View>
        </RNModal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        margin: 0,
    },
    childrenModal: {
        flex: 1,
        backgroundColor: COLOR.white,
    },
    background: {
        flex: 1,
        paddingVertical: 32,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    congratulation: {
        fontSize: fontSize.extraLarge,
        fontWeight: '500',
    },
    matchTextWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    subCongratulation: {
        fontSize: normalize(28),
        fontWeight: '500',
    },

    matchWrapper: {
        backgroundColor: COLOR.primary,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    matchText: {
        fontSize: normalize(28),
        fontWeight: '700',
        color: COLOR.white,
    },

    contentWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 52,
    },
    userImg: {
        width: normalize(185),
        height: normalize(185),
        borderRadius: 200,
        borderWidth: 6,
        borderColor: COLOR.extraLightGrey,
    },

    preFooterWrapper: {
        flex: 0.5,
        alignItems: 'center',
    },
    youAndText: {
        fontSize: normalize(18),
        fontWeight: '500',
    },
    receiverNameWrapper: {
        marginHorizontal: 5,
        paddingVertical: 4,
        paddingHorizontal: 6,
        backgroundColor: COLOR.primary,
        borderRadius: 10,
    },
    receiverName: {
        color: COLOR.white,
        fontSize: normalize(18),
        fontWeight: '500',
    },
    youAndSubText: {
        fontSize: normalize(16),
        textAlign: 'center',
        color: COLOR.grey,
    },

    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        marginVertical: 12,
    },
})
