import { api } from "./api"
import type { LoginPayload, RegisterPayload, AuthResponse } from "@/types/auth"

// 🔐 LOGIN
export const login = async (payload: LoginPayload) => {
  const res = await api.post<AuthResponse>("/login", payload)
  return res.data
}

// 📝 REGISTER
export const register = async (payload: RegisterPayload) => {
  const res = await api.post<AuthResponse>("/register", payload)
  return res.data
}

// 👤 GET USER
export const getProfile = async () => {
  const res = await api.get<{ user: any }>("/me")
  return res.data
}
