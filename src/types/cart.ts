import type { Product } from './product'

export interface CartItem {
  id: number
  qty: number
  product_id: number
  product: Product
  user_id?: number
  created_at?: string
  updated_at?: string
}

export interface AddToCartPayload {
  product_id: number
  qty: number
}
