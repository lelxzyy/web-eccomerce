<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { AuthService } from '@/services/authService'
import { OrderService } from '@/services/orderService'
import type { Order } from '@/types/order'

const API_URL = 'http://127.0.0.1:8000'

const savedUser = localStorage.getItem('user')
const user = ref(savedUser ? JSON.parse(savedUser) : null)

const editMode = ref(false)
const loading = ref(false)
const sendingEmail = ref(false)
const message = ref('')
const error = ref('')
const previewPhoto = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const orders = ref<Order[]>([])

const form = ref({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  address: user.value?.address || '',
  photo: null as File | null,
})

const photoUrl = computed(() => {
  if (previewPhoto.value) return previewPhoto.value
  if (user.value?.photo) return `${API_URL}/storage/${user.value.photo}`
  return ''
})

const productImageUrl = (image: string | null | undefined) => {
  if (!image) return 'https://placehold.co/100x100?text=No+Image'
  if (image.startsWith('http')) return image
  return `${API_URL}/storage/${image}`
}

const choosePhoto = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    form.value.photo = file
    previewPhoto.value = URL.createObjectURL(file)
  }
}

const loadOrders = async () => {
  try {
    orders.value = await OrderService.getMyOrders()
  } catch (err) {
    console.error(err)
  }
}

const sendOrderHistoryEmail = async () => {
  try {
    sendingEmail.value = true
    message.value = ''
    error.value = ''

    await OrderService.sendOrderHistoryEmail()

    message.value = 'Riwayat pembelian berhasil dikirim ke email'
  } catch (err) {
    const errorResponse = err as {
      response?: {
        data?: {
          message?: string
        }
      }
    }

    error.value =
      errorResponse.response?.data?.message || 'Gagal mengirim riwayat pembelian'
  } finally {
    sendingEmail.value = false
  }
}

const updateProfile = async () => {
  try {
    loading.value = true
    message.value = ''
    error.value = ''

    const formData = new FormData()

    formData.append('name', form.value.name)
    formData.append('email', form.value.email)
    formData.append('phone', form.value.phone)
    formData.append('address', form.value.address)

    if (form.value.photo) {
      formData.append('photo', form.value.photo)
    }

    const data = await AuthService.updateProfile(formData)

    user.value = data.user
    localStorage.setItem('user', JSON.stringify(data.user))

    window.dispatchEvent(new Event('user-updated'))

    message.value = 'Profile berhasil diperbarui'
    editMode.value = false
  } catch (err) {
    const errorResponse = err as {
      response?: {
        data?: {
          message?: string
        }
      }
    }

    error.value = errorResponse.response?.data?.message || 'Gagal update profile'
  } finally {
    loading.value = false
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  window.dispatchEvent(new Event('user-updated'))

  window.location.href = '/login'
}

const formatRupiah = (price: number) => {
  return Number(price).toLocaleString('id-ID')
}

const formatStatus = (status: string) => {
  if (status === 'paid') return 'Sudah Dibayar'
  if (status === 'pending') return 'Menunggu Pembayaran'
  if (status === 'failed') return 'Gagal'
  if (status === 'expired') return 'Expired'

  return status
}

onMounted(() => {
  loadOrders()
})
</script>

<template>
  <section class="relative min-h-screen overflow-hidden bg-background px-4 pb-10 pt-32 text-text">
    <div class="absolute left-0 top-20 h-72 w-72 rounded-full bg-soft/30 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent2/10 blur-3xl"></div>
    <div class="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-base/20 blur-3xl"></div>

    <div class="relative z-10 mx-auto max-w-6xl">
      <div class="mb-8">
        <div
          class="mb-4 inline-block rounded-full border border-border bg-surface px-5 py-1 text-sm font-semibold text-primary shadow-primary"
        >
          Akun Saya
        </div>

        <h1 class="text-4xl font-extrabold text-primary md:text-5xl">
          Profile
        </h1>

        <p class="mt-2 text-sm text-text-soft">
          Kelola akun dan riwayat pembelian kamu
        </p>
      </div>

      <div class="grid overflow-hidden rounded-[2rem] border border-border bg-surface shadow-hover md:grid-cols-3">
        <!-- SIDEBAR -->
        <div class="relative overflow-hidden bg-gradient-accent p-10 text-text-light">
          <div class="absolute left-10 top-10 h-32 w-32 rounded-full bg-soft/20 blur-3xl"></div>
          <div class="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-base/20 blur-3xl"></div>

          <div
            class="absolute right-20 top-24 h-16 w-16 rotate-12 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md"
          ></div>

          <div
            class="absolute bottom-24 left-10 h-12 w-12 -rotate-12 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md"
          ></div>

          <div class="relative z-10 flex flex-col items-center">
            <div class="relative">
              <div
                class="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white/20 bg-white text-4xl font-bold text-primary shadow-2xl"
              >
                <img
                  v-if="photoUrl"
                  :src="photoUrl"
                  class="h-full w-full object-cover"
                  alt="Profile"
                />

                <span v-else>
                  {{ user?.name?.charAt(0) || 'U' }}
                </span>
              </div>

              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="choosePhoto"
              />

              <button
                v-if="editMode"
                type="button"
                @click="fileInput?.click()"
                class="absolute bottom-0 right-0 rounded-full bg-base p-2 text-primary shadow-md transition hover:scale-110"
              >
                ✎
              </button>
            </div>

            <h2 class="mt-5 text-center text-2xl text-primary font-bold">
              {{ user?.name || 'User' }}
            </h2>

            <p class="mt-1 text-center text-primary">
              {{ user?.email || '-' }}
            </p>

            <div class="mt-8 w-full space-y-3">
              <button
                v-if="!editMode"
                @click="editMode = true"
                class="w-full rounded-2xl bg-base px-4 py-3 font-bold text-primary shadow-primary transition hover:scale-[1.02] hover:bg-soft"
              >
                Edit Profile
              </button>

              <button
                v-if="editMode"
                @click="editMode = false"
                class="w-full rounded-2xl bg-base px-4 py-3 font-bold text-primary shadow-primary transition hover:scale-[1.02] hover:bg-soft"
              >
                Batal
              </button>

              <button
                @click="logout"
                class="w-full rounded-2xl bg-red-700/30 px-4 py-3 font-semibold text-red-100 backdrop-blur-md transition hover:bg-red-500/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <!-- CONTENT -->
        <div class="bg-background p-8 md:col-span-2">
          <div
            v-if="message"
            class="mb-5 rounded-2xl border border-green-500/10 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-600"
          >
            {{ message }}
          </div>

          <div
            v-if="error"
            class="mb-5 rounded-2xl border border-red-500/10 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500"
          >
            {{ error }}
          </div>

          <div v-if="!editMode" class="space-y-5">
            <div class="rounded-[2rem] border border-border bg-surface p-5 shadow-primary">
              <p class="text-sm text-text-soft">Nama</p>
              <p class="mt-1 font-semibold text-primary">
                {{ user?.name || '-' }}
              </p>
            </div>

            <div class="rounded-[2rem] border border-border bg-surface p-5 shadow-primary">
              <p class="text-sm text-text-soft">No HP</p>
              <p class="mt-1 font-semibold text-primary">
                {{ user?.phone || '-' }}
              </p>
            </div>

            <div class="rounded-[2rem] border border-border bg-surface p-5 shadow-primary">
              <p class="text-sm text-text-soft">Alamat</p>
              <p class="mt-1 font-semibold text-primary">
                {{ user?.address || '-' }}
              </p>
            </div>

            <div class="rounded-[2rem] border border-border bg-surface p-5 shadow-primary">
              <div class="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 class="text-xl font-bold text-primary">
                    Riwayat Pembelian
                  </h2>

                  <span class="text-sm text-text-soft">
                    {{ orders.length }} pesanan
                  </span>
                </div>

                <button
                  @click="sendOrderHistoryEmail"
                  :disabled="sendingEmail || orders.length === 0"
                  class="rounded-2xl bg-gradient-accent px-5 py-3 text-sm font-bold text-text-light shadow-primary transition hover:scale-[1.02] hover:shadow-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {{ sendingEmail ? 'Mengirim...' : 'Kirim Riwayat ke Email' }}
                </button>
              </div>

              <div v-if="orders.length === 0" class="text-sm text-text-soft">
                Belum ada pembelian.
              </div>

              <div v-else class="space-y-4">
                <div
                  v-for="order in orders"
                  :key="order.id"
                  class="rounded-[2rem] border border-border bg-white p-5 shadow-primary"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-bold text-primary">
                        Order #{{ order.id }}
                      </p>

                      <p class="text-xs text-text-soft">
                        {{ order.created_at }}
                      </p>
                    </div>

                    <span
                      class="rounded-full px-3 py-1 text-xs font-semibold"
                      :class="{
                        'bg-yellow-100 text-yellow-700': order.status === 'pending',
                        'bg-green-100 text-green-700': order.status === 'paid',
                        'bg-red-100 text-red-700': order.status === 'failed',
                        'bg-gray-200 text-gray-600': order.status === 'expired',
                      }"
                    >
                      {{ formatStatus(order.status) }}
                    </span>
                  </div>

                  <div class="mt-4 space-y-3">
                    <div
                      v-for="item in order.items"
                      :key="item.id"
                      class="flex items-center justify-between gap-4 rounded-[1.5rem] border border-border bg-gradient-soft p-4"
                    >
                      <div class="flex items-center gap-4">
                        <img
                          :src="productImageUrl(item.product?.image)"
                          class="h-20 w-20 rounded-2xl border border-border object-cover"
                          alt="Product"
                        />

                        <div>
                          <p class="font-bold text-primary">
                            {{ item.product?.name || 'Produk' }}
                          </p>

                          <p class="mt-1 text-sm text-text-soft">
                            Qty: {{ item.qty }}
                          </p>

                          <p class="mt-1 text-sm font-semibold text-primary">
                            Rp {{ formatRupiah(item.price) }}
                          </p>
                        </div>
                      </div>

                      <div class="text-right">
                        <p class="text-xs text-text-soft">
                          Subtotal
                        </p>

                        <p class="text-lg font-bold text-primary">
                          Rp {{ formatRupiah(item.price * item.qty) }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="mt-4 flex justify-between border-t border-border pt-4 font-bold text-primary">
                    <span>Total</span>
                    <span>Rp {{ formatRupiah(order.total || order.amount || 0) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form v-else @submit.prevent="updateProfile" class="space-y-5">
            <div>
              <label class="mb-2 block text-sm text-text-soft">
                Nama
              </label>

              <input
                v-model="form.name"
                class="w-full rounded-2xl border border-border bg-surface px-5 py-3 text-text outline-none focus:ring-2 focus:ring-accent2"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm text-text-soft">
                Email
              </label>

              <input
                v-model="form.email"
                type="email"
                class="w-full rounded-2xl border border-border bg-surface px-5 py-3 text-text outline-none focus:ring-2 focus:ring-accent2"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm text-text-soft">
                No HP
              </label>

              <input
                v-model="form.phone"
                class="w-full rounded-2xl border border-border bg-surface px-5 py-3 text-text outline-none focus:ring-2 focus:ring-accent2"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm text-text-soft">
                Alamat
              </label>

              <textarea
                v-model="form.address"
                rows="4"
                class="w-full rounded-2xl border border-border bg-surface px-5 py-3 text-text outline-none focus:ring-2 focus:ring-accent2"
              ></textarea>
            </div>

            <button
              :disabled="loading"
              class="w-full rounded-2xl bg-base px-4 py-3 font-bold text-primary shadow-primary transition hover:scale-[1.02] hover:bg-soft"
            >
              {{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
