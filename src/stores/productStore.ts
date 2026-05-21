import { defineStore } from 'pinia'
import { getProducts } from '@/services/productService'
import type { Product } from '@/types/product'

interface ProductState {
  products: Product[]
  loading: boolean
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    loading: false,
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
    },
  },
})
