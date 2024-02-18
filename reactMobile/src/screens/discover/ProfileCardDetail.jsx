import React from 'react'
import { AcademicCap, CaseRound, Dollar, Heart, Ruler, Stars, Weigher } from '../../components/common/Svgs'
import Container from '../../components/common/Container'
import ProfileCardInfo from '../../components/ProfileCardInfo'
import ProfileCardHeader from '../../components/ProfileCardHeader'

export default function ProfileCardDetail({ route }) {
    const { profile } = route.params

    const fields = [
        { icon: <Heart width={20} height={20} />, text: profile?.maritalStatus?.label },
        { icon: <AcademicCap width={20} height={20} />, text: profile?.educationLevel?.label },
        { icon: <CaseRound width={20} height={20} />, text: profile?.jobTitle },
    ]

    const additionalFields = [
        { icon: <Dollar width={20} height={20} />, text: profile?.incomeLevel?.label },
        { icon: <Ruler width={20} height={20} />, text: profile?.height },
        { icon: <Weigher width={20} height={20} />, text: profile?.weight },
        { icon: <Stars width={20} height={20} />, text: profile?.zodiac?.label },
    ]

    return (
        <Container scrollable containerStyle={{ paddingBottom: 52 }}>
            <ProfileCardHeader profile={profile} profileImage={profile.images} />
            <ProfileCardInfo profile={profile} fields={fields} additionalFields={additionalFields} />
        </Container>
    )
}
