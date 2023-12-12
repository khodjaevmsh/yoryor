import React from 'react'
import { View, StyleSheet } from 'react-native'
import RNModal from 'react-native-modal'

export default function Modal({
    animationIn = 'slideInUp',
    animationOut = 'slideOutDown',
    coverScreen,
    hasBackdrop,
    backdropColor,
    backdropOpacity,
    children,
    style,
    isModalVisible,
}) {
    return (
        <View style={{ flex: 1 }}>
            <RNModal
                animationIn={animationIn}
                animationOut={animationOut}
                isVisible={isModalVisible}
                coverScreen={coverScreen}
                backdropColor={backdropColor}
                backdropOpacity={backdropOpacity}
                hasBackdrop={hasBackdrop}>

                <View style={[styles.modal, style]}>
                    {children}
                </View>

            </RNModal>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
    },
})
