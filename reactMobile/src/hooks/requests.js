import axios from 'axios'
import humps from 'humps'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNavigationContainerRef } from '@react-navigation/native'
import Config from 'react-native-config'

const backendUrl = Config.API_URL
const wsUrl = Config.WEBSOCKET_URL

export const domain = backendUrl.endsWith('/') ? backendUrl.substr(0, backendUrl.length - 1) : backendUrl
export const wsDomain = wsUrl.endsWith('/') ? wsUrl.substr(0, wsUrl.length - 1) : wsUrl

export const baseAxios = axios.create({
    baseURL: `${domain}/api/v1/`, // Базовый URL для всех запросов
    transformRequest: [humps.decamelizeKeys, ...axios.defaults.transformRequest], // Конвертируем camelCase в snake_case
    transformResponse: [...axios.defaults.transformResponse, humps.camelizeKeys], // Конвертируем snake_case в camelCase
})

// Interceptor to add the token to headers before each request is sent
baseAxios.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            // Add the token to the Authorization header
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Token ${token}`
        }

        const lang = await AsyncStorage.getItem('storageLanguage')
        if (lang) {
            // Add the language code to the Accept-Language header
            // eslint-disable-next-line no-param-reassign
            config.headers['Accept-Language'] = lang
        } else {
            // eslint-disable-next-line no-param-reassign
            config.headers['Accept-Language'] = 'uz'
        }

        return config
    } catch (error) {
        return Promise.reject(error)
    }
}, (error) => Promise.reject(error))

// Interceptor to handle responses
baseAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response === undefined) {
            console.log('400')
        } else if (error.response.status >= 500) {
            console.log('500')
        } else if (error.response && error.response.status === 401 && error.response.data.detail) {
            // eslint-disable-next-line no-unused-expressions
            typeof signOut === 'function' ? await signOut() : null
        }
        return Promise.reject(error)
    },
)

export const navigationRef = createNavigationContainerRef()
async function signOut() {
    try {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('profile')
        if (navigationRef.isReady()) {
            navigationRef.reset({ index: 0, routes: [{ name: 'Splash' }] })
        }
    } catch (e) {
        console.error('Failed to sign out', e)
    }
}
