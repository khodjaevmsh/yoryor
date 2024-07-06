import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import React, { useContext } from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { Edit3 } from 'react-native-feather'
import { domain } from '../hooks/requests'
import { determineFontSize } from '../utils/string'
import { CheckMarkBlue } from './common/Svgs'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import { GlobalContext } from '../context/GlobalContext'

export default function MyProfileHeader({ myProfileImage }) {
    const { profile } = useContext(GlobalContext)
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('MyProfileDetail')}
            style={styles.profileDetail}>
            <View style={styles.imageWrapper}>
                <FastImage
                    style={styles.imageButton}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                        uri: myProfileImage && myProfileImage.image ? `${domain + myProfileImage.image}` : null,
                        priority: FastImage.priority.medium,
                        cache: FastImage.cacheControl.web,
                    }} />
                <TouchableOpacity
                    style={styles.editIcon}
                    activeOpacity={1}
                    onPress={() => navigation.navigate('MyProfileDetail')}>
                    <Edit3 width={20} height={20} color={COLOR.black} strokeWidth={2} />
                </TouchableOpacity>
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
    editIcon: {
        position: 'absolute',
        right: 0,
        backgroundColor: COLOR.white,
        padding: 8,
        borderRadius: 55,
        elevation: 4,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
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
