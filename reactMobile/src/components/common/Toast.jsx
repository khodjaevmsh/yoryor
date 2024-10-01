import Toast from 'react-native-toast-message'
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import React from 'react'
import { fontSize } from '../../utils/fontSizes'
import { COLOR } from '../../utils/colors'
import * as RootNavigation from '../../hooks/RootNavigation'
import { ChatRounded, Heart } from './Svgs'

export const toastConfig = {
    success: ({ text1, text2 }) => (
        <View style={styles.wrapper}>
            <View style={styles.leftSide} />
            <View style={styles.txtWrapper}>
                <Text style={styles.text1}>{text1}</Text>
                <Text style={styles.text2}>{text2}</Text>
            </View>
        </View>
    ),

    warning: ({ text1, text2 }) => (
        <View style={styles.wrapper}>
            <View style={[styles.leftSide, { backgroundColor: '#f6aa1c' }]} />
            <View style={styles.txtWrapper}>
                <Text style={styles.text1}>{text1}</Text>
                <Text style={styles.text2}>{text2}</Text>
            </View>
        </View>
    ),

    error: ({ text1, text2 }) => (
        <View style={styles.wrapper}>
            <View style={[styles.leftSide, { backgroundColor: '#ef233c' }]} />
            <View style={styles.txtWrapper}>
                <Text style={styles.text1}>{text1}</Text>
                <Text style={styles.text2}>{text2}</Text>
            </View>
        </View>
    ),

    message: ({ text1, text2, props }) => (
        <TouchableOpacity
            activeOpacity={1}
            style={[styles.wrapper, { backgroundColor: COLOR.white, paddingHorizontal: 20 }]}
            onPress={() => {
                Toast.hide()
                RootNavigation.navigate(props.screen)
            }}>
            <View style={styles.messageLeftSide}>
                {props.screen === 'Chats' ? <ChatRounded width={32} height={32} /> : <Heart width={32} height={32} />}
            </View>
            <View style={styles.messageTxtWrapper}>
                <Text style={styles.messageText1}>{text1}</Text>
                <Text style={styles.messageText2}>{text2}</Text>
            </View>
        </TouchableOpacity>
    )
    ,
}

export function showToast(type, text1, text2, props) {
    Toast.show({
        type,
        text1,
        text2,
        props,
        topOffset: Platform.OS === 'ios' ? normalize(55) : null,
        autoHide: true,
    })
}

const styles = StyleSheet.create({
    wrapper: {
        width: '95%',
        height: normalize(75),
        backgroundColor: '#495057',
        borderRadius: 15,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 7,
    },
    leftSide: {
        width: normalize(18),
        height: '100%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2bc016',
    },
    txtWrapper: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 16,
    },
    text1: {
        fontSize: fontSize.small,
        fontWeight: '600',
        color: COLOR.white,
    },
    text2: {
        fontSize: fontSize.small,
        color: COLOR.white,
        marginTop: 2,
    },

    messageLeftSide: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageTxtWrapper: {
        flex: 1,
        paddingHorizontal: 14,
    },
    messageText1: {
        fontSize: fontSize.medium,
        fontWeight: '600',
        color: COLOR.black,
    },
    messageText2: {
        fontSize: fontSize.medium,
        color: COLOR.darkGrey,
        marginTop: 2,
    },
})
