import type { Product } from './product'

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  qty: number
  price: number
  product?: Product
  created_at?: string
  updated_at?: string
}

export interface Order {
  id: number
  user_id: number
  status: 'pending' | 'paid' | 'failed' | 'expired' | string
  amount: number
  total?: number
  receiver_name: string
  phone: string
  address: string
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface CheckoutItem {
  product_id: number
  name: string
  quantity: number
  price: number
  category: string
}

export interface CheckoutPayload {
  amount: number
  receiver_name: string
  phone: string
  address: string
  items: CheckoutItem[]
}

export interface CheckoutResponse {
  payment_url?: string
  invoice_url?: string
}
