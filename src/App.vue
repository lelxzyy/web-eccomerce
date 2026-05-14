<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from '@/components/layouts/Navbar.vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.loadCart()
})
</script>

<template>
  <Navbar />
  <router-view />
</template>
