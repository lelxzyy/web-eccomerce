<script setup lang="ts">
import ProductCard from '@/components/Products/ProductCard.vue'
import type { Product } from '@/types/product'

defineProps<{
  products: Product[]
  loading: boolean
}>()
</script>

<template>
  <section
    class="relative overflow-hidden bg-gradient-primary py-12"
  >
    <!-- Dark Overlay -->
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(88,28,135,0.08),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(91,33,182,0.10),_transparent_40%)]"
    ></div>

    <!-- Noise -->
    <div class="absolute inset-0 bg-black/[0.03]"></div>

    <!-- Background -->
    <div class="absolute inset-0">
      <!-- Glow -->
      <div class="absolute left-0 top-10 h-72 w-72 rounded-full bg-soft/40 blur-3xl"></div>

      <div class="absolute right-0 top-40 h-72 w-72 rounded-full bg-soft/40 blur-3xl"></div>

      <div
        class="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-soft/40 blur-3xl"
      ></div>

      <!-- Animated Boxes -->
      <div
        class="absolute left-[5%] top-[10%] h-24 w-24 animate-pulse rounded-3xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm"
      ></div>

      <div
        class="absolute left-[15%] top-[40%] h-14 w-14 animate-bounce rounded-2xl border border-violet-500/30 bg-violet-500/10"
      ></div>

      <div
        class="absolute left-[30%] top-[20%] h-20 w-20 animate-pulse rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10"
      ></div>

      <div
        class="absolute left-[45%] top-[5%] h-16 w-16 animate-bounce rounded-2xl border border-purple-500/30 bg-purple-500/10"
      ></div>

      <div
        class="absolute left-[60%] top-[25%] h-28 w-28 animate-pulse rounded-[2rem] border border-violet-500/30 bg-violet-500/10"
      ></div>

      <div
        class="absolute left-[75%] top-[15%] h-16 w-16 animate-bounce rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10"
      ></div>

      <div
        class="absolute right-[10%] top-[35%] h-24 w-24 animate-pulse rounded-3xl border border-purple-500/30 bg-purple-500/10"
      ></div>

      <div
        class="absolute bottom-[15%] left-[8%] h-20 w-20 animate-bounce rounded-2xl border border-violet-500/30 bg-violet-500/10"
      ></div>

      <div
        class="absolute bottom-[8%] left-[28%] h-14 w-14 animate-pulse rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10"
      ></div>

      <div
        class="absolute bottom-[20%] left-[50%] h-24 w-24 animate-bounce rounded-[2rem] border border-purple-500/30 bg-purple-500/10"
      ></div>

      <div
        class="absolute bottom-[10%] right-[30%] h-16 w-16 animate-pulse rounded-2xl border border-violet-500/30 bg-violet-500/10"
      ></div>

      <div
        class="absolute bottom-[5%] right-[10%] h-28 w-28 animate-bounce rounded-3xl border border-fuchsia-500/30 bg-fuchsia-500/10"
      ></div>
    </div>

    <div class="relative z-10 mx-auto max-w-6xl px-4">
      <!-- Heading -->
      <div class="text-left">
        <h2 class="text-2xl font-extrabold text-primary">Rekomendasi</h2>

        <p class="mt-1 text-sm text-primary/70">Buat kamu yang lagi bingung milih outfit</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="mt-8 grid gap-6 md:grid-cols-4">
        <div
          v-for="n in 4"
          :key="n"
          class="h-[340px] animate-pulse rounded-3xl bg-white/70 shadow-sm"
        ></div>
      </div>

      <!-- Products -->
      <div v-else-if="products.length > 0" class="mt-8 grid gap-6 md:grid-cols-4">
        <!-- Product -->
        <ProductCard v-for="product in products.slice(0, 3)" :key="product.id" :product="product" />

        <!-- CTA -->
        <div
          class="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl bg-primary p-6 text-left text-white shadow-xl"
        >
          <!-- Glow -->
          <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-soft/30 blur-3xl"></div>

          <div
            class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent2/40 blur-3xl"
          ></div>

          <!-- Content -->
          <div class="relative z-10">
            <p class="text-sm font-semibold text-soft">Koleksi Lengkap</p>

            <h3 class="mt-3 text-3xl font-extrabold leading-tight">Mau lihat lebih banyak?</h3>

            <p class="mt-3 text-sm leading-relaxed text-white/70">
              Temukan outfit keren lainnya yang cocok untuk gaya harian kamu hanya di Lelxzyy.Shop.
            </p>
          </div>

          <!-- Button -->
          <router-link
            to="/product"
            class="relative z-10 mt-6 inline-block rounded-full bg-white px-5 py-3 text-center text-sm font-bold text-primary transition hover:bg-soft"
          >
            Lihat Produk Lainnya
          </router-link>
        </div>
      </div>

      <!-- Empty -->
      <div v-else class="mt-8 rounded-3xl bg-white/70 p-8 text-center shadow-sm">
        <p class="text-sm text-primary/70">Belum ada produk rekomendasi.</p>
      </div>
    </div>
  </section>
</template>
