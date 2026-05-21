import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

// Local Laravel Backend API (for Auth, Profile, and Cart)
export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Production/Payment API (for Products and Checkout)
export const payApi = axios.create({
  baseURL: 'https://pay.lelxzyy.my.id/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Automatically attach Bearer token to requests if present in localStorage
const authInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

api.interceptors.request.use(authInterceptor)
payApi.interceptors.request.use(authInterceptor)
