<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const cartStore = useCartStore()

onMounted(() => {
  cartStore.clearCart()
})
</script>

<template>
  <section class="min-h-screen bg-background px-5 pt-28 pb-10 text-primary">
    <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
      <div class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <span class="text-5xl">✅</span>
      </div>

      <h1 class="text-3xl font-bold md:text-5xl">Pembayaran Berhasil</h1>

      <p class="mt-4 max-w-xl text-sm text-primary">
        Terima kasih, pembayaran kamu sudah berhasil diproses. Pesanan akan segera kami lanjutkan.
      </p>

      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          @click="router.push('/product')"
          class="rounded-full bg-accent2 px-7 py-3 text-sm font-semibold text-white hover:bg-accent"
        >
          Belanja Lagi
        </button>

        <button
          @click="router.push('/')"
          class="rounded-full border px-7 py-3 text-sm font-semibold text-accent2 hover:bg-soft/40"
        >
          Kembali ke Home
        </button>
      </div>
    </div>
  </section>
</template>
