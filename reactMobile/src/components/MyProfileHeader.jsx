import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import React, { useContext } from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { domain } from '../hooks/requests'
import { determineFontSize } from '../utils/string'
import { CheckMarkBlue } from './common/Svgs'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import { GlobalContext } from '../context/GlobalContext'

export default function MyProfileHeader({ myProfileImages }) {
    const { profile } = useContext(GlobalContext)
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('MyProfileDetail', { myProfileImages })}
            style={styles.profileDetail}>
            <View style={styles.imageWrapper}>
                <FastImage
                    style={styles.imageButton}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                        uri: myProfileImages && myProfileImages[0] ? `${domain + myProfileImages[0].image}` : null,
                        priority: FastImage.priority.medium,
                        cache: FastImage.cacheControl.web,
                    }} />
            </View>
            <View style={styles.nameWrapper}>
                <Text style={[styles.name, { fontSize: determineFontSize(profile.name, 25) }]}>
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
        padding: 6,
    },
    imageButton: {
        width: normalize(110),
        height: normalize(110),
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
        fontWeight: '600',
    },
    checkMark: {
        marginTop: 1,
        marginLeft: 10,
    },
    region: {
        fontSize: fontSize.small,
        marginTop: 3,
        marginLeft: 1,
        color: COLOR.grey,
    },

})
