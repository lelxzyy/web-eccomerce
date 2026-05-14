<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useCartStore } from "@/stores/cartStore"
import Footer from "@/components/Footer.vue"
import axios from "axios"

const cartStore = useCartStore()

const user = JSON.parse(localStorage.getItem("user") || "{}")

const receiverName = ref(user.name || "")
const phone = ref(user.phone || "")
const address = ref(user.address || "")

onMounted(() => {
  cartStore.loadCart()
})

const formatRupiah = (price: number) => {
  return price.toLocaleString("id-ID")
}

const checkout = async () => {
  try {
    if (!receiverName.value) {
      alert("Nama penerima belum diisi")
      return
    }

    if (!phone.value) {
      alert("Nomor telepon belum diisi")
      return
    }

    if (!address.value) {
      alert("Alamat belum diisi")
      return
    }

    const total =
      cartStore.totalPrice +
      Math.round(cartStore.totalPrice * 0.08)

    const token = localStorage.getItem("token")

    const response = await axios.post(
      "https://pay.lelxzyy.my.id/api/checkout/xendit",
      {
        amount: total,
        receiver_name: receiverName.value,
        phone: phone.value,
        address: address.value,

        items: cartStore.items.map((item) => ({
          product_id: item.product.id,
          name: item.product.name,
          quantity: item.qty,
          price: item.product.price,
          category: item.product.category?.name || "Produk",
        })),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (response.data.payment_url) {
      window.location.href = response.data.payment_url
    } else if (response.data.invoice_url) {
      window.location.href = response.data.invoice_url
    } else {
      alert("Invoice gagal dibuat")
    }
  } catch (error) {
    console.error(error)
    alert("Checkout gagal")
  }
}
</script>

<template>
  <section class="min-h-screen bg-white px-5 pt-28 pb-10 text-primary">
    <div class="mx-auto max-w-6xl">
      <div class="mb-10">
        <h1 class="text-4xl font-bold md:text-5xl">
          Keranjang kamu
        </h1>

        <p class="mt-2 text-sm text-primary/70">
          Kamu memiliki {{ cartStore.totalItems }} item di keranjang
        </p>
      </div>

      <div
        v-if="cartStore.loading"
        class="rounded-2xl bg-white p-10 text-center text-primary/70 shadow-sm"
      >
        Memuat keranjang...
      </div>

      <div
        v-else-if="cartStore.items.length === 0"
        class="rounded-2xl bg-white p-12 text-center shadow-sm"
      >
        <p class="mb-5 text-xl font-semibold">
          Keranjang masih kosong
        </p>

        <router-link
          to="/product"
          class="inline-flex rounded-full bg-accent2 px-7 py-3 text-sm font-semibold text-white hover:bg-accent"
        >
          Lihat Produk
        </router-link>
      </div>

      <div v-else class="grid gap-7 lg:grid-cols-3">
        <div class="space-y-5 lg:col-span-2">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm hover:shadow-md sm:flex-row sm:p-6"
          >
            <img
              :src="`http://127.0.0.1:8000/storage/${item.product.image}`"
              class="h-32 w-full rounded-xl object-cover sm:w-32"
            />

            <div class="flex flex-1 flex-col gap-5 md:flex-row md:justify-between">
              <div>
                <h2 class="text-xl font-bold">
                  {{ item.product.name }}
                </h2>

                <p class="mt-1 text-sm text-primary/70">
                  Stok: {{ item.product.stock }}
                </p>

                <p class="mt-1 text-sm text-primary/60">
                  {{ item.product.description }}
                </p>

                <div class="mt-5 inline-flex items-center rounded-full bg-soft/40">
                  <button
                    class="px-4 py-1.5"
                    @click="
                      item.qty > 1
                        ? cartStore.updateQty(item.id, item.qty - 1)
                        : cartStore.removeCart(item.id)
                    "
                  >
                    -
                  </button>

                  <span class="px-3 text-sm font-semibold">
                    {{ item.qty }}
                  </span>

                  <button
                    class="px-4 py-1.5 disabled:opacity-40"
                    :disabled="item.qty >= item.product.stock"
                    @click="cartStore.updateQty(item.id, item.qty + 1)"
                  >
                    +
                  </button>
                </div>
              </div>

              <div class="flex flex-row items-center justify-between md:flex-col md:items-end">
                <p class="text-2xl font-bold text-accent2">
                  Rp {{ formatRupiah(item.product.price * item.qty) }}
                </p>

                <button
                  class="text-sm text-primary/70 hover:text-red-500"
                  @click="cartStore.removeCart(item.id)"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>

          <router-link
            to="/product"
            class="text-sm text-primary/70 hover:underline"
          >
            ← Lanjut belanja
          </router-link>
        </div>

        <aside class="h-fit rounded-2xl bg-white p-8 shadow-sm">
          <h2 class="mb-6 text-xl font-bold">
            Ringkasan Pesanan
          </h2>

          <div class="mb-4">
            <label class="mb-2 block text-sm font-semibold text-primary">
              Nama Penerima
            </label>

            <input
              v-model="receiverName"
              type="text"
              class="w-full rounded-2xl border border-black/10 bg-soft/20 px-4 py-3 text-sm outline-none focus:border-accent2"
              placeholder="Masukkan nama penerima"
            />
          </div>

          <div class="mb-4">
            <label class="mb-2 block text-sm font-semibold text-primary">
              Nomor Telepon
            </label>

            <input
              v-model="phone"
              type="text"
              class="w-full rounded-2xl border border-black/10 bg-soft/20 px-4 py-3 text-sm outline-none focus:border-accent2"
              placeholder="Masukkan nomor telepon"
            />
          </div>

          <div class="mb-6">
            <label class="mb-2 block text-sm font-semibold text-primary">
              Alamat Pengiriman
            </label>

            <textarea
              v-model="address"
              rows="4"
              class="w-full rounded-2xl border border-black/10 bg-soft/20 px-4 py-3 text-sm outline-none focus:border-accent2"
              placeholder="Masukkan alamat lengkap"
            ></textarea>

            <p class="mt-2 text-xs text-primary/50">
              Data penerima bisa kamu ubah khusus untuk checkout ini.
            </p>
          </div>

          <div class="space-y-4 text-sm">
            <div class="flex justify-between text-primary/70">
              <span>Subtotal</span>
              <span class="text-primary">
                Rp {{ formatRupiah(cartStore.totalPrice) }}
              </span>
            </div>

            <div class="flex justify-between text-primary/70">
              <span>Pengiriman</span>
              <span class="text-primary">
                Dihitung nanti
              </span>
            </div>

            <div class="flex justify-between text-primary/70">
              <span>Pajak</span>
              <span class="text-primary">
                Rp {{ formatRupiah(Math.round(cartStore.totalPrice * 0.08)) }}
              </span>
            </div>

            <hr />

            <div class="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span class="text-accent2">
                Rp {{
                  formatRupiah(
                    cartStore.totalPrice +
                    Math.round(cartStore.totalPrice * 0.08)
                  )
                }}
              </span>
            </div>
          </div>

          <button
            @click="checkout"
            class="mt-6 w-full rounded-full bg-accent2 py-3 font-semibold text-white transition hover:bg-accent"
          >
            Checkout Sekarang →
          </button>

          <div class="mt-6 space-y-2 text-xs text-primary/60">
            <p>✔ Pembayaran aman</p>
            <p>🚚 Gratis ongkir tertentu</p>
          </div>

          <button
            class="mt-4 w-full rounded-full border py-2 text-sm text-accent2 hover:bg-soft/40"
            @click="cartStore.clearCart()"
          >
            Kosongkan Keranjang
          </button>
        </aside>
      </div>
    </div>
  </section>

  <Footer />
</template>
