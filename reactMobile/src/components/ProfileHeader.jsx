import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import React, { useContext } from 'react'
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

export default function ProfileHeader({ fetchImages }) {
    const { profile } = useContext(GlobalContext)
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('ProfileDetail')}
            style={styles.profileDetail}>
            <FastImage
                style={styles.imageButton}
                source={{
                    uri: `${domain + fetchImages.image}`,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover} />
            <View style={styles.nameWrapper}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.name, { fontSize: determineFontSize(profile.name, 18) }]}>
                        {/* eslint-disable-next-line max-len */}
                        {profile.name}, {new Date().getFullYear() - moment(profile.birthdate).format('YYYY')}
                    </Text>
                    <CheckMarkBlue width={18} height={18} />
                </View>
                <Text style={styles.region}>{profile.region?.title}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('ProfileDetail')}>
                <Edit width={24} height={24} color={COLOR.black} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    profileDetail: {
        height: normalize(100),
        flexDirection: 'row',
    },
    imageButton: {
        width: normalize(65),
        height: normalize(65),
        borderRadius: 14,
        marginRight: 8,
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
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 2,
    },
    name: {
        fontWeight: '600',
        marginRight: 8,
    },
    region: {
        fontSize: fontSize.small,
        marginTop: 3,
        marginLeft: 1,
        color: COLOR.grey,
    },

})
