import React from 'react'
import RNModal from 'react-native-modal'
import { StyleSheet, View } from 'react-native'

export default function CenteredModal({ children, isModalVisible, setModalVisible }) {
    return (
        <RNModal
            isVisible={isModalVisible}
            animationIn="bounceInUp"
            animationOut="fadeOutDown"
            animationInTiming={450}
            animationOutTiming={300}
            backdropTransitionOutTiming={0}
            coverScreen
            onBackdropPress={() => setModalVisible(false)}
            hasBackdrop
            backdropOpacity={0.2}
            style={styles.modal}>
            <View style={styles.modalContent}>
                <View style={styles.innerContainer}>
                    {children}
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
    },
    modalContent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
})
