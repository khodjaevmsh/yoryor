import { useState } from 'react'
import axios from 'axios'
import humps from 'humps'

const backendUrl = 'http://127.0.0.1:8000/'
const domain = backendUrl.endsWith('/') ? backendUrl.substr(0, backendUrl.length - 1) : backendUrl

//  Add Base URL and change snake_case to camelCase
const baseAxios = axios.create({
    baseURL: `${domain}/api/v1/`,
    transformResponse: [...axios.defaults.transformResponse, humps.camelizeKeys],
    transformRequest: [decamelize, ...axios.defaults.transformRequest],
})

baseAxios.interceptors.request.use((config) => ({
    ...config,
    params: humps.decamelizeKeys(config.params),
}))

// eslint-disable-next-line consistent-return
function decamelize(object) {
    if (!(object && !(object instanceof File))) return object

    if (object instanceof FormData) {
        const formData = new FormData()
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of object.entries()) {
            formData.append(humps.decamelize(key), value)
        }
        return formData
    }

    if (typeof object === 'object') {
        return Object.keys(object).reduce((acc, next) => ({
            ...acc,
            [humps.decamelize(next)]: object[next],
        }), {})
    }
}

export function usePostRequest(options = {}) {
    return useRequest({ method: 'POST', ...options })
}

export function usePutRequest(options = {}) {
    return useRequest({ method: 'PUT', ...options })
}

export function useGetRequest(options = {}) {
    return useRequest({ method: 'GET', ...options })
}

export function useDeleteRequest(options = {}) {
    return useRequest({ method: 'DELETE', ...options })
}

export function useRequest(options = {}) {
    const [response, setResponse] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})

    async function request(overrideOptions = {}, sync = false) {
        setLoading(true)

        try {
            const { data } = await baseAxios({
                headers: {
                    // Authorization: `Token ${token || ''}`,
                },
                ...options,
                ...overrideOptions,
            })
            if (!sync) setResponse(data)
            return { response: data, success: true }
        } catch (e) {
            setError(e.response || {})
            return { error: e.response, success: false }
        } finally {
            if (!sync) setLoading(false)
        }
    }

    return { loading, request, error, response, setResponse, setError, setLoading }
}
