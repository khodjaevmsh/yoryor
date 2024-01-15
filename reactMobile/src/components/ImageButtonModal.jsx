import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import normalize from 'react-native-normalize'

import RNModal from 'react-native-modal'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'

export default function ImageButtonModal({
    isModalVisible,
    setModalVisible,
    pickImage,
    selectedImageIndex,
    handleDelete,
    fetchedImages,
}) {
    return (
        <View>
            <RNModal
                isVisible={isModalVisible}
                animationIn="bounceInUp"
                animationOut="slideOutDown"
                animationInTiming={800}
                coverScreen
                hasBackdrop
                onBackdropPress={() => setModalVisible(false)}
                style={styles.modal}
                backdropOpacity={0.5}>

                <View style={[styles.modalChild, { height: selectedImageIndex >= 2 && fetchedImages[selectedImageIndex] ? normalize(215) : 175 }]}>
                    <View style={{ backgroundColor: COLOR.white, borderRadius: 18 }}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => pickImage(selectedImageIndex)}>
                            <Text style={styles.buttonText}>Yangi rasm qo'shish</Text>
                        </TouchableOpacity>
                        {selectedImageIndex >= 2 && fetchedImages[selectedImageIndex] && fetchedImages[selectedImageIndex] ? (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.button, styles.middleButton]}
                                onPress={handleDelete}>
                                <Text style={[styles.buttonText, { color: COLOR.red }]}>O'chirish</Text>
                            </TouchableOpacity>
                        ) : null}

                    </View>

                    <View style={styles.lastButtonWrapper}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={() => setModalVisible(false)}>
                            <Text style={[styles.buttonText, { color: COLOR.darkGrey }]}>Ortga</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </RNModal>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalChild: {
        height: normalize(220),
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    button: {
        width: '100%',
        height: normalize(52),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: fontSize.medium,
        fontWeight: '500',
    },
    middleButton: {
        borderTopWidth: 1,
        borderColor: COLOR.lightGrey,
    },
    lastButtonWrapper: {
        marginTop: 10,
        borderRadius: 18,
        backgroundColor: COLOR.white,
    },
})
