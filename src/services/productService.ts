import { payApi } from './api'
import type { Product } from '@/types/product'

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await payApi.get('/products')
    return res.data.data
  } catch (error) {
    console.error('API ERROR:', error)
    return []
  }
}

export const getProductById = async (id: number | string): Promise<Product | null> => {
  try {
    const res = await payApi.get(`/products/${id}`)
    return res.data
  } catch (error) {
    console.error(`API ERROR: Failed to get product with ID ${id}`, error)
    return null
  }
}

export const ProductService = {
  getProducts,
  getProductById,
}
