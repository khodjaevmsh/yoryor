import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import moment from 'moment'
import normalize from 'react-native-normalize'
import { COLOR } from '../../utils/colors'
import ProfileDetailHeader from '../../components/ProfileDetailHeader'
import ProfileDescription from '../../components/ProfileDescription'
import ProfileInfo from '../../components/ProfileInfo'
import { GlobalContext } from '../../context/GlobalContext'
import { baseAxios } from '../../hooks/requests'
import { PROFILE, PROFILE_IMAGES } from '../../urls'
import { genders, goals, incomeLevels, maritalStatus as familyStatus, zodiacs } from '../../utils/choices'
import ActivityIndicator from '../../components/common/ActivityIndicator'
// eslint-disable-next-line max-len
import { AcademicCap, CalendarMark, CaseRound, Dollar, Goal, ListHeart, MapPoint, Ruler, Stars, UserRounded, Weigher } from '../../components/common/Svgs'

export default function MyProfileDetail() {
    const [loading, setLoading] = useState(false)
    const [myProfile, setMyProfile] = useState()
    const [profileImages, setProfileImages] = useState([])
    const { profile, render, setRender } = useContext(GlobalContext)

    useEffect(() => {
        async function fetchMyProfile() {
            try {
                setLoading(true)
                const profileResponse = await baseAxios.get(PROFILE.replace('{id}', profile.id))
                setMyProfile(profileResponse.data)

                const imagesResponse = await baseAxios.get(PROFILE_IMAGES, { params: { profile: profile.id } })
                setProfileImages(imagesResponse.data)
            } catch (error) {
                console(error.response)
            } finally {
                setLoading(false)
                setRender(false)
            }
        }
        fetchMyProfile()
    }, [profile.id, render])

    if (loading) {
        return <ActivityIndicator />
    }

    const {
        birthdate,
        gender,
        educationSchool,
        educationLevel,
        jobTitle,
        jobCompany,
        maritalStatus,
        region,
        goal,
        incomeLevel,
        height,
        weight,
        zodiac,
    } = myProfile || {}

    const info = [
        { id: 1, title: 'Yoshingiz', icon: <CalendarMark />, screen: 'BirthDate', props: { value: moment(birthdate).format('D MMMM, YYYY') } },
        { id: 2, title: 'Jins', icon: <UserRounded />, screen: 'Gender', props: { key: gender, value: genders[gender] } },
        { id: 3, title: 'Ma\'lumotingiz', icon: <AcademicCap />, screen: 'Education', props: { school: educationSchool, level: educationLevel, value: educationSchool } },
        { id: 4, title: 'Ish joy', icon: <CaseRound />, screen: 'Job', props: { value: jobTitle && jobCompany ? `${jobTitle}, ${jobCompany}` : null, job: myProfile } },
        { id: 5, title: 'Oilaviy ahvol', icon: <ListHeart />, screen: 'MaritalStatus', props: { key: maritalStatus, value: familyStatus[maritalStatus], status: maritalStatus } },
        { id: 7, title: 'Yashash manzil', icon: <MapPoint />, screen: 'City', props: { region, value: region?.title } },
    ]
    const additionalInfo = [
        { id: 1, title: 'Tanishuv maqsadi', icon: <Goal />, screen: 'Goal', props: { key: goal, value: goals[goal] } },
        { id: 2, title: 'Moliaviy ahvol', icon: <Dollar />, screen: 'FinancialStatus', props: { key: incomeLevel, value: incomeLevels[incomeLevel] } },
        { id: 3, title: 'Bo\'yingiz', icon: <Ruler />, screen: 'Height', props: { value: height } },
        { id: 4, title: 'Vazningiz', icon: <Weigher />, screen: 'Weight', props: { value: weight } },
        { id: 5, title: 'Burj', icon: <Stars />, screen: 'Zodiac', props: { key: zodiac, value: zodiacs[zodiac] } },
    ]

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileHead}>
                <ProfileDetailHeader profileImages={profileImages} />
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
