<script setup lang="ts">
import { onMounted } from "vue"
import { useProductStore } from "@/stores/productStore"
import ProductCard from "@/components/Products/ProductCard.vue";

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <div class="p-6">
    <div v-if="productStore.loading" class="text-center">
      Loading...
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

