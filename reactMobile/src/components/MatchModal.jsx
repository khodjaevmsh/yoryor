import RNModal from 'react-native-modal'
import React from 'react'
import { Text, StyleSheet, View, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { domain } from '../hooks/requests'
import Button from './common/Button'

export default function MatchModal({ isModalVisible, setModalVisible, receiver }) {
    return (
        <RNModal
            isVisible={isModalVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={400}
            animationOutTiming={300}
            style={styles.modal}>
            <View style={styles.childrenModal}>
                <ImageBackground
                    src={receiver && receiver.images ? `${domain + receiver.images[0].image}` : null}
                    resizeMode="cover"
                    style={styles.imageBackground}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.6)', 'transparent', 'transparent', 'rgba(0,0,0,0.3)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.linearGradient}>
                        <View style={styles.matchWrapper}>
                            <Text style={styles.congratulationTitle}>Tabriklaymiz</Text>
                            <View style={styles.itsWrapper}>
                                <Text style={styles.congratulationTitle}>bu </Text>
                                <View style={styles.matchBox}>
                                    <Text style={styles.match}>match!</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <Button
                                title="Qidiruvga qaytish"
                                buttonStyle={styles.button}
                                onPress={() => setModalVisible(false)} />
                        </View>
                    </LinearGradient>
                </ImageBackground>
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
    },

    imageBackground: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingVertical: 34,
        paddingHorizontal: 18,
    },
    matchWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 42,
    },
    congratulationTitle: {
        fontSize: fontSize.extraLarge,
        color: COLOR.white,
        fontWeight: '800',
        fontStyle: 'italic',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    itsWrapper: {
        flexDirection: 'row',
    },
    matchBox: {
        backgroundColor: COLOR.white,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    match: {
        fontSize: fontSize.extraLarge,
        color: COLOR.primary,
        fontWeight: '800',
        fontStyle: 'italic',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },

    footer: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    button: {
        marginVertical: 4,
    },
})
