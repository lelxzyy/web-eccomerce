export interface User {
  id: number
  name: string
  email: string
  phone?: string | null
  address?: string | null
  photo?: string | null
  created_at?: string
  updated_at?: string
}

export interface UpdateProfilePayload {
  name: string
  email: string
  phone?: string
  address?: string
  photo?: File | null
}
