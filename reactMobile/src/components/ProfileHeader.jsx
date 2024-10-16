import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Edit3 } from 'react-native-feather'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import CheckMarks from './CheckMarks'
import NameWithAge from './NameWithAge'
import ProfileImage from './ProfileImage'

export default function ProfileHeader({ image, loading }) {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('MyProfileDetail')}
            style={styles.profileDetail}>
            <View style={styles.imageWrapper}>
                <ProfileImage image={image} loading={loading} />
                <TouchableOpacity
                    style={styles.editIcon}
                    activeOpacity={1}
                    onPress={() => navigation.navigate('MyProfileDetail')}>
                    <Edit3 width={20} height={20} color={COLOR.black} strokeWidth={2} />
                </TouchableOpacity>
            </View>
            <View style={styles.nameWrapper}>
                <NameWithAge />
                <CheckMarks wrapper={styles.checkMark} />
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

    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 12,
    },
    checkMark: {
        marginTop: 2,
        marginLeft: 10,
    },
    region: {
        fontSize: fontSize.small,
        marginTop: 3,
        marginLeft: 1,
        color: COLOR.grey,
    },

})
