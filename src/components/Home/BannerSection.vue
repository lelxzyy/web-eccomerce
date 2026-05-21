<script setup lang="ts">
const banners = [
  {
    title: "Streetwear Style",
    subtitle: "New Collection",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200",
  },
  {
    title: "Outfit Premium",
    subtitle: "Limited Edition",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200",
  },
  {
    title: "Casual Everyday",
    subtitle: "Trending 2026",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200",
  },
]
</script>

<template>
  <section class="py-8">
    <div class="mx-auto max-w-6xl px-4">
      <div class="grid gap-5 md:grid-cols-3">
        <div
          v-for="(banner, index) in banners"
          :key="index"
          class="group relative overflow-hidden rounded-3xl bg-black"
        >
          <img
            :src="banner.image"
            class="h-[220px] w-full object-cover opacity-80 transition duration-500 group-hover:scale-110"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
          ></div>

          <div class="absolute bottom-5 left-5 text-left text-white">
            <p class="text-sm opacity-80">
              {{ banner.subtitle }}
            </p>

            <h2 class="text-2xl font-extrabold">
              {{ banner.title }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
