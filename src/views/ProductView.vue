<script setup lang="ts">
import { onMounted, ref, computed } from "vue"
import { useProductStore } from "@/stores/productStore"
import ProductCard from "@/components/Products/ProductCard.vue"
import Footer from "@/components/Footer.vue"

const productStore = useProductStore()

const selectedCategory = ref("Semua")
const searchQuery = ref("")

const categories = computed(() => {
  const categoryNames = productStore.products
    .map((product: any) => product.category?.name)
    .filter(Boolean)

  return ["Semua", ...new Set(categoryNames)]
})

const filteredProducts = computed(() => {
  return productStore.products.filter((product: any) => {
    const matchCategory =
      selectedCategory.value === "Semua" ||
      product.category?.name === selectedCategory.value

    const keyword = searchQuery.value.toLowerCase()

    const matchSearch =
      product.name?.toLowerCase().includes(keyword) ||
      product.description?.toLowerCase().includes(keyword) ||
      product.category?.name?.toLowerCase().includes(keyword)

    return matchCategory && matchSearch
  })
})

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <section class="min-h-screen bg-white px-5 pt-28 pb-16 text-primary">
    <div class="mx-auto max-w-6xl">
      <div class="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div class="w-full">
          <h1 class="text-5xl font-extrabold tracking-tight md:text-6xl">
            Trending Outfits
          </h1>

          <p class="mt-4 max-w-xl text-sm leading-6 text-primary">
            Koleksi outfit pilihan dengan tampilan elegan, modern, dan cocok
            untuk gaya harian kamu.
          </p>

          <!-- Search -->
          <div class="mt-6 max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari produk..."
              class="w-full rounded-2xl border border-primary/10 bg-white px-5 py-3 text-sm text-primary shadow-sm outline-none transition placeholder:text-primary/40 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <!-- Category -->
          <div class="mt-4 flex flex-wrap gap-3">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'rounded-full px-6 py-2 text-sm font-semibold transition',
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white/50 text-primary/60 hover:bg-primary/10'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <button
          class="w-fit rounded-xl border border-white/60 bg-white/30 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-white/60"
        >
          ☷ Filter & Urutkan
        </button>
      </div>

      <!-- Loading Skeleton -->
      <div
        v-if="productStore.loading"
        class="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div
          v-for="n in 8"
          :key="n"
          class="h-[360px] animate-pulse rounded-2xl bg-white/60 shadow-sm"
        ></div>
      </div>

      <!-- Empty -->
      <div
        v-else-if="filteredProducts.length === 0"
        class="rounded-2xl bg-white/70 p-10 text-center shadow-sm"
      >
        <p class="text-sm text-primary/70">
          Produk tidak ditemukan.
        </p>
      </div>

      <!-- Product Grid -->
      <div
        v-else
        class="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>

  <Footer />
</template>
