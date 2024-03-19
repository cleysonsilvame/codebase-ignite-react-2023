import { api } from '@/lib/axios'

import { OrderStatus } from './get-orders'

export interface GetOrderDetailsParams {
  orderId: string
}

interface OrderItem {
  id: string
  priceInCents: number
  quantity: number
  product: {
    name: string
  }
}

interface Customer {
  name: string
  email: string
  phone: string | null
}

export interface GetOrderDetailsResponse {
  status: OrderStatus
  id: string
  createdAt: string
  totalInCents: number
  customer: Customer
  orderItems: OrderItem[]
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const { data } = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return data
}
