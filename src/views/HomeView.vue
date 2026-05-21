<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

import Footer from '@/components/AppFooter.vue'

import BannerSection from '@/components/Home/BannerSection.vue'
//import CategorySection from "@/components/Home/CategorySection.vue"
import PromoSection from '@/components/Home/PromoSection.vue'
import RecommendationSection from '@/components/Home/RecommendationSection.vue'
import WhyChooseUsSection from '@/components/Home/WhyChooseUsSection.vue'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})

const rekomendasi = computed(() => {
  return productStore.products.slice(0, 3)
})
</script>

<template>
  <div class="min-h-screen bg-background pt-20 text-primary">
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

        <p class="text-sm text-primary/70">
          Menyediakan segala keperluan outfit kamu <br />
          dapatkan sekarang!
        </p>
      </div>
    </section>

    <!-- BANNER -->
    <BannerSection />

    <!-- PROMO -->
    <PromoSection />

    <!-- REKOMENDASI -->
    <RecommendationSection :products="rekomendasi" :loading="productStore.loading" />

    <!-- WHY CHOOSE US -->
    <WhyChooseUsSection />

    <!-- SPACER -->
    <section class="min-h-[100px]"></section>
  </div>

  <!-- Footer -->
  <Footer />
</template>
