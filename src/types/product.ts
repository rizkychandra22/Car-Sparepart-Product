export type ProductCategory = 
  | "Mesin"
  | "Pengereman"
  | "Kelistrikan"
  | "Suspensi"
  | "Transmisi"
  | "Eksterior"
  | "Filter & Oli"

export interface VehicleCompatibility {
  make: string      // e.g. Toyota, Honda, Mitsubishi
  model: string     // e.g. Avanza, Civic, Pajero
  yearStart: number
  yearEnd: number
}

export interface Product {
  id: string
  name: string
  slug: string
  category: ProductCategory
  partNumber: string
  brand: string // e.g. Denso, Brembo, NGK, Bosch
  price: number
  originalPrice?: number
  stock: number
  rating: number
  reviewsCount: number
  description: string
  specifications: Record<string, string>
  compatibility: VehicleCompatibility[]
  imageUrl: string
  isFeatured?: boolean
  isBestSeller?: boolean
}

export interface ProductFilterParams {
  category?: string
  search?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  vehicleMake?: string
  sortBy?: "price-asc" | "price-desc" | "rating" | "popular"
  page?: number
  limit?: number
}

export interface ProductResponse {
  items: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

