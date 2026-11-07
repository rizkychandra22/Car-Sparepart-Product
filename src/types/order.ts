import type { CartItem } from "./cart"

export type PaymentMethod = "QRIS" | "BANK_TRANSFER" | "COD" | "CREDIT_CARD"

export interface CustomerDetails {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  vehicleInfo?: string
}

export interface Order {
  id: string
  orderNumber: string
  createdAt: string
  items: CartItem[]
  customer: CustomerDetails
  subtotal: number
  shippingCost: number
  totalAmount: number
  paymentMethod: PaymentMethod
  paymentStatus: "PENDING" | "PAID" | "FAILED"
  orderStatus: "PROCESSING" | "SHIPPED" | "DELIVERED"
}

