import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import React, { useContext, useEffect, useState } from 'react'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native'
import { Edit } from 'react-native-feather'
import moment from 'moment'
import { baseAxios, domain } from '../hooks/requests'
import { determineFontSize } from '../utils/string'
import { CheckMarkBlue } from './common/Svgs'
import { fontSize } from '../utils/fontSizes'
import { COLOR } from '../utils/colors'
import { PROFILE_IMAGES } from '../urls'
import { GlobalContext } from '../context/GlobalContext'

export default function ProfileHeader({ fetchedProfile }) {
    const [, setLoading] = useState(false)
    const [fetchedImages, setFetchedImages] = useState([])
    const [, setValidationError] = useState('')
    const { profile } = useContext(GlobalContext)
    const navigation = useNavigation()

    useEffect(() => {
        async function fetchProfileImages() {
            try {
                setLoading(true)
                const response = await baseAxios.get(PROFILE_IMAGES, { params: { profile: profile.id } })
                if (response.data.length > 0) {
                    setFetchedImages(response.data[0])
                }
            } catch (error) {
                setValidationError('Nomalum xatolik, qaytib urinib ko\'ring')
            } finally {
                setLoading(false)
            }
        }
        fetchProfileImages()
    }, [profile.id])

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('ProfileDetail')}
            style={styles.profileDetail}>
            <FastImage
                style={styles.imageButton}
                source={{
                    uri: `${domain + fetchedImages.image}`,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover} />
            <View style={styles.nameWrapper}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.name, { fontSize: determineFontSize(fetchedProfile?.name, 18) }]}>
                        {/* eslint-disable-next-line max-len */}
                        {fetchedProfile?.name}, {new Date().getFullYear() - moment(fetchedProfile?.birthdate).format('YYYY')}
                    </Text>
                    <CheckMarkBlue width={18} height={18} />
                </View>
                <Text style={styles.region}>{fetchedProfile?.region?.title}</Text>
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
