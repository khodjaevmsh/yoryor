import React from 'react'
import moment from 'moment'
import { AcademicCap,
    CalendarMark,
    CaseRound,
    Dollar,
    Goal,
    ListHeart,
    MapPoint,
    Ruler,
    Stars,
    UserRounded,
    Weigher } from './common/Svgs'
import { genders, goals, incomeLevels, maritalStatus as familyStatus, zodiacs } from '../utils/choices'

const MyProfileInfo = (myProfile) => {
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
        {
            id: 1,
            title: 'Yoshingiz',
            icon: <CalendarMark />,
            screen: 'BirthDate',
            props: { value: moment(birthdate).format('D MMMM, YYYY') },
        },
        {
            id: 2,
            title: 'Jins',
            icon: <UserRounded />,
            screen: 'Gender',
            props: {
                key: gender,
                value: genders[gender],
            },
        },
        {
            id: 3,
            title: 'Ma\'lumotingiz',
            icon: <AcademicCap />,
            screen: 'Education',
            props: { school: educationSchool,
                level: educationLevel,
                value: educationSchool },
        },
        {
            id: 4,
            title: 'Ish joy',
            icon: <CaseRound />,
            screen: 'Job',
            props: {
                value: jobTitle && jobCompany ? `${jobTitle}, ${jobCompany}` : null, job: myProfile,
            },
        },
        {
            id: 5,
            title: 'Oilaviy ahvol',
            icon: <ListHeart />,
            screen: 'MaritalStatus',
            props: {
                key: maritalStatus,
                value: familyStatus[maritalStatus],
                status: maritalStatus,
            },
        },
        {
            id: 7,
            title: 'Yashash manzil',
            icon: <MapPoint />,
            screen: 'City',
            props: {
                region,
                value: region?.title,
            },
        },
    ]

    const additionalInfo = [
        {
            id: 1,
            title: 'Tanishuv maqsadi',
            icon: <Goal />,
            screen: 'Goal',
            props: {
                key: goal,
                value: goals[goal],
            },
        },
        {
            id: 2,
            title: 'Moliaviy ahvol',
            icon: <Dollar />,
            screen: 'FinancialStatus',
            props: {
                key: incomeLevel,
                value: incomeLevels[incomeLevel],
            },
        },
        {
            id: 3,
            title: 'Bo\'yingiz',
            icon: <Ruler />,
            screen: 'Height',
            props: {
                value: height,
            },
        },
        {
            id: 4,
            title: 'Vazningiz',
            icon: <Weigher />,
            screen: 'Weight',
            props: {
                value: weight,
            },
        },
        {
            id: 5,
            title: 'Burj',
            icon: <Stars />,
            screen: 'Zodiac',
            props: {
                key: zodiac,
                value: zodiacs[zodiac],
            },
        },
    ]

    return { info, additionalInfo }
}

export default MyProfileInfo
