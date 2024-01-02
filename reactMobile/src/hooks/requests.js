import axios from 'axios'
import humps from 'humps'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Config from 'react-native-config'

// function decamelize(str) {
//     return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
// }
//
// function snakeToCamel(str) {
//     console.log(str)
//     return str.replace(/_([a-z])/g, function(match, group) {
//     return group.toUpperCase()
//   })
// }

const backendUrl = Config.BASE_URL
export const domain = backendUrl.endsWith('/') ? backendUrl.substr(0, backendUrl.length - 1) : backendUrl

export const baseAxios = axios.create({
    baseURL: `${domain}/api/v1/`, // Базовый URL для всех запросов
    transformRequest: [humps.decamelizeKeys, ...axios.defaults.transformRequest], // Конвертируем camelCase в snake_case
    transformResponse: [...axios.defaults.transformResponse, humps.camelizeKeys], // Конвертируем snake_case в camelCase

})

// Interceptor to add the token to headers before each request is sent
baseAxios.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('token')

            if (token) {
                // Add the token to the Authorization header
                // eslint-disable-next-line no-param-reassign
                config.headers.Authorization = `Token ${token}`
            } return config
        } catch (error) {
            console.error('Error retrieving token from AsyncStorage:', error)
            return Promise.reject(error)
        }
    },
    (error) => {
        console.error('Error in request interceptor:', error)
        return Promise.reject(error)
    },
)
