import axios from 'axios'
import humps from 'humps'

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

export const baseAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1', // Базовый URL для всех запросов
    transformRequest: [humps.decamelizeKeys, ...axios.defaults.transformRequest], // Конвертируем camelCase в snake_case
    transformResponse: [...axios.defaults.transformResponse, humps.camelizeKeys], // Конвертируем snake_case в camelCase
})
