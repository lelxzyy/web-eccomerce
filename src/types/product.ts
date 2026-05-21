import type { Category } from './category'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image: string
  category?: Category
  created_at: string
  updated_at: string
}
