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
