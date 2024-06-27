import React from 'react'
import { Composer, InputToolbar, Send } from 'react-native-gifted-chat'
import normalize from 'react-native-normalize'
import { View, StyleSheet } from 'react-native'
import { ArrowUp } from 'react-native-feather'
import { COLOR } from '../utils/colors'

export default function InputToolBar({ props }) {
    return (
        <InputToolbar
            {...props}
            containerStyle={styles.containerStyle}
            renderComposer={(composerProps) => (
                <Composer
                    {...composerProps} t
                    textInputStyle={styles.textInputStyle}
                    textInputProps={styles.textInputProps} />
            )}
            renderSend={(sendProps) => (
                <Send {...sendProps} containerStyle={styles.sendContainerStyle}>
                    <View style={styles.iconWrapper}>
                        <ArrowUp width={24} height={24} strokeWidth={2.5} color={COLOR.blue} />
                    </View>
                </Send>
            )}
        />
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderTopWidth: 0,
    },
    textInputStyle: {
        overflow: 'hidden',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLOR.lightGrey,
    },
    textInputProps: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
        fontSize: normalize(15),
        textAlignVertical: 'center',
    },
    sendContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 7,
        marginRight: 12,
        marginBottom: 2,
    },
    iconWrapper: {
        borderRadius: 100,
        minWidth: 35,
        minHeight: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e2eaef',
    },
})
