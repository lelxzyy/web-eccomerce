import { defineStore } from 'pinia'
import { CartService } from '@/services/cartService'
import type { CartItem } from '@/types/cart'
import type { Product } from '@/types/product'
import type { AxiosError } from 'axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    loading: false,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.qty, 0),

    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.product.price * item.qty, 0),
  },

  actions: {
    async loadCart() {
      try {
        this.loading = true
        const res = await CartService.getCart()
        this.items = res
      } catch (error) {
        console.error('Gagal memuat keranjang:', error)
      } finally {
        this.loading = false
      }
    },

    async addToCart(product: Product) {
      try {
        await CartService.addToCart(product.id, 1)
        await this.loadCart()

        return {
          success: true,
          message: 'Produk ditambahkan ke keranjang',
        }
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>

        return {
          success: false,
          message: axiosError.response?.data?.message || 'Gagal menambahkan produk',
        }
      }
    },

    async updateQty(id: number, qty: number) {
      try {
        await CartService.updateQty(id, qty)
        await this.loadCart()
      } catch (error) {
        console.error('Gagal memperbarui qty:', error)
      }
    },

    async removeCart(id: number) {
      try {
        await CartService.removeCart(id)
        await this.loadCart()
      } catch (error) {
        console.error('Gagal menghapus item dari keranjang:', error)
      }
    },

    async clearCart() {
      try {
        await CartService.clearCart()
        this.items = []
      } catch (error) {
        console.error('Gagal mengosongkan keranjang:', error)
      }
    },
  },
})
