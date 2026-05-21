<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/authService'
import type { AxiosError } from 'axios'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const loading = ref(false)
const error = ref('')

const register = async () => {
  try {
    loading.value = true
    error.value = ''

    const data = await AuthService.register(form.value)

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    router.push('/')
  } catch (err) {
    const errorResponse = err as AxiosError<{ message?: string }>

    error.value =
      errorResponse.response?.data?.message || 'Register gagal'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 pb-10 pt-25 text-text"
  >
    <!-- Glow -->
    <div
      class="absolute left-0 top-20 h-72 w-72 rounded-full bg-soft/30 blur-3xl"
    ></div>

    <div
      class="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent2/10 blur-3xl"
    ></div>

    <div
      class="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-base/20 blur-3xl"
    ></div>

    <div class="relative z-10 w-full max-w-5xl">
      <!-- Heading -->
      <div class="mb-8">
        <div
          class="mb-4 inline-block rounded-full border border-border bg-surface px-5 py-1 text-sm font-semibold text-primary shadow-primary"
        >
          Buat Akun
        </div>

        <h1
          class="text-4xl font-extrabold text-primary md:text-5xl"
        >
          Register
        </h1>

        <p class="mt-2 text-sm text-text-soft">
          Buat akun baru untuk mulai belanja
        </p>
      </div>

      <!-- Card -->
      <div
        class="grid overflow-hidden rounded-[2rem] border border-border bg-surface shadow-hover md:grid-cols-2"
      >
        <!-- FORM -->
        <div
          class="relative overflow-hidden bg-gradient-soft p-10 text-primary"
        >
          <!-- Glow -->
          <div
            class="absolute left-10 top-10 h-32 w-32 rounded-full bg-soft/30 blur-3xl"
          ></div>

          <div
            class="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-accent2/10 blur-3xl"
          ></div>

          <!-- Decorative -->
          <div
            class="absolute right-20 top-24 h-16 w-16 rotate-12 rounded-3xl border border-primary/5 bg-white/40 backdrop-blur-md"
          ></div>

          <div class="relative z-10 w-full max-w-sm">
            <h2
              class="mb-2 text-3xl font-extrabold text-primary"
            >
              Create Account
            </h2>

            <p class="mb-8 text-sm text-text-soft">
              Buat akun untuk mulai belanja di
              Lelxzyy.Shop
            </p>

            <form
              @submit.prevent="register"
              class="space-y-5"
            >
              <div>
                <label
                  class="mb-2 block text-sm font-semibold text-primary"
                >
                  Nama
                </label>

                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Masukkan nama"
                  class="w-full rounded-2xl border border-border bg-white px-5 py-3 text-primary outline-none transition focus:ring-2 focus:ring-accent2"
                />
              </div>

              <div>
                <label
                  class="mb-2 block text-sm font-semibold text-primary"
                >
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
                <label
                  class="mb-2 block text-sm font-semibold text-primary"
                >
                  Password
                </label>

                <input
                  v-model="form.password"
                  type="password"
                  placeholder="Masukkan password"
                  class="w-full rounded-2xl border border-border bg-white px-5 py-3 text-primary outline-none transition focus:ring-2 focus:ring-accent2"
                />
              </div>

              <div>
                <label
                  class="mb-2 block text-sm font-semibold text-primary"
                >
                  Konfirmasi Password
                </label>

                <input
                  v-model="form.password_confirmation"
                  type="password"
                  placeholder="Ulangi password"
                  class="w-full rounded-2xl border border-border bg-white px-5 py-3 text-primary outline-none transition focus:ring-2 focus:ring-accent2"
                />
              </div>

              <div
                v-if="error"
                class="rounded-2xl border border-red-500/10 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500"
              >
                {{ error }}
              </div>

              <button
                :disabled="loading"
                class="w-full rounded-2xl bg-base py-3 text-lg font-bold text-primary shadow-primary transition hover:scale-[1.02] hover:bg-soft disabled:cursor-not-allowed disabled:opacity-70"
              >
                {{
                  loading ? 'Loading...' : 'Register'
                }}
              </button>
            </form>

            <p
              class="mt-6 text-center text-sm text-text-soft"
            >
              Sudah punya akun?

              <router-link
                to="/login"
                class="font-bold text-primary hover:text-accent"
              >
                Login disini
              </router-link>
            </p>
          </div>
        </div>

        <!-- IMAGE -->
        <div
          class="relative hidden overflow-hidden bg-gradient-soft md:block"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-white/10 to-accent2/10"
          ></div>

          <img
            src="/images/register-fashion.png"
            alt="Register Image"
            class="h-full w-full object-cover"
          />

          <div
            class="absolute bottom-8 left-8 right-8 rounded-[2rem] border border-white/40 bg-white/70 p-5 shadow-primary backdrop-blur-xl"
          >
            <p
              class="text-sm font-semibold text-primary"
            >
              Lelxzyy.Shop
            </p>

            <h3
              class="mt-1 text-2xl font-extrabold text-primary"
            >
              Temukan outfit terbaik untuk gaya harianmu
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
