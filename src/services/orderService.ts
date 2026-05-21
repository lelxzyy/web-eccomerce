import { api, payApi } from './api'
import type { Order, CheckoutPayload, CheckoutResponse } from '@/types/order'

export const getMyOrders = async (): Promise<Order[]> => {
  const res = await api.get('/my-orders')
  return res.data.data
}

export const sendOrderHistoryEmail = async (): Promise<unknown> => {
  const res = await api.post('/orders/send-email')
  return res.data
}

export const checkout = async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
  const res = await payApi.post<CheckoutResponse>('/checkout/xendit', payload)
  return res.data
}

export const OrderService = {
  getMyOrders,
  sendOrderHistoryEmail,
  checkout,
}
