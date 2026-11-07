import { useState, useMemo } from "react"
import { PRODUCTS, CATEGORIES } from "@/constans"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/types/product"
import { ProductCard } from "@/components/common"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Search,
  ShoppingCart,
  CheckCircle2,
  ShieldAlert,
  SlidersHorizontal,
} from "lucide-react"

export default function WebPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "rating">("popular")
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null)

  const { addToCart } = useCart()

  // Ambil daftar brand unik langsung dari data dummy constans
  const brandsData = useMemo(() => {
    return Array.from(new Set(PRODUCTS.map((p) => p.brand)))
  }, [])

  // Kategori langsung dari constans
  const categories = useMemo(() => {
    return [
      { name: "All", slug: "all", itemCount: PRODUCTS.length, description: "Semua Kategori", iconName: "Wrench" },
      ...CATEGORIES,
    ]
  }, [])

  // Filter & sorting langsung dari constans
  const products = useMemo(() => {
    let items = [...PRODUCTS]

    if (selectedCategory !== "All") {
      items = items.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    if (selectedBrand !== "All") {
      items = items.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase())
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.partNumber.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.compatibility.some((c) => `${c.make} ${c.model}`.toLowerCase().includes(q))
      )
    }

    switch (sortBy) {
      case "price-asc":
        items.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        items.sort((a, b) => b.price - a.price)
        break
      case "rating":
        items.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
        items.sort((a, b) => b.reviewsCount - a.reviewsCount)
        break
    }

    return items
  }, [selectedCategory, selectedBrand, searchQuery, sortBy])

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 via-background to-background border-b border-border py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-4">
          <Badge variant="secondary" className="px-3 py-1 text-xs">
            <CheckCircle2 className="size-3.5 mr-1 text-emerald-500" />
            Katalog Suku Cadang Orisinil Bergaransi
          </Badge>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Temukan Sparepart Presisi Untuk Kendaraan Anda
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Cari berdasarkan kode part resmi, nama komponen mesin, sistem rem, suspensi,
            atau model mobil Anda dengan jaminan kompatibilitas 100%.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ketik kode part, merk (Brembo, Denso), atau nama mobil (Avanza, Innova)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-card shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Container */}
      <div className="container mx-auto px-4 space-y-6">
        {/* Category Horizontal Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card hover:bg-muted text-muted-foreground border-border"
                }`}
              >
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-border/60">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <SlidersHorizontal className="size-3.5" />
            <span>
              Menampilkan <strong className="text-foreground">{products.length}</strong> produk
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Filter Brand */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="flex-1 sm:w-48 h-9 px-3 rounded-lg border border-border bg-card text-xs font-medium text-foreground outline-none transition focus:border-primary cursor-pointer shadow-xs"
            >
              <option value="All">Semua Merk</option>
              {brandsData?.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            {/* Sort by */}
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "popular" | "price-asc" | "price-desc" | "rating"
                )
              }
              className="flex-1 sm:w-48 h-9 px-3 rounded-lg border border-border bg-card text-xs font-medium text-foreground outline-none transition focus:border-primary cursor-pointer shadow-xs"
            >
              <option value="popular">Paling Populer</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {products.length === 0 ? (
          <div className="py-20 text-center space-y-2 border border-dashed border-border rounded-2xl">
            <ShieldAlert className="size-10 text-muted-foreground mx-auto" />
            <h4 className="font-semibold text-foreground">Suku Cadang Tidak Ditemukan</h4>
            <p className="text-xs text-muted-foreground">
              Coba gunakan kata kunci pencarian lain atau pilih kategori Semua.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDetail={(p) => setActiveProductModal(p)}
                onAddToCart={(p) => addToCart(p, 1)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <Dialog
        open={!!activeProductModal}
        onOpenChange={(open) => !open && setActiveProductModal(null)}
      >
        {activeProductModal && (
          <DialogContent className="sm:max-w-xl p-6 max-h-[90vh] overflow-y-auto no-scrollbar">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{activeProductModal.category}</Badge>
                <Badge variant="secondary">{activeProductModal.brand}</Badge>
              </div>
              <DialogTitle className="text-xl font-bold mt-2">
                {activeProductModal.name}
              </DialogTitle>
              <DialogDescription className="font-mono text-xs text-primary font-semibold">
                Part Number: {activeProductModal.partNumber}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 text-xs">
              <img
                src={activeProductModal.imageUrl}
                alt={activeProductModal.name}
                onError={(e) => {
                  const target = e.currentTarget
                  if (!target.src.includes("photo-1486262715619-67b85e0b08d3")) {
                    target.src = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&auto=format&fit=crop&q=80"
                  }
                }}
                className="w-full h-48 object-cover rounded-xl bg-muted"
              />

              <div>
                <h5 className="font-semibold text-foreground mb-1">Deskripsi Produk</h5>
                <p className="text-muted-foreground leading-relaxed">
                  {activeProductModal.description}
                </p>
              </div>

              {/* Specifications Table */}
              <div>
                <h5 className="font-semibold text-foreground mb-2">Spesifikasi Teknis</h5>
                <div className="grid grid-cols-2 gap-2 p-3 rounded-lg border border-border bg-muted/40">
                  {Object.entries(activeProductModal.specifications).map(([key, val]) => (
                    <div key={key} className="space-y-0.5">
                      <span className="text-[10px] text-muted-foreground block">{key}</span>
                      <span className="font-semibold text-foreground">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vehicle Compatibility */}
              <div>
                <h5 className="font-semibold text-foreground mb-2">Kompatibilitas Mobil</h5>
                <div className="space-y-1.5">
                  {activeProductModal.compatibility.map((c, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg border border-border flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-foreground">
                        {c.make} {c.model}
                      </span>
                      <span className="text-muted-foreground font-mono">
                        Tahun {c.yearStart} - {c.yearEnd}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-muted-foreground block">Harga Satuan</span>
                  <span className="text-xl font-black text-primary">
                    Rp {activeProductModal.price.toLocaleString("id-ID")}
                  </span>
                </div>

                <Button
                  onClick={() => {
                    addToCart(activeProductModal, 1)
                    setActiveProductModal(null)
                  }}
                  className="gap-2 cursor-pointer"
                >
                  <ShoppingCart className="size-4" />
                  Tambah ke Keranjang
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
