import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import moment from 'moment'
import normalize from 'react-native-normalize'
import { COLOR } from '../../utils/colors'
import ProfileDetailHeader from '../../components/ProfileDetailHeader'
// eslint-disable-next-line max-len
import { AcademicCap, CalendarMark, CaseRound, Dollar, Goal, ListHeart, MapPoint, Ruler, Stars, UserRounded, Weigher } from '../../components/common/Svgs'
import ProfileDescription from '../../components/ProfileDescription'
import ProfileInfo from '../../components/ProfileInfo'
import { GlobalContext } from '../../context/GlobalContext'
import { baseAxios } from '../../hooks/requests'
import { PROFILE } from '../../urls'

export default function ProfileDetail() {
    const [loading, setLoading] = useState(false)
    const [serverError, setServerError] = useState(false)
    const [fetchedProfile, setFetchedData] = useState(null)
    const { profile, render, setRender } = useContext(GlobalContext)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const response = await baseAxios.get(PROFILE.replace('{id}', profile.id))
                setFetchedData(response.data)
                setRender(false)
            } catch (error) {
                setServerError(error.response)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [render])

    const info = [
        { id: 1, title: 'Yoshingiz', icon: <CalendarMark width={26} height={26} />, screen: 'BirthDate', props: { value: moment(fetchedProfile?.birthdate).format('D MMMM, YYYY') } },
        { id: 2, title: 'Jins', icon: <UserRounded width={28} height={28} />, screen: 'Gender', props: { value: fetchedProfile?.gender.label, gender: fetchedProfile?.gender } },
        { id: 3, title: 'Ma\'lumotingiz', icon: <AcademicCap width={28} height={28} />, screen: 'Education', props: { value: fetchedProfile?.educationSchool, education: fetchedProfile?.educationLevel } },
        { id: 4, title: 'Ish joy', icon: <CaseRound width={28} height={28} />, screen: 'Job', props: { value: fetchedProfile?.jobTitle && fetchedProfile?.jobCompany ? `${fetchedProfile.jobTitle}, ${fetchedProfile.jobCompany}` : null, job: fetchedProfile } },
        { id: 5, title: 'Oilaviy ahvol', icon: <ListHeart width={28} height={28} />, screen: 'MaritalStatus', props: { value: fetchedProfile?.maritalStatus.label, status: fetchedProfile?.maritalStatus } },
        { id: 7, title: 'Yashash manzil', icon: <MapPoint width={28} height={28} />, screen: 'City', props: { value: fetchedProfile?.region.title, region: fetchedProfile?.region } },
    ]
    const additionalInfo = [
        { id: 1, title: 'Tanishuv maqsadi', icon: <Goal width={26} height={26} />, screen: 'Goal', props: { value: fetchedProfile?.goal.label, goal: fetchedProfile?.goal } },
        { id: 2, title: 'Moliaviy ahvol', icon: <Dollar width={28} height={28} />, screen: 'FinancialStatus', props: { value: fetchedProfile?.incomeLevel.label, level: fetchedProfile?.incomeLevel } },
        { id: 3, title: 'Bo\'yingiz', icon: <Ruler width={28} height={28} />, screen: 'Height', props: { value: fetchedProfile?.height } },
        { id: 4, title: 'Vazningiz', icon: <Weigher width={28} height={28} />, screen: 'Weight', props: { value: fetchedProfile?.weight } },
        { id: 5, title: 'Burj', icon: <Stars width={28} height={28} />, screen: 'Zodiac', props: { value: fetchedProfile?.zodiac.label, zodiac: fetchedProfile?.zodiac } },
    ]

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 0, paddingBottom: 26 }}>
            <View style={styles.profileHead}>
                <ProfileDetailHeader fetchedProfile={fetchedProfile} />
            </View>

            <View style={styles.profileDesc}>
                <ProfileDescription fetchedProfile={fetchedProfile} />
            </View>

            <View style={[styles.profileInfo]}>
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
    profileHead: {
        paddingHorizontal: 20,
        marginBottom: 24,
    },
    profileDesc: {
        paddingHorizontal: 20,
    },
    profileInfo: {
        paddingHorizontal: 20,
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 36,
        marginBottom: 14,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 100,
        marginRight: 10,
        backgroundColor: COLOR.primary,
    },
    profileInfoTitle: {
        fontSize: normalize(20),
        fontWeight: '500',
    },

    socialsWrapper: {
        paddingHorizontal: 22,
        paddingVertical: 24,
    },
    socialsTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
