import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import React, { useContext, useEffect } from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { Edit } from 'react-native-feather'
import moment from 'moment'
import { domain } from '../hooks/requests'
import { determineFontSize } from '../utils/string'
import { CheckMarkBlue } from './common/Svgs'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import { GlobalContext } from '../context/GlobalContext'

export default function MyProfileHeader({ fetchMyImages }) {
    const { profile } = useContext(GlobalContext)
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('MyProfileDetail')}
            style={styles.profileDetail}>
            <View style={styles.imageWrapper}>
                <FastImage style={styles.imageButton} source={{
                    uri: `${domain + fetchMyImages.image}`,
                    priority: FastImage.priority.high,
                }} resizeMode={FastImage.resizeMode.cover} />
            </View>
            <View style={styles.nameWrapper}>
                <Text style={[styles.name, { fontSize: determineFontSize(profile.name, 26) }]}>
                    {profile.name}, {new Date().getFullYear() - moment(profile.birthdate).format('YYYY')}
                </Text>
                <View style={styles.checkMark}>
                    <CheckMarkBlue width={24} height={24} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    profileDetail: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageWrapper: {
        borderWidth: 6,
        borderColor: COLOR.extraLightGrey,
        borderRadius: 100,
        padding: 10,
    },
    imageButton: {
        width: normalize(120),
        height: normalize(120),
        borderRadius: 100,
    },
    emptyImage: {
        width: normalize(65),
        height: normalize(65),
        borderRadius: 14,
        marginRight: 8,
        backgroundColor: COLOR.extraLightGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    name: {
        fontWeight: '500',
    },
    checkMark: {
        marginLeft: 10,
    },
    region: {
        fontSize: fontSize.small,
        marginTop: 3,
        marginLeft: 1,
        color: COLOR.grey,
    },

})
