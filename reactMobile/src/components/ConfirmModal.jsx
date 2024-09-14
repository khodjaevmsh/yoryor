import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { AlertCircle } from 'react-native-feather'
import normalize from 'react-native-normalize'
import RNModal from 'react-native-modal'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'

export default function ConfirmModal({
    title,
    subTitle,
    icon,
    isModalConfirm,
    setModalConfirm,
    cancel,
    cancelTitle,
    modalStyle,
}) {
    return (
        <RNModal
            isVisible={isModalConfirm}
            animationIn="zoomIn"
            animationOut="fadeOut"
            backdropTransitionOutTiming={0}
            coverScreen
            onBackdropPress={() => setModalConfirm(false)}
            hasBackdrop
            backdropOpacity={0.3}
            style={styles.modal}>
            <View style={[styles.modalChildren, { ...modalStyle }]}>
                <View style={styles.content}>
                    <AlertCircle width={34} height={34} color={COLOR.primary} />
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.iconWrapper}>
                        <Text style={styles.subTitle}>{subTitle || null}</Text>
                        {icon || null}
                    </View>
                </View>

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={cancel}>
                        <Text style={styles.buttonTitle}>{cancelTitle || 'Bekor qilish'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setModalConfirm(false)}
                        style={[styles.button, { backgroundColor: COLOR.white, borderWidth: 2, borderColor: COLOR.lightGrey }]}>
                        <Text style={[styles.buttonTitle, { color: COLOR.black }]}>Ortga</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </RNModal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalChildren: {
        width: normalize(310),
        height: normalize(190),
        borderRadius: 22,
        padding: 15,
        backgroundColor: COLOR.white,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
    },
    title: {
        fontSize: fontSize.medium,
        fontWeight: '500',
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: fontSize.small,
        textAlign: 'center',
        lineHeight: 20,
        marginRight: 4,
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        width: normalize(128),
        height: normalize(38),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 55,
        backgroundColor: COLOR.primary,
    },
    buttonTitle: {
        color: COLOR.white,
        fontWeight: '500',
    },
})
