<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '@/types/product'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const cartStore = useCartStore()

const showPopup = ref(false)
const popupMessage = ref('')
const popupType = ref<'success' | 'error'>('success')

onMounted(() => {
  cartStore.loadCart()
})

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}

const showToast = (message: string, type: 'success' | 'error') => {
  popupMessage.value = message
  popupType.value = type
  showPopup.value = true

  setTimeout(() => {
    showPopup.value = false
  }, 1800)
}

const isStockEnough = () => {
  const cartItem = cartStore.items.find((item) => item.product.id === props.product.id)

  const currentQty = cartItem ? cartItem.qty : 0

  return currentQty < props.product.stock
}

const addToCart = async () => {
  if (props.product.stock <= 0) {
    showToast('Stok produk habis', 'error')
    return
  }

  if (!isStockEnough()) {
    showToast('Stok produk tidak mencukupi', 'error')
    return
  }

  const result = await cartStore.addToCart(props.product)

  showToast(result.message, result.success ? 'success' : 'error')
}

const buyNow = async () => {
  if (props.product.stock <= 0) {
    showToast('Stok produk habis', 'error')
    return
  }

  if (!isStockEnough()) {
    showToast('Stok produk tidak mencukupi', 'error')
    return
  }

  const result = await cartStore.addToCart(props.product)

  if (result.success) {
    router.push('/cart')
  } else {
    showToast(result.message, 'error')
  }
}
</script>

<template>
  <div
    @click="goToDetail"
    class="group relative flex h-[340px] cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 backdrop-blur-xl shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
  >
    <!-- Glow -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-transparent to-fuchsia-200/20 opacity-0 transition duration-500 group-hover:opacity-100"
    ></div>

    <!-- Toast -->
    <div
      v-if="showPopup"
      class="absolute left-1/2 top-3 z-50 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-md"
      :class="popupType === 'success' ? 'bg-green-500/90' : 'bg-red-500/90'"
    >
      {{ popupMessage }}
    </div>

    <!-- Image -->
    <div class="relative h-44 overflow-hidden">
      <img
        :src="`http://127.0.0.1:8000/storage/${product.image}`"
        :alt="product.name"
        class="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
      ></div>

      <!-- Stock Badge -->
      <div
        class="absolute left-3 top-3 rounded-full border border-white/20 bg-white/80 px-3 py-1 text-[10px] font-bold text-primary backdrop-blur-md"
      >
        {{ product.stock > 0 ? 'Tersedia' : 'Habis' }}
      </div>
    </div>

    <!-- Content -->
    <div class="relative flex flex-1 flex-col justify-between p-4">
      <div>
        <!-- Category -->
        <p class="text-[11px] font-semibold uppercase tracking-wider text-primary/50">Fashion</p>

        <!-- Product Name -->
        <h2 class="mt-1 line-clamp-1 text-base font-extrabold text-primary">
          {{ product.name }}
        </h2>

        <!-- Price -->
        <p class="mt-2 text-lg font-extrabold text-accent2">
          Rp {{ product.price.toLocaleString('id-ID') }}
        </p>

        <!-- Stock -->
        <p class="mt-1 text-xs text-primary/50">Stok tersedia: {{ product.stock }}</p>
      </div>

      <!-- Buttons -->
      <div class="mt-4 grid grid-cols-2 gap-2">
        <button
          class="rounded-2xl border border-primary/10 bg-white py-2 text-xs font-bold text-primary transition hover:bg-soft disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="product.stock <= 0"
          @click.stop="addToCart"
        >
          Keranjang
        </button>

        <button
          class="rounded-2xl bg-gradient-to-r from-accent2 to-accent py-2 text-xs font-bold text-white shadow-md transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="product.stock <= 0"
          @click.stop="buyNow"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  </div>
</template>
