import axios, { type InternalAxiosRequestConfig } from "axios"

const BASEURL = import.meta.env.VITE_BASEURL

export const instance = axios.create({
    baseURL: BASEURL,
    withCredentials: false,
    timeout: 10000,
})

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config
    },
    (error) => Promise.reject(error),
)

instance.interceptors.response.use(
    (res) => res,
    (error) => {
        return Promise.reject(error)
    },
)
