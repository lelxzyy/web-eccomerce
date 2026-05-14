<script setup lang="ts">
import { onMounted, computed } from "vue"
import { useProductStore } from "@/stores/productStore"
import ProductCard from "@/components/Products/ProductCard.vue"
import Footer from "@/components/Footer.vue"
const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})

const rekomendasi = computed(() => {
  return productStore.products.slice(0, 3)
})
</script>

<template>
  <div class="min-h-screen bg-white pt-20 text-primary">
    <!-- HERO -->
    <section class="relative overflow-hidden border-b border-primary/10">
      <!-- Background Glow -->
      <div class="absolute inset-0 opacity-40">
        <div class="absolute left-10 top-10 h-40 w-40 rounded-full bg-soft blur-3xl"></div>
        <div class="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-accent2 blur-3xl"></div>
      </div>

      <!-- Content -->
      <div
        class="relative z-10 mx-auto flex min-h-[300px] max-w-4xl flex-col items-center justify-center px-4 text-center"
      >
        <div
          class="mb-4 rounded-full border border-primary/10 bg-white/60 px-5 py-1 text-sm font-semibold text-primary backdrop-blur-md"
        >
          Halo
        </div>

        <h1 class="mb-3 text-2xl font-extrabold text-primary md:text-3xl">
          Selamat Datang di Website <br />
          Lelxzyy.Shop
        </h1>

        <p class="text-sm text-primary/70 ">
          Menyediakan segala keperluan outfit kamu <br />
          dapatkan sekarang!
        </p>
      </div>
    </section>

    <!-- REKOMENDASI -->
    <section class="py-8">
      <div class="mx-auto max-w-5xl px-4 text-center">
        <h2 class="text-2xl font-extrabold text-primary">
          Rekomendasi
        </h2>

        <p class="mt-1 text-sm text-primary/70">
          Buat kamu yang lagi bingung milih outfit
        </p>

        <!-- Loading -->
        <div
          v-if="productStore.loading"
          class="mt-8 grid gap-5 md:grid-cols-3"
        >
          <div
            v-for="n in 3"
            :key="n"
            class="h-[260px] animate-pulse rounded-2xl bg-white/70 shadow-sm"
          ></div>
        </div>

        <!-- Product Recommendation -->
        <div
          v-else-if="rekomendasi.length > 0"
          class="mt-8 grid gap-5 md:grid-cols-3"
        >
          <ProductCard
            v-for="product in rekomendasi"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- Empty -->
        <div
          v-else
          class="mt-8 rounded-2xl bg-white/70 p-8 shadow-sm"
        >
          <p class="text-sm text-primary/70">
            Belum ada produk rekomendasi.
          </p>
        </div>

        <router-link
          to="/product"
          class="mt-8 inline-block rounded-full bg-accent2 px-6 py-3 text-sm font-bold text-white transition hover:bg-accent"
        >
          Lihat Semua Produk
        </router-link>
      </div>
    </section>

    <!-- SECTION BAWAH -->
    <section class="min-h-[300px]"></section>
  </div>
  <Footer />
</template>
