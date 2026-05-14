import { defineStore } from 'pinia'
import { getProducts } from '@/services/productService'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as any[],
    loading: false
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        this.products = await getProducts()
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  }
})
