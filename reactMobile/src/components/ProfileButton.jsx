import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { ChevronRight } from 'react-native-feather'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import normalize from 'react-native-normalize'
import { COLOR } from '../utils/colors'
import { fontSize } from '../utils/fontSizes'

export default function ProfileButton({ title, screen, icon }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(screen)}
            style={styles.settingsButton}>
            <View style={styles.iconTitleWrapper}>
                <View style={styles.buttonIcon}>
                    {icon}
                </View>
                <Text style={styles.settingsTitle}>{title}</Text>
            </View>
            <ChevronRight width={24} height={24} color={COLOR.black} strokeWidth={3} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    settingsButton: {
        height: normalize(38),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonIcon: {
        padding: 6,
        borderRadius: 8,
        backgroundColor: COLOR.extraLightGrey,
    },

    settingsTitle: {
        fontSize: fontSize.medium,
        fontWeight: '500',
        marginLeft: 10,
    },
})
