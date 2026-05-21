import { api } from './api'
import type { AxiosResponse } from 'axios'
import type { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth'
import type { User } from '@/types/user'

// 🔐 LOGIN
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const res: AxiosResponse<AuthResponse, unknown> = await api.post('/login', payload)
  return res.data
}

// 📝 REGISTER
export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const res: AxiosResponse<AuthResponse, unknown> = await api.post('/register', payload)
  return res.data
}

// 👤 GET USER
export const getProfile = async (): Promise<{ user: User }> => {
  const res: AxiosResponse<{ user: User }, unknown> = await api.get('/me')
  return res.data
}

// 👤 UPDATE PROFILE
export const updateProfile = async (formData: FormData): Promise<{ user: User }> => {
  const res: AxiosResponse<{ user: User }, unknown> = await api.post('/profile/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data
}

export const AuthService = {
  login,
  register,
  getProfile,
  updateProfile,
}
