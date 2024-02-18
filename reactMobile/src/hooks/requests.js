import axios from 'axios'
import humps from 'humps'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Config from 'react-native-config'

// const backendUrl = Config.BASE_URL
const backendUrl = 'http://127.0.0.1:8000/'
export const domain = backendUrl.endsWith('/') ? backendUrl.substr(0, backendUrl.length - 1) : backendUrl

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
