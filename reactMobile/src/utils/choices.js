import React from 'react'
import { ClinkingGlasses, FaceWithHeart, HeartWithArrow, WavingHand } from '../components/common/Svgs'

export const goals = {
    match: 'Juftlik topish',
    friendship: "Do'st ortirish",
    long_term_dating: 'Uzoq muddatli tanishuv',
    short_term_dating: 'Qisqa muddatli tanishuv',
}

export const goalsWithIcon = {
    match: { title: 'Juftlik topish', icon: <HeartWithArrow /> },
    friendship: { title: "Do'st ortirish", icon: <WavingHand /> },
    long_term_dating: { title: 'Uzoq muddatli tanishuv', icon: <FaceWithHeart /> },
    short_term_dating: { title: 'Qisqa muddatli tanishuv', icon: <ClinkingGlasses /> },
}

export const genders = {
    male: 'Erkak',
    female: 'Ayol',
    other: 'Boshqasi',
}

export const levels = {
    high_school: "O'rta maxsus",
    bachelors_degree: 'Bakalavr',
    masters_degree: 'Magistratura',
    doctorate: 'Doktorantura',
    other: 'Boshqasi',
}

export const maritalStatus = {
    single: "Yolg'iz",
    married: 'Turmush qurgan',
    divorced: 'Ajrashgan',
    widowed: 'Beva',
    engaged: 'Unashtirilgan',
    relationship: 'Munosabatda',
    other: 'Boshqasi',
}

export const incomeLevels = {
    low: 'Past daromad',
    moderate: "O'rtacha daromad",
    above_moderate: "O'rtacha daromaddan yuqori",
    high: 'Yuqori daromad',
    very_high: 'Juda yuqori daromad',
}

export const zodiacs = {
    aries: "Qo'y",
    taurus: 'Buqa',
    gemini: 'Egizaklar',
    cancer: 'Qisqichbaqa',
    leo: 'Arslon',
    virgo: 'Parizod',
    libra: 'Tarozi',
    scorpio: 'Chayon',
    sagittarius: "O'q otar",
    capricorn: "Tog' echkisi",
    aquarius: "Qovg'a",
    pisces: 'Baliqlar',
}

export const subscriptionFields = {
    gold: {
        id: 1,
        background: ['#ffe38e', '#ffdf8e', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
        border: '#DAA520',
        description: [
            { label: 'Gold ikonkasini ozingizga biriktiring' },
            { label: 'Kim sizga like qoyganini biling' },
            { label: 'Cheksiz like qoyish imkoniyati' },
            { label: 'Reklamasiz ilova' },
            { label: "Qo'shimcha imkoniyatlar" },
        ],
    },
    platinum: {
        id: 2,
        background: ['#a4a49e', '#e9e8e8', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
        border: '#000000',
        description: [
            { label: 'Platinum ikonkasini ozingizga biriktiring' },
            { label: 'Kim sizga like qoyganini biling' },
            { label: 'Cheksiz like qoyish imkoniyati' },
            { label: 'Reklamasiz ilova' },
            { label: "To'g'ridan to'g'ri xabar yozish" },
            { label: "Qo'shimcha imkoniyatlar" },
        ],
    },
}
