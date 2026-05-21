<script setup lang="ts">
import { ref } from 'vue'
import { AuthService } from '@/services/authService'
import type { AxiosError } from 'axios'

const form = ref({
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref('')

const login = async () => {
  try {
    loading.value = true
    error.value = ''

    const data = await AuthService.login(form.value)

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    window.location.href = '/'
  } catch (err) {
    const errorResponse = err as AxiosError<{ message?: string }>

    error.value = errorResponse.response?.data?.message || 'Login gagal'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-25 text-text"
  >
    <!-- Background Glow -->
    <div class="absolute left-0 top-20 h-72 w-72 rounded-full bg-soft/30 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent2/10 blur-3xl"></div>
    <div class="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-base/20 blur-3xl"></div>

    <div class="relative z-10 w-full max-w-5xl">
      <div class="mb-8">
        <div
          class="mb-4 inline-block rounded-full border border-border bg-surface px-5 py-1 text-sm font-semibold text-primary shadow-primary"
        >
          Masuk Akun
        </div>

        <h1 class="text-4xl font-extrabold text-primary md:text-5xl">
          Login
        </h1>

        <p class="mt-2 text-sm text-text-soft">
          Masuk untuk melakukan transaksi
        </p>
      </div>

      <div
        class="grid overflow-hidden rounded-[2rem] border border-border bg-surface shadow-hover md:grid-cols-2"
      >
        <!-- FORM -->
        <div class="relative overflow-hidden bg-gradient-accent p-10 text-text-light">
          <div class="absolute left-10 top-10 h-32 w-32 rounded-full bg-soft/20 blur-3xl"></div>
          <div class="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-base/20 blur-3xl"></div>

          <div
            class="absolute right-20 top-24 h-16 w-16 rotate-12 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md"
          ></div>

          <div class="relative z-10 w-full max-w-sm">
            <h2 class="mb-2 text-3xl font-extrabold text-primary">
              Welcome Back
            </h2>

            <p class="mb-8 text-sm text-primary">
              Silakan login untuk melanjutkan belanja
            </p>

            <form @submit.prevent="login" class="space-y-5">
              <div>
                <label class="mb-2 block text-sm font-semibold text-white">
                  Email
                </label>

                <input
                  v-model="form.email"
                  type="email"
                  placeholder="Masukkan email"
                  class="w-full rounded-2xl border border-border bg-white px-5 py-3 text-primary outline-none transition focus:ring-2 focus:ring-accent2"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold text-white">
                  Password
                </label>

                <input
                  v-model="form.password"
                  type="password"
                  placeholder="Masukkan password"
                  class="w-full rounded-2xl border border-border bg-white px-5 py-3 text-primary outline-none transition focus:ring-2 focus:ring-accent2"
                />
              </div>

              <div
                v-if="error"
                class="rounded-2xl border border-red-300/20 bg-red-500/20 px-4 py-3 text-sm font-semibold text-red-100"
              >
                {{ error }}
              </div>

              <button
                :disabled="loading"
                class="w-full rounded-2xl bg-base py-3 text-lg font-bold text-primary shadow-primary transition hover:scale-[1.02] hover:bg-soft disabled:cursor-not-allowed disabled:opacity-70"
              >
                {{ loading ? 'Loading...' : 'Login' }}
              </button>
            </form>

            <p class="mt-6 text-center text-sm text-text-soft">
              Belum memiliki akun?

              <router-link
                to="/register"
                class="font-bold text-primary hover:text-accent"
              >
                Register disini
              </router-link>
            </p>
          </div>
        </div>

        <!-- IMAGE -->
        <div class="relative hidden overflow-hidden bg-gradient-soft md:block">
          <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-accent2/10"></div>

          <img
            src="/images/login-fashion.png"
            alt="Login Image"
            class="h-full w-full object-cover"
          />

          <div
            class="absolute bottom-8 left-8 right-8 rounded-[2rem] border border-white/40 bg-white/70 p-5 shadow-primary backdrop-blur-xl"
          >
            <p class="text-sm font-semibold text-primary">
              Lelxzyy.Shop
            </p>

            <h3 class="mt-1 text-2xl font-extrabold text-primary">
              Fashion modern untuk gaya harian kamu
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
