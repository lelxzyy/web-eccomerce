import { defineStore } from 'pinia'
import * as authService from '@/services/authService'
import type { User, LoginPayload, RegisterPayload } from '@/types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || '',
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(payload: LoginPayload) {
      try {
        this.loading = true

        const res = await authService.login(payload)

        this.token = res.token
        this.user = res.user

        localStorage.setItem('token', res.token)
      } catch (error) {
        console.error('Login gagal:', error)
      } finally {
        this.loading = false
      }
    },

    async register(payload: RegisterPayload) {
      try {
        this.loading = true

        const res = await authService.register(payload)

        this.token = res.token
        this.user = res.user

        localStorage.setItem('token', res.token)
      } catch (error) {
        console.error('Register gagal:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      try {
        const res = await authService.getProfile()
        this.user = res.user
      } catch (error) {
        console.error('Ambil user gagal:', error)
      }
    },

    logout() {
      this.user = null
      this.token = ''
      localStorage.removeItem('token')
    },
  },
})
