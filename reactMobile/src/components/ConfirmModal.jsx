import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { AlertCircle } from 'react-native-feather'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import RNModal from 'react-native-modal'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'

export default function ConfirmModal({ isModalConfirm, setModalConfirm, cancel }) {
    const navigation = useNavigation()

    return (
        <RNModal
            isVisible={isModalConfirm}
            animationIn="zoomIn"
            animationOut="fadeOut"
            animationInTiming={280}
            animationOutTiming={380}
            backdropTransitionOutTiming={0}
            coverScreen
            onBackdropPress={() => setModalConfirm(false)}
            hasBackdrop
            backdropOpacity={0.3}
            style={styles.modal}>

            <View style={styles.modalChildren}>

                <View style={styles.content}>
                    <AlertCircle width={32} height={32} color={COLOR.primary} />
                    <Text style={styles.title}>Bekor qilmoqchimisiz?</Text>
                    <Text style={styles.subTitle}>Diqqat, siz kiritgan ma'lumotlarning barchasi bekor bo'ladi!</Text>
                </View>

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={cancel}>
                        <Text style={styles.buttonTitle}>Bekor qilish</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalConfirm(false)} style={[styles.button, { backgroundColor: COLOR.lightGrey }]}>
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
    },
    modalChildren: {
        width: normalize(310),
        height: normalize(198),
        borderRadius: 18,
        padding: 16,
        backgroundColor: COLOR.white,
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: fontSize.medium,
        fontWeight: '500',
        marginTop: 7,
        marginBottom: 10,
    },
    subTitle: {
        fontSize: fontSize.small,
        textAlign: 'center',
        lineHeight: 20,
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
        borderRadius: 12,
        backgroundColor: COLOR.primary,
    },
    buttonTitle: {
        color: COLOR.white,
        fontWeight: '500',
    },
})
