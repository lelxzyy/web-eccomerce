import { defineStore } from "pinia"
import axios from "axios"

const API_URL = "http://127.0.0.1:8000/api"

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as any[],
    loading: false,
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.qty, 0),

    totalPrice: (state) =>
      state.items.reduce(
        (total, item) => total + item.product.price * item.qty,
        0
      ),
  },

  actions: {
    async loadCart() {
      try {
        this.loading = true

        const token = localStorage.getItem("token")

        const res = await axios.get(`${API_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.items = res.data.data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async addToCart(product: any) {
      try {
        const token = localStorage.getItem("token")

        await axios.post(
          `${API_URL}/cart`,
          {
            product_id: product.id,
            qty: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        await this.loadCart()

        return {
          success: true,
          message: "Produk ditambahkan ke keranjang",
        }
      } catch (error: any) {
        return {
          success: false,
          message:
            error.response?.data?.message ||
            "Gagal menambahkan produk",
        }
      }
    },

    async updateQty(id: number, qty: number) {
      try {
        const token = localStorage.getItem("token")

        await axios.put(
          `${API_URL}/cart/${id}`,
          { qty },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        await this.loadCart()
      } catch (error) {
        console.error(error)
      }
    },

    async removeCart(id: number) {
      try {
        const token = localStorage.getItem("token")

        await axios.delete(`${API_URL}/cart/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        await this.loadCart()
      } catch (error) {
        console.error(error)
      }
    },

    async clearCart() {
      try {
        const token = localStorage.getItem("token")

        await axios.delete(`${API_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        this.items = []
      } catch (error) {
        console.error(error)
      }
    },
  },
})
