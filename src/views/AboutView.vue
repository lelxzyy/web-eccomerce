<template>
  <div class="min-h-screen bg-background pt-28 text-primary">
    <!-- HERO -->
    <section class="py-16 text-center">
      <div class="container mx-auto px-6">
        <h1 class="text-4xl font-extrabold md:text-5xl tracking-tight mb-4">Tentang Furniture Ku</h1>
        <p class="text-primary/70 max-w-2xl mx-auto text-base md:text-lg">
          Kami menyediakan berbagai produk furniture berkualitas tinggi dengan desain modern dan
          harga terjangkau untuk kebutuhan rumah Anda.
        </p>
      </div>
    </section>

    <!-- VISI MISI -->
    <section class="py-12">
      <div class="container mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div class="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-primary/5 shadow-sm hover:shadow-md transition duration-300">
          <h2 class="text-2xl font-bold mb-4 text-primary">Visi</h2>
          <p class="text-primary/70 leading-relaxed">
            Menjadi toko furniture terpercaya di Indonesia yang menghadirkan produk berkualitas
            dengan desain inovatif.
          </p>
        </div>

        <div class="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-primary/5 shadow-sm hover:shadow-md transition duration-300">
          <h2 class="text-2xl font-bold mb-4 text-primary">Misi</h2>
          <ul class="list-disc list-inside text-primary/70 space-y-2 leading-relaxed">
            <li>Menyediakan produk berkualitas tinggi</li>
            <li>Memberikan pelayanan terbaik kepada pelanggan</li>
            <li>Menawarkan harga yang kompetitif</li>
            <li>Mengikuti tren desain modern</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- KEUNGGULAN -->
    <section class="py-16 bg-white/40 border-y border-primary/5">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-extrabold text-center mb-12">Kenapa Memilih Kami?</h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-8 border border-primary/10 bg-white/80 rounded-3xl text-center hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-soft/50 text-xl">✨</div>
            <h3 class="font-bold text-lg mb-2 text-primary">Kualitas Premium</h3>
            <p class="text-primary/70 text-sm">Produk dibuat dari bahan terbaik dan tahan lama.</p>
          </div>

          <div class="p-8 border border-primary/10 bg-white/80 rounded-3xl text-center hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-soft/50 text-xl">💰</div>
            <h3 class="font-bold text-lg mb-2 text-primary">Harga Terjangkau</h3>
            <p class="text-primary/70 text-sm">Harga bersaing dengan kualitas terbaik.</p>
          </div>

          <div class="p-8 border border-primary/10 bg-white/80 rounded-3xl text-center hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-soft/50 text-xl">📐</div>
            <h3 class="font-bold text-lg mb-2 text-primary">Desain Modern</h3>
            <p class="text-primary/70 text-sm">Mengikuti tren interior masa kini.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TIM -->
    <section class="py-16">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-extrabold text-center mb-12">Tim Kami</h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white/80 border border-primary/5 p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition duration-300">
            <img src="https://i.pravatar.cc/150?img=1" class="mx-auto rounded-full mb-4 ring-4 ring-soft" />
            <h3 class="font-bold text-lg text-primary">Andi</h3>
            <p class="text-primary/60 text-sm mt-1">Founder</p>
          </div>

          <div class="bg-white/80 border border-primary/5 p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition duration-300">
            <img src="https://i.pravatar.cc/150?img=2" class="mx-auto rounded-full mb-4 ring-4 ring-soft" />
            <h3 class="font-bold text-lg text-primary">Budi</h3>
            <p class="text-primary/60 text-sm mt-1">Designer</p>
          </div>

          <div class="bg-white/80 border border-primary/5 p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition duration-300">
            <img src="https://i.pravatar.cc/150?img=3" class="mx-auto rounded-full mb-4 ring-4 ring-soft" />
            <h3 class="font-bold text-lg text-primary">Citra</h3>
            <p class="text-primary/60 text-sm mt-1">Marketing</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-gradient-accent text-white py-16 text-center">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-extrabold mb-4 tracking-tight">Siap Mempercantik Rumah Anda?</h2>
        <p class="mb-8 text-white/80 text-base md:text-lg">Temukan berbagai furniture terbaik hanya di sini</p>

        <router-link
          to="/"
          class="inline-block bg-base text-primary px-8 py-3 rounded-full font-bold shadow-md hover:bg-soft transition duration-300"
        >
          Belanja Sekarang
        </router-link>
      </div>
    </section>
  </div>
</template>

