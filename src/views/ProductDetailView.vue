<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useProductStore } from "@/stores/productStore"
import { useCartStore } from "@/stores/cartStore"

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const productId = computed(() => Number(route.params.id))

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.fetchProducts()
  }
})

const product = computed(() => {
  return productStore.products.find((item) => item.id === productId.value)
})

const formatRupiah = (price: number) => {
  return price.toLocaleString("id-ID")
}

const addToCart = () => {
  if (!product.value) return
  cartStore.addToCart(product.value)
}

const buyNow = () => {
  if (!product.value) return
  cartStore.addToCart(product.value)
  router.push("/cart")
}
</script>

<template>
  <section
    class="min-h-screen bg-white px-4 pt-24 pb-10"
  >
    <div class="mx-auto max-w-5xl">
      <button
        @click="router.back()"
        class="mb-5 rounded-xl border border-primary/10 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary backdrop-blur-xl transition hover:bg-primary/20"
      >
        Kembali
      </button>

      <div v-if="productStore.loading" class="text-center text-primary">
        Loading...
      </div>

      <div
        v-else-if="product"
        class="grid gap-6 rounded-3xl border border-primary/10 bg-primary/10 p-5 text-primary shadow-lg backdrop-blur-xl md:grid-cols-2"
      >
        <!-- Image -->
        <div class="overflow-hidden rounded-2xl">
          <img
            :src="`http://127.0.0.1:8000/storage/${product.image}`"
            :alt="product.name"
            class="h-[360px] w-full object-cover"
          />
        </div>

        <!-- Detail -->
        <div class="flex flex-col justify-center">
          <span
            class="mb-3 w-fit rounded-full border px-3 py-1 text-xs"
            :class="
              product.stock > 0
                ? 'border-green-400/30 bg-green-400/20 text-green-600'
                : 'border-red-400/30 bg-red-500/20 text-red-600'
            "
          >
            {{ product.stock > 0 ? 'Tersedia' : 'Habis' }}
          </span>

          <h1 class="text-2xl font-bold md:text-3xl">
            {{ product.name }}
          </h1>

          <p class="mt-4 text-sm leading-relaxed text-primary/70">
            {{ product.description }}
          </p>

          <p class="mt-5 text-2xl font-extrabold text-primary">
            Rp {{ formatRupiah(product.price) }}
          </p>

          <p class="mt-2 text-sm text-primary/60">
            Stok: {{ product.stock }}
          </p>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              class="rounded-xl border border-primary/20 bg-primary/10 py-2 text-sm font-semibold text-primary transition hover:bg-primary/20 disabled:bg-primary/5 disabled:text-primary/40"
              :disabled="product.stock === 0"
              @click="addToCart"
            >
              + Keranjang
            </button>

            <button
              class="rounded-xl bg-accent py-2 text-sm font-bold text-white transition hover:bg-primary disabled:bg-primary/10 disabled:text-primary/40"
              :disabled="product.stock === 0"
              @click="buyNow"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>

      <div
        v-else
        class="rounded-3xl border border-primary/10 bg-primary/10 p-10 text-center text-primary backdrop-blur-xl"
      >
        Produk tidak ditemukan.
      </div>
    </div>
  </section>
</template>
