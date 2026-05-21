<template>
  <section class="py-8">
    <div class="mx-auto max-w-6xl px-4">
      <div
        class="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-10 text-white shadow-xl md:px-12"
      >
        <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent2/40 blur-3xl"></div>
        <div class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-soft/30 blur-3xl"></div>

        <div class="relative z-10 grid items-center gap-6 md:grid-cols-2">
          <div>
            <p class="mb-2 text-sm font-bold text-soft">Promo Spesial</p>

            <h2 class="text-3xl font-extrabold md:text-4xl">Upgrade Outfit Kamu Sekarang</h2>

            <p class="mt-3 text-sm text-white/70">
              Dapatkan produk pilihan dengan desain keren, nyaman dipakai, dan cocok untuk aktivitas
              harian kamu.
            </p>
          </div>

          <div class="text-left md:text-right">
            <p class="text-sm text-white/70">Mulai dari</p>

            <h3 class="text-4xl font-extrabold text-soft">Rp 150.000</h3>

            <router-link
              to="/product"
              class="mt-5 inline-block rounded-full bg-soft px-6 py-3 text-sm font-bold text-primary transition hover:bg-white"
            >
              Belanja Sekarang
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
