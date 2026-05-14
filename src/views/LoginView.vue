<script setup lang="ts">
import axios from "axios"
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const form = ref({
  email: "",
  password: "",
})

const loading = ref(false)
const error = ref("")

const login = async () => {
  try {
    loading.value = true
    error.value = ""

    const res = await axios.post(
      "http://127.0.0.1:8000/api/login",
      form.value
    )

    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify(res.data.user))

    window.location.href = "/"
  } catch (err: any) {
    error.value =
      err.response?.data?.message || "Login gagal"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f5f5f5] to-[#e9e9e9] px-4 py-10"
  >
    <div class="w-full max-w-5xl">
      <!-- TITLE -->
      <div class="mb-8">
        <h1 class="text-5xl font-extrabold text-[#190019]">
          Login
        </h1>

        <p class="mt-2 text-sm text-gray-500">
          masuk untuk melakukan transaksi
        </p>
      </div>

      <!-- CARD -->
      <div
        class="grid overflow-hidden rounded-[30px] bg-white shadow-2xl md:grid-cols-2"
      >
        <!-- LEFT LOGIN -->
        <div
          class="flex items-center justify-center bg-[#190019] p-10"
        >
          <div class="w-full max-w-sm">
            <h2 class="mb-8 text-3xl font-bold text-white">
              Welcome Back
            </h2>

            <form @submit.prevent="login" class="space-y-5">
              <!-- EMAIL -->
              <div>
                <label
                  class="mb-2 block text-sm font-medium text-white"
                >
                  Email
                </label>

                <input
                  v-model="form.email"
                  type="email"
                  placeholder="Masukkan email"
                  class="w-full rounded-2xl border border-white/10 bg-white px-5 py-3 text-black outline-none transition focus:ring-2 focus:ring-[#DFB6B2]"
                />
              </div>

              <!-- PASSWORD -->
              <div>
                <label
                  class="mb-2 block text-sm font-medium text-white"
                >
                  Password
                </label>

                <input
                  v-model="form.password"
                  type="password"
                  placeholder="Masukkan password"
                  class="w-full rounded-2xl border border-white/10 bg-white px-5 py-3 text-black outline-none transition focus:ring-2 focus:ring-[#DFB6B2]"
                />
              </div>

              <!-- ERROR -->
              <div
                v-if="error"
                class="rounded-2xl bg-red-500/20 px-4 py-3 text-sm text-red-200"
              >
                {{ error }}
              </div>

              <!-- BUTTON -->
              <button
                :disabled="loading"
                class="w-full rounded-2xl bg-[#FBE4D8] py-3 text-lg font-bold text-[#190019] transition hover:scale-[1.02] hover:opacity-90"
              >
                {{ loading ? "Loading..." : "Login" }}
              </button>
            </form>

            <!-- REGISTER -->
            <p class="mt-6 text-center text-sm text-white/70">
              Belum memiliki akun ?

              <router-link
                to="/register"
                class="font-semibold text-[#FBE4D8]"
              >
                Register disini
              </router-link>
            </p>
          </div>
        </div>

        <!-- RIGHT IMAGE -->
        <div class="hidden md:block">
          <img
            src="/images/login-fashion.png"
            alt="Login Image"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
