import type { Product } from "./product"

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartSummary {
  totalItems: number
  subtotal: number
  estimatedShipping: number
  tax: number
  total: number
}

