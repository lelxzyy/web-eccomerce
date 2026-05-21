<script setup lang="ts">
const features = [
  {
    icon: '🔥',
    title: 'Outfit Kekinian',
    desc: 'Desain modern dan selalu mengikuti trend fashion terbaru.',
  },
  {
    icon: '✨',
    title: 'Kualitas Premium',
    desc: 'Menggunakan bahan nyaman, adem, dan tahan lama dipakai.',
  },
  {
    icon: '🚀',
    title: 'Pengiriman Cepat',
    desc: 'Pesanan diproses dengan cepat dan aman sampai tujuan.',
  },
  {
    icon: '🔒',
    title: 'Pembayaran Aman',
    desc: 'Transaksi lebih aman dan terpercaya menggunakan payment gateway.',
  },
]
</script>

<template>
  <section class="py-10">
    <div class="mx-auto max-w-6xl px-4">
      <!-- Heading -->
      <div class="mb-8 text-center">
        <h2 class="text-2xl font-extrabold text-primary md:text-3xl">
          Kenapa Belanja di Lelxzyy.Shop?
        </h2>

        <p class="mt-2 text-sm text-primary/70">
          Kami memberikan pengalaman belanja outfit yang nyaman dan modern
        </p>
      </div>

      <!-- Feature Card -->
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="group rounded-3xl border border-primary/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <!-- Icon -->
          <div
            class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-soft text-3xl transition group-hover:scale-110"
          >
            {{ feature.icon }}
          </div>

          <!-- Title -->
          <h3 class="text-lg font-extrabold text-primary">
            {{ feature.title }}
          </h3>

          <!-- Desc -->
          <p class="mt-2 text-sm leading-relaxed text-primary/60">
            {{ feature.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
