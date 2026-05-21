import { api } from './api'
import type { CartItem } from '@/types/cart'

export const getCart = async (): Promise<CartItem[]> => {
  const res = await api.get('/cart')
  return res.data.data
}

export const addToCart = async (productId: number, qty: number = 1): Promise<unknown> => {
  const res = await api.post('/cart', {
    product_id: productId,
    qty,
  })
  return res.data
}

export const updateQty = async (id: number, qty: number): Promise<unknown> => {
  const res = await api.put(`/cart/${id}`, { qty })
  return res.data
}

export const removeCart = async (id: number): Promise<unknown> => {
  const res = await api.delete(`/cart/${id}`)
  return res.data
}

export const clearCart = async (): Promise<unknown> => {
  const res = await api.delete('/cart')
  return res.data
}

export const CartService = {
  getCart,
  addToCart,
  updateQty,
  removeCart,
  clearCart,
}
