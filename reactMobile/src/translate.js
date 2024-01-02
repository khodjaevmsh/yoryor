import { useContext } from 'react'
import { GlobalContext } from './context/GlobalContext'

export default function useTrans() {
    const { language } = useContext(GlobalContext)
    return (text) => languages[language][text]
}

const uz = {
    hello: 'Salom',
}
const ru = {
    hello: 'Привет',
}
const en = {
    hello: 'Hello',
}

export const languages = { uz, ru, en }
