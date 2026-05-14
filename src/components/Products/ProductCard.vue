<script setup lang="ts">
import { ref } from "vue"
import type { Product } from "@/types/product"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cartStore"

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const cartStore = useCartStore()

const showPopup = ref(false)
const popupMessage = ref("")
const popupType = ref<"success" | "error">("success")

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}

const showToast = (message: string, type: "success" | "error") => {
  popupMessage.value = message
  popupType.value = type
  showPopup.value = true

  setTimeout(() => {
    showPopup.value = false
  }, 1800)
}

const addToCart = async () => {
  const result = await cartStore.addToCart(props.product)

  showToast(result.message, result.success ? "success" : "error")
}

const buyNow = async () => {
  const result = await cartStore.addToCart(props.product)

  if (result.success) {
    router.push("/cart")
  } else {
    showToast(result.message, "error")
  }
}
</script>

<template>
  <div
    @click="goToDetail"
    class="relative cursor-pointer overflow-hidden rounded-2xl bg-primary shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
  >
    <!-- Popup -->
    <div
      v-if="showPopup"
      class="absolute left-1/2 top-3 z-30 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-lg"
      :class="
        popupType === 'success'
          ? 'bg-green-500'
          : 'bg-red-500'
      "
    >
      {{ popupMessage }}
    </div>

    <!-- Image -->
    <div class="bg-white/30">
      <img
        :src="`http://127.0.0.1:8000/storage/${product.image}`"
        :alt="product.name"
        class="h-44 w-full object-cover"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-col gap-2 p-4 text-white">
      <h2 class="text-sm font-bold">
        {{ product.name }}
      </h2>

      <p class="line-clamp-2 text-xs text-white/70">
        {{ product.description }}
      </p>

      <!-- Price -->
      <p class="mt-1 text-sm font-bold text-white">
        Rp {{ product.price.toLocaleString("id-ID") }}
      </p>

      <!-- Stock -->
      <div class="flex items-center justify-between">
        <span
          class="rounded-full px-2 py-1 text-[10px] font-semibold"
          :class="
            product.stock > 0
              ? 'bg-soft/40 text-white'
              : 'bg-red-100 text-red-600'
          "
        >
          {{ product.stock > 0 ? 'Tersedia' : 'Habis' }}
        </span>

        <span class="text-[11px] text-white/60">
          Stok: {{ product.stock }}
        </span>
      </div>

      <!-- Buttons -->
      <div class="mt-3 grid grid-cols-2 gap-2">
        <button
          class="rounded-lg border border-primary/10 bg-base py-1.5 text-xs font-semibold text-primary transition hover:bg-soft/50 disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="product.stock === 0"
          @click.stop="addToCart"
        >
          Keranjang
        </button>

        <button
          class="rounded-lg bg-accent2 py-1.5 text-xs font-bold text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="product.stock === 0"
          @click.stop="buyNow"
        >
          Beli
        </button>
      </div>
    </div>
  </div>
</template>
