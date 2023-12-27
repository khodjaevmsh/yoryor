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
    onBackdropPress,
    children,
    styleModal,
    styleChildren,
    isModalVisible,
}) {
    return (
        <View>
            <RNModal
                animationIn={animationIn}
                animationOut={animationOut}
                isVisible={isModalVisible}
                coverScreen={coverScreen}
                backdropColor={backdropColor}
                backdropOpacity={backdropOpacity}
                onBackdropPress={onBackdropPress}
                style={[styles.styleModal, styleModal]}
                hasBackdrop={hasBackdrop}>

                <View style={[styles.styleChildren, styleChildren]}>
                    {children}
                </View>

            </RNModal>
        </View>
    )
}

const styles = StyleSheet.create({
    styleChildren: {
        backgroundColor: 'red',
    },
})
