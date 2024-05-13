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
    return (
        <RNModal
            isVisible={isModalVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
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
                    <Text style={styles.youAndText}>
                        Siz va {receiver.name} like qoydingizlar!
                    </Text>

                    <Text style={styles.youAndSubText}>
                        Muloqotni hoziroq boshlang
                    </Text>
                </View>

                <Container>
                    <View style={styles.footer}>
                        <Button title="Xabar yuborish" buttonStyle={styles.button} onPress={() => {
                            setModalVisible(false)
                            navigation.navigate('ChatDetail', { room })
                        }} />
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
        fontSize: normalize(22),
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 14,
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
        marginVertical: 14,
    },
})
