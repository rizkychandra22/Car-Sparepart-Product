import React, { createContext, useContext, useEffect, useState } from "react"
import type { CartItem, CartSummary } from "@/types/cart"
import type { Product } from "@/types/product"
import { toast } from "sonner"

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  summary: CartSummary
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "car_sparepart_cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (err) {
      console.error("Gagal menyimpan keranjang ke localStorage:", err)
    }
  }, [items])

  const addToCart = (product: Product, quantity = 1) => {
    const existing = items.find((item) => item.product.id === product.id)
    const newQty = existing ? existing.quantity + quantity : quantity

    if (existing) {
      toast.success(`Jumlah ${product.name} bertambah (${newQty} pcs)`, {
        id: `cart-item-${product.id}`,
      })
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        )
      )
    } else {
      toast.success(`${product.name} ditambahkan ke keranjang`, {
        id: `cart-item-${product.id}`,
        description: `Rp ${product.price.toLocaleString("id-ID")}`,
      })
      setItems((prev) => [...prev, { product, quantity }])
    }
  }

  const removeFromCart = (productId: string) => {
    const item = items.find((i) => i.product.id === productId)
    if (item) {
      toast.info(`${item.product.name} dihapus dari keranjang`, {
        id: `cart-remove-${productId}`,
      })
    }
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  // Derived calculations
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const estimatedShipping = subtotal > 1000000 || subtotal === 0 ? 0 : 25000
  const tax = Math.round(subtotal * 0.11) // PPN 11%
  const total = subtotal + estimatedShipping + tax

  const summary: CartSummary = {
    totalItems,
    subtotal,
    estimatedShipping,
    tax,
    total,
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        summary,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider")
  }
  return context
}

