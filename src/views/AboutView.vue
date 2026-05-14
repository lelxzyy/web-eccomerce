<template>
  <div class="bg-gray-50 min-h-screen pt-28">

    <!-- HERO -->
    <section class="bg-white py-12 shadow">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Tentang Furniture Ku
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Kami menyediakan berbagai produk furniture berkualitas tinggi dengan desain modern
          dan harga terjangkau untuk kebutuhan rumah Anda.
        </p>
      </div>
    </section>

    <!-- VISI MISI -->
    <section class="py-12">
      <div class="container mx-auto px-6 grid md:grid-cols-2 gap-10">

        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-2xl font-semibold mb-3 text-gray-800">Visi</h2>
          <p class="text-gray-600">
            Menjadi toko furniture terpercaya di Indonesia yang menghadirkan produk berkualitas
            dengan desain inovatif.
          </p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-2xl font-semibold mb-3 text-gray-800">Misi</h2>
          <ul class="list-disc list-inside text-gray-600 space-y-2">
            <li>Menyediakan produk berkualitas tinggi</li>
            <li>Memberikan pelayanan terbaik kepada pelanggan</li>
            <li>Menawarkan harga yang kompetitif</li>
            <li>Mengikuti tren desain modern</li>
          </ul>
        </div>

      </div>
    </section>

    <!-- KEUNGGULAN -->
    <section class="bg-white py-12">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-10">Kenapa Memilih Kami?</h2>

        <div class="grid md:grid-cols-3 gap-6">

          <div class="p-6 border rounded-lg text-center hover:shadow-lg transition">
            <h3 class="font-semibold text-lg mb-2">Kualitas Premium</h3>
            <p class="text-gray-600">
              Produk dibuat dari bahan terbaik dan tahan lama.
            </p>
          </div>

          <div class="p-6 border rounded-lg text-center hover:shadow-lg transition">
            <h3 class="font-semibold text-lg mb-2">Harga Terjangkau</h3>
            <p class="text-gray-600">
              Harga bersaing dengan kualitas terbaik.
            </p>
          </div>

          <div class="p-6 border rounded-lg text-center hover:shadow-lg transition">
            <h3 class="font-semibold text-lg mb-2">Desain Modern</h3>
            <p class="text-gray-600">
              Mengikuti tren interior masa kini.
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- TIM -->
    <section class="py-12">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-10">Tim Kami</h2>

        <div class="grid md:grid-cols-3 gap-6">

          <div class="bg-white p-6 rounded-lg shadow text-center">
            <img src="https://i.pravatar.cc/150?img=1" class="mx-auto rounded-full mb-3" />
            <h3 class="font-semibold">Andi</h3>
            <p class="text-gray-500 text-sm">Founder</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow text-center">
            <img src="https://i.pravatar.cc/150?img=2" class="mx-auto rounded-full mb-3" />
            <h3 class="font-semibold">Budi</h3>
            <p class="text-gray-500 text-sm">Designer</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow text-center">
            <img src="https://i.pravatar.cc/150?img=3" class="mx-auto rounded-full mb-3" />
            <h3 class="font-semibold">Citra</h3>
            <p class="text-gray-500 text-sm">Marketing</p>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-red-700 text-white py-12 text-center">
      <h2 class="text-3xl font-bold mb-4">Siap Mempercantik Rumah Anda?</h2>
      <p class="mb-6">Temukan berbagai furniture terbaik hanya di sini</p>

      <router-link
        to="/"
        class="bg-white text-red-700 px-6 py-2 rounded font-semibold hover:bg-gray-200 transition">
        Belanja Sekarang
      </router-link>
    </section>

  </div>
</template>
