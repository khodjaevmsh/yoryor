import React, { useCallback, useContext, useState } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'
import { useFocusEffect } from '@react-navigation/native'
import { COLOR } from '../../utils/colors'
import ProfileDetailHeader from '../../components/ProfileDetailHeader'
import ProfileDescription from '../../components/ProfileDescription'
import ProfileInfo from '../../components/ProfileInfo'
import { GlobalContext } from '../../context/GlobalContext'
import { baseAxios } from '../../hooks/requests'
import { PROFILE, PROFILE_IMAGES } from '../../urls'
import MyProfileInfo from '../../components/MyProfileInfo'

export default function MyProfileDetail() {
    const [loading, setLoading] = useState(true)
    const [myProfile, setMyProfile] = useState()
    const [profileImages, setProfileImages] = useState([])
    const { profile } = useContext(GlobalContext)
    const { info, additionalInfo } = MyProfileInfo(myProfile)

    useFocusEffect(
        useCallback(() => {
            async function fetchMyProfile() {
                try {
                    setLoading(true)
                    const profileResponse = await baseAxios.get(PROFILE.replace('{id}', profile.id))
                    setMyProfile(profileResponse.data)

                    const imagesResponse = await baseAxios.get(PROFILE_IMAGES, { params: { profile: profile.id } })
                    setProfileImages(imagesResponse.data)
                } catch (error) {
                    console.error(error.response)
                } finally {
                    setLoading(false)
                }
            }
            fetchMyProfile()
        }, [profile.id]),
    )

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileHead}>
                <ProfileDetailHeader profileImages={profileImages} loading={loading} />
            </View>
            <View style={styles.profileDesc}>
                <ProfileDescription fetchedProfile={myProfile} />
            </View>
            <View style={styles.profileInfo}>
                <View style={styles.titleWrapper}>
                    <View style={styles.dot} />
                    <Text style={styles.profileInfoTitle}>Ma'lumotlar</Text>
                </View>
                {info.map((item) => (
                    <ProfileInfo
                        key={item.id}
                        title={item.title}
                        icon={item.icon}
                        screen={item.screen}
                        props={item.props} />
                ))}
            </View>
            <View style={styles.profileInfo}>
                <View style={styles.titleWrapper}>
                    <View style={styles.dot} />
                    <Text style={styles.profileInfoTitle}>Qo'shimcha ma'lumotlar</Text>
                </View>
                {additionalInfo.map((item) => (
                    <ProfileInfo
                        key={item.id}
                        title={item.title}
                        icon={item.icon}
                        screen={item.screen}
                        props={item.props} />
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 0,
        paddingBottom: 22,
    },
    profileHead: {
        paddingHorizontal: 8,
        marginBottom: 24,
    },
    profileDesc: {
        paddingHorizontal: 16,
    },
    profileInfo: {
        paddingHorizontal: 14,
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 36,
        marginBottom: 14,
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 100,
        marginRight: 8,
        backgroundColor: COLOR.primary,
    },
    profileInfoTitle: {
        fontSize: normalize(16),
        fontWeight: '600',
        textTransform: 'uppercase',
    },
})
