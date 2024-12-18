import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { ChevronRight } from 'react-native-feather'
import React from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'
import { shortenText } from '../utils/string'

export default function ProfileInfo({ title, icon, screen, props }) {
    const navigation = useNavigation()

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate(screen, { props })}>
            <View style={styles.wrapper}>
                <View style={styles.leftSide}>
                    {/* eslint-disable-next-line max-len */}
                    <View style={[styles.icon, { backgroundColor: props?.value ? COLOR.lightPrimary : COLOR.extraLightGrey }]}>
                        {icon}
                    </View>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subTitle}>
                            {shortenText(props?.value || "Ko'rsatilmagan", 28)}
                        </Text>
                    </View>
                </View>
                <ChevronRight width={22} height={22} strokeWidth={2.5} color={COLOR.grey} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        // height: normalize(72),
        paddingVertical: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 0.2,
        borderColor: COLOR.lightGrey,
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: normalize(38),
        height: normalize(38),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.extraLightGrey,
        borderRadius: 13,
        marginRight: 12,
    },
    title: {
        fontSize: fontSize.small,
        fontWeight: '500',
        marginBottom: 4,
    },
    subTitle: {
        color: COLOR.grey,
    },
})
