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
    parentalStyleModal,
    animationInTiming,
    animationOutTiming,
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
                animationInTiming={animationInTiming}
                animationOutTiming={animationOutTiming}
                backdropColor={backdropColor}
                backdropOpacity={backdropOpacity}
                onBackdropPress={onBackdropPress}
                style={[styles.parentalStyleModal, parentalStyleModal]}
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
