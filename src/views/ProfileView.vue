<script setup lang="ts">
import axios from "axios"
import { computed, ref, onMounted } from "vue"

const API_URL = "http://127.0.0.1:8000"

const savedUser = localStorage.getItem("user")
const user = ref(savedUser ? JSON.parse(savedUser) : null)

const editMode = ref(false)
const loading = ref(false)
const sendingEmail = ref(false)
const message = ref("")
const error = ref("")
const previewPhoto = ref("")
const fileInput = ref<HTMLInputElement | null>(null)
const orders = ref<any[]>([])

const form = ref({
  name: user.value?.name || "",
  email: user.value?.email || "",
  phone: user.value?.phone || "",
  address: user.value?.address || "",
  photo: null as File | null,
})

const photoUrl = computed(() => {
  if (previewPhoto.value) return previewPhoto.value
  if (user.value?.photo) return `${API_URL}/storage/${user.value.photo}`
  return ""
})

const productImageUrl = (image: string | null | undefined) => {
  if (!image) return "https://placehold.co/100x100?text=No+Image"

  if (image.startsWith("http")) return image

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
    const token = localStorage.getItem("token")

    const res = await axios.get(`${API_URL}/api/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    orders.value = res.data.data
  } catch (err) {
    console.error(err)
  }
}

const sendOrderHistoryEmail = async () => {
  try {
    sendingEmail.value = true
    message.value = ""
    error.value = ""

    const token = localStorage.getItem("token")

    await axios.post(
      `${API_URL}/api/orders/send-email`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    message.value = "Riwayat pembelian berhasil dikirim ke email"
  } catch (err: any) {
    error.value =
      err.response?.data?.message ||
      "Gagal mengirim riwayat pembelian"
  } finally {
    sendingEmail.value = false
  }
}

const updateProfile = async () => {
  try {
    loading.value = true
    message.value = ""
    error.value = ""

    const token = localStorage.getItem("token")
    const formData = new FormData()

    formData.append("name", form.value.name)
    formData.append("email", form.value.email)
    formData.append("phone", form.value.phone)
    formData.append("address", form.value.address)

    if (form.value.photo) {
      formData.append("photo", form.value.photo)
    }

    const res = await axios.post(
      `${API_URL}/api/profile/update`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    user.value = res.data.user
    localStorage.setItem("user", JSON.stringify(res.data.user))

    window.dispatchEvent(new Event("user-updated"))

    message.value = "Profile berhasil diperbarui"
    editMode.value = false
  } catch (err: any) {
    error.value =
      err.response?.data?.message ||
      "Gagal update profile"
  } finally {
    loading.value = false
  }
}

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  window.dispatchEvent(new Event("user-updated"))

  window.location.href = "/login"
}

const formatRupiah = (price: number) => {
  return Number(price).toLocaleString("id-ID")
}

const formatStatus = (status: string) => {
  if (status === "paid") return "Sudah Dibayar"
  if (status === "pending") return "Menunggu Pembayaran"
  if (status === "failed") return "Gagal"
  if (status === "expired") return "Expired"

  return status
}

onMounted(() => {
  loadOrders()
})
</script>

<template>
  <section
    class="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#ececec] px-4 pb-10 pt-32"
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-8">
        <h1 class="text-5xl font-extrabold text-[#190019]">
          Profile
        </h1>

        <p class="mt-2 text-sm text-gray-500">
          kelola akun dan riwayat pembelian
        </p>
      </div>

      <div
        class="grid overflow-hidden rounded-[30px] bg-white shadow-2xl md:grid-cols-3"
      >
        <!-- SIDEBAR -->
        <div
          class="flex flex-col items-center bg-[#190019] p-10 text-white"
        >
          <div class="relative">
            <div
              class="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-[#FBE4D8] text-4xl font-bold text-[#190019]"
            >
              <img
                v-if="photoUrl"
                :src="photoUrl"
                class="h-full w-full object-cover"
              />

              <span v-else>
                {{ user?.name?.charAt(0) }}
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
              class="absolute bottom-0 right-0 rounded-full bg-[#FBE4D8] p-2 text-[#190019]"
            >
              ✎
            </button>
          </div>

          <h2 class="mt-5 text-2xl font-bold">
            {{ user?.name }}
          </h2>

          <p class="mt-1 text-sm text-white/60">
            {{ user?.email }}
          </p>

          <div class="mt-8 w-full space-y-3">
            <button
              v-if="!editMode"
              @click="editMode = true"
              class="w-full rounded-2xl bg-[#FBE4D8] px-4 py-3 font-bold text-[#190019] transition hover:scale-[1.02]"
            >
              Edit Profile
            </button>

            <button
              v-if="editMode"
              @click="editMode = false"
              class="w-full rounded-2xl bg-white/10 px-4 py-3"
            >
              Batal
            </button>

            <button
              @click="logout"
              class="w-full rounded-2xl bg-red-500/20 px-4 py-3 font-semibold text-red-200"
            >
              Logout
            </button>
          </div>
        </div>

        <!-- CONTENT -->
        <div class="p-8 md:col-span-2">
          <div
            v-if="message"
            class="mb-5 rounded-2xl bg-green-500/10 px-4 py-3 text-sm text-green-600"
          >
            {{ message }}
          </div>

          <div
            v-if="error"
            class="mb-5 rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-500"
          >
            {{ error }}
          </div>

          <div v-if="!editMode" class="space-y-5">
            <div
              class="rounded-3xl border border-gray-100 bg-[#fafafa] p-5"
            >
              <p class="text-sm text-gray-400">Nama</p>

              <p class="mt-1 font-semibold text-[#190019]">
                {{ user?.name || "-" }}
              </p>
            </div>

            <div
              class="rounded-3xl border border-gray-100 bg-[#fafafa] p-5"
            >
              <p class="text-sm text-gray-400">No HP</p>

              <p class="mt-1 font-semibold text-[#190019]">
                {{ user?.phone || "-" }}
              </p>
            </div>

            <div
              class="rounded-3xl border border-gray-100 bg-[#fafafa] p-5"
            >
              <p class="text-sm text-gray-400">Alamat</p>

              <p class="mt-1 font-semibold text-[#190019]">
                {{ user?.address || "-" }}
              </p>
            </div>

            <!-- ORDERS -->
            <div
              class="rounded-3xl border border-gray-100 bg-[#fafafa] p-5"
            >
              <div
                class="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h2 class="text-xl font-bold text-[#190019]">
                    Riwayat Pembelian
                  </h2>

                  <span class="text-sm text-gray-400">
                    {{ orders.length }} pesanan
                  </span>
                </div>

                <button
                  @click="sendOrderHistoryEmail"
                  :disabled="sendingEmail || orders.length === 0"
                  class="rounded-2xl bg-[#190019] px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {{
                    sendingEmail
                      ? "Mengirim..."
                      : "Kirim Riwayat ke Email"
                  }}
                </button>
              </div>

              <div
                v-if="orders.length === 0"
                class="text-sm text-gray-400"
              >
                Belum ada pembelian.
              </div>

              <div v-else class="space-y-4">
                <div
                  v-for="order in orders"
                  :key="order.id"
                  class="rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div class="flex items-center justify-between gap-3">
                    <div>
                      <p class="font-bold text-[#190019]">
                        Order #{{ order.id }}
                      </p>

                      <p class="text-xs text-gray-400">
                        {{ order.created_at }}
                      </p>
                    </div>

                    <span
                      class="rounded-full px-3 py-1 text-xs font-semibold"
                      :class="{
                        'bg-yellow-100 text-yellow-700':
                          order.status === 'pending',

                        'bg-green-100 text-green-700':
                          order.status === 'paid',

                        'bg-red-100 text-red-700':
                          order.status === 'failed',

                        'bg-gray-200 text-gray-600':
                          order.status === 'expired',
                      }"
                    >
                      {{ formatStatus(order.status) }}
                    </span>
                  </div>

                  <!-- ITEMS WITH IMAGE -->
                  <div class="mt-4 space-y-3">
                    <div
                      v-for="item in order.items"
                      :key="item.id"
                      class="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-[#fafafa] p-4"
                    >
                      <div class="flex items-center gap-4">
                        <img
                          :src="productImageUrl(item.product?.image)"
                          class="h-20 w-20 rounded-2xl border border-gray-200 object-cover"
                          alt="Product Image"
                        />

                        <div>
                          <p class="text-base font-bold text-primary">
                            {{ item.product?.name || "Produk" }}
                          </p>

                          <p class="mt-1 text-sm text-gray-400">
                            Qty: {{ item.qty }}
                          </p>

                          <p class="mt-1 text-sm font-semibold text-[#190019]">
                            Rp {{ formatRupiah(item.price) }}
                          </p>
                        </div>
                      </div>

                      <div class="text-right">
                        <p class="text-xs text-gray-400">
                          Subtotal
                        </p>

                        <p class="text-lg font-bold text-[#190019]">
                          Rp
                          {{
                            formatRupiah(
                              item.price * item.qty
                            )
                          }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    class="mt-4 flex justify-between border-t pt-4 font-bold text-[#190019]"
                  >
                    <span>Total</span>

                    <span>
                      Rp
                      {{
                        formatRupiah(
                          order.total ||
                            order.amount ||
                            0
                        )
                      }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- EDIT FORM -->
          <form
            v-else
            @submit.prevent="updateProfile"
            class="space-y-5"
          >
            <div>
              <label class="mb-2 block text-sm text-gray-500">
                Nama
              </label>

              <input
                v-model="form.name"
                class="text-primary w-full rounded-2xl border border-primary bg-[#fafafa] px-5 py-3 outline-none focus:ring-2 focus:ring-[#DFB6B2]"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm text-gray-500">
                Email
              </label>

              <input
                v-model="form.email"
                type="email"
                class="text-primary w-full rounded-2xl border border-gray-200 bg-[#fafafa] px-5 py-3 outline-none focus:ring-2 focus:ring-[#DFB6B2]"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm text-gray-500">
                No HP
              </label>

              <input
                v-model="form.phone"
                class="text-primary w-full rounded-2xl border border-gray-200 bg-[#fafafa] px-5 py-3 outline-none focus:ring-2 focus:ring-[#DFB6B2]"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm text-gray-500">
                Alamat
              </label>

              <textarea
                v-model="form.address"
                rows="4"
                class="text-primary w-full rounded-2xl border border-gray-200 bg-[#fafafa] px-5 py-3 outline-none focus:ring-2 focus:ring-[#DFB6B2]"
              ></textarea>
            </div>

            <button
              :disabled="loading"
              class="w-full rounded-2xl bg-[#190019] py-3 text-lg font-bold text-white transition hover:scale-[1.01]"
            >
              {{
                loading
                  ? "Menyimpan..."
                  : "Simpan Perubahan"
              }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
