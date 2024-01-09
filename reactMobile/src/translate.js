import { useContext } from 'react'
import { GlobalContext } from './context/GlobalContext'

export default function useTrans() {
    const { language } = useContext(GlobalContext)
    return (text) => languages[language][text]
}

const uz = {
    hello: 'Salom',
    profileAbout: 'Profilingiz tavsifi',
}
const ru = {
    hello: 'Привет',
    profileAbout: 'Описание вашего профиля',
}
const en = {
    hello: 'Hello',
    profileAbout: 'About',
}

export const languages = { uz, ru, en }
