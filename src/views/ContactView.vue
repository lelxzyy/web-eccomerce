<script setup lang="ts">
import Footer from '@/components/AppFooter.vue'
</script>

<template>
  <section class="min-h-screen bg-background px-4 pt-28 pb-20">
    <div class="mx-auto max-w-6xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-extrabold text-primary md:text-5xl">Kontak Kami</h1>
        <p class="mt-4 max-w-xl text-sm leading-relaxed text-primary/70">
          Hubungi kami untuk pertanyaan, kerja sama, atau informasi produk terbaru dari
          Lelxzyy.shop.
        </p>
      </div>

      <!-- Main Contact -->
      <div class="grid gap-8 md:grid-cols-2">
        <!-- Image Info Card -->
        <div
          class="relative min-h-[360px] overflow-hidden rounded-2xl bg-primary p-10 text-base shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
            alt="Fashion"
            class="absolute inset-0 h-full w-full object-cover opacity-35"
          />

          <div
            class="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent"
          ></div>

          <div class="relative z-10 flex h-full flex-col justify-end">
            <p class="mb-3 text-[11px] font-bold uppercase tracking-[0.35em] text-accent2">
              Lelxzyy Shop
            </p>

            <h2 class="text-3xl font-extrabold">Get in Touch</h2>

            <p class="mt-4 max-w-sm text-sm leading-relaxed text-base/75">
              Kami siap membantu kamu menemukan outfit terbaik, menjawab pertanyaan, dan memberikan
              informasi seputar produk kami.
            </p>
          </div>
        </div>

        <!-- Form -->
        <div class="rounded-2xl bg-primary p-8 text-base shadow-lg">
          <form class="space-y-5">
            <div>
              <label
                class="mb-2 block text-[11px] font-bold uppercase tracking-widest text-accent2"
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Nama lengkap"
                class="w-full rounded-lg border border-accent2/20 bg-base px-4 py-3 text-sm font-medium text-primary outline-none placeholder:text-secondary/60 focus:border-accent2"
              />
            </div>

            <div>
              <label
                class="mb-2 block text-[11px] font-bold uppercase tracking-widest text-accent2"
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                class="w-full rounded-lg border border-accent2/20 bg-base px-4 py-3 text-sm font-medium text-primary outline-none placeholder:text-secondary/60 focus:border-accent2"
              />
            </div>

            <div>
              <label
                class="mb-2 block text-[11px] font-bold uppercase tracking-widest text-accent2"
              >
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Tulis pesan kamu..."
                class="w-full resize-none rounded-lg border border-accent2/20 bg-base px-4 py-3 text-sm font-medium text-primary outline-none placeholder:text-secondary/60 focus:border-accent2"
              ></textarea>
            </div>

            <button
              type="button"
              class="w-full rounded-lg bg-accent2 py-3 text-xs font-extrabold uppercase tracking-[0.35em] text-primary transition hover:bg-secondary hover:text-white"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </div>

      <!-- Contact Cards -->
      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <div class="rounded-2xl bg-primary p-7 text-base shadow-lg">
          <div
            class="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-accent2 text-primary"
          >
            ✉
          </div>
          <p class="text-[11px] font-bold uppercase tracking-widest text-accent2">
            Electronic Mail
          </p>
          <p class="mt-3 text-sm text-base/70">lelxzyyshop@gmail.com</p>
        </div>

        <div class="rounded-2xl bg-primary p-7 text-base shadow-lg">
          <div
            class="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-accent2 text-primary"
          >
            ☎
          </div>
          <p class="text-[11px] font-bold uppercase tracking-widest text-accent2">WhatsApp</p>
          <p class="mt-3 text-sm text-base/70">08xx-xxxx-xxxx</p>
        </div>

        <div class="rounded-2xl bg-primary p-7 text-base shadow-lg">
          <div
            class="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-accent2 text-primary"
          >
            ⌖
          </div>
          <p class="text-[11px] font-bold uppercase tracking-widest text-accent2">Lokasi</p>
          <p class="mt-3 text-sm text-base/70">Sleman, Yogyakarta</p>
        </div>
      </div>
    </div>
  </section>
  <Footer />
</template>
