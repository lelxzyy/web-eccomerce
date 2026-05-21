<script setup lang="ts">
const categories = [
  {
    title: 'Kaos',
    desc: 'Style santai dan nyaman',
    icon: '👕',
  },
  {
    title: 'Korsa',
    desc: 'Formal, rapi, dan elegan',
    icon: '🧥',
  },
  {
    title: 'Celana',
    desc: 'Casual untuk harian',
    icon: '👖',
  },
  {
    title: 'Aksesoris',
    desc: 'Lengkapi outfit kamu',
    icon: '🧢',
  },
]
</script>

<template>
  <section class="py-8">
    <div class="mx-auto max-w-6xl px-4">
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-extrabold text-primary">Kategori Produk</h2>
        <p class="mt-1 text-sm text-primary/70">Pilih outfit sesuai kebutuhan kamu</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div
          v-for="category in categories"
          :key="category.title"
          class="rounded-3xl border border-primary/10 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="mb-3 text-4xl">
            {{ category.icon }}
          </div>

          <h3 class="text-lg font-extrabold text-primary">
            {{ category.title }}
          </h3>

          <p class="mt-1 text-sm text-primary/60">
            {{ category.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
