import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Car,
  Wrench,
  ShoppingCart,
  Search,
  CheckCircle2,
  PackageCheck,
  Disc,
  Zap,
} from "lucide-react"

interface Sparepart {
  id: number
  name: string
  category: "Mesin" | "Pengereman" | "Kelistrikan"
  partNumber: string
  price: string
  stock: number
  icon: typeof Wrench
}

const PRODUCTS: Sparepart[] = [
  {
    id: 1,
    name: "Brake Pad Ceramic Front",
    category: "Pengereman",
    partNumber: "BP-CR-092",
    price: "Rp 375.000",
    stock: 18,
    icon: Disc,
  },
  {
    id: 2,
    name: "Oil Filter High Flow",
    category: "Mesin",
    partNumber: "OF-HF-411",
    price: "Rp 85.000",
    stock: 45,
    icon: Wrench,
  },
  {
    id: 3,
    name: "Spark Plug Iridium TT",
    category: "Kelistrikan",
    partNumber: "SP-IR-882",
    price: "Rp 120.000",
    stock: 32,
    icon: Zap,
  },
  {
    id: 4,
    name: "Rotor Disc Brake Ventilated",
    category: "Pengereman",
    partNumber: "RD-VT-104",
    price: "Rp 650.000",
    stock: 9,
    icon: Disc,
  },
  {
    id: 5,
    name: "Alternator 12V 90A",
    category: "Kelistrikan",
    partNumber: "ALT-90-502",
    price: "Rp 1.450.000",
    stock: 4,
    icon: Zap,
  },
  {
    id: 6,
    name: "Timing Belt Kit Reinforced",
    category: "Mesin",
    partNumber: "TB-KT-730",
    price: "Rp 520.000",
    stock: 14,
    icon: Wrench,
  },
]

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<Sparepart[]>([])

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product: Sparepart) => {
    setCart((prev) => [...prev, product])
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Header / Navbar */}
        <header className="border-b border-border sticky top-0 z-40 bg-background/80 backdrop-blur-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md">
                <Car className="size-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-none tracking-tight">
                  AutoPart Central
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Katalog Suku Cadang Mobil Terpercaya
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Cart Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="relative cursor-pointer">
                    <ShoppingCart className="size-4 mr-1.5" />
                    <span>Keranjang</span>
                    {cart.length > 0 && (
                      <Badge className="ml-2 h-5 px-1.5 text-xs">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <ShoppingCart className="size-5" />
                      Keranjang Belanja ({cart.length} Item)
                    </DialogTitle>
                    <DialogDescription>
                      Daftar sparepart yang telah Anda pilih.
                    </DialogDescription>
                  </DialogHeader>

                  {cart.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground text-sm">
                      Keranjang belanja masih kosong.
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {cart.map((item, idx) => (
                        <div
                          key={`${item.id}-${idx}`}
                          className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/40 text-sm"
                        >
                          <div>
                            <p className="font-medium text-foreground">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.partNumber}
                            </p>
                          </div>
                          <span className="font-semibold text-primary">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* Hero & Search Banner */}
        <section className="bg-muted/30 border-b border-border py-8">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-4">
            <Badge variant="secondary" className="px-3 py-1 text-xs">
              <CheckCircle2 className="size-3.5 mr-1 text-emerald-500" />
              65+ Komponen shadcn/ui Lengkap Terpasang
            </Badge>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Cari & Temukan Sparepart Kendaraan Anda
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Koleksi komponen UI modern dan responsif menggunakan React 19, Vite,
              Tailwind CSS v4, dan shadcn/ui.
            </p>

            {/* Filter and Search Bar */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-center">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cari sparepart atau no. part..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background"
                />
              </div>

              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid grid-cols-4 w-full sm:w-auto">
                  <TabsTrigger value="All">Semua</TabsTrigger>
                  <TabsTrigger value="Mesin">Mesin</TabsTrigger>
                  <TabsTrigger value="Pengereman">Rem</TabsTrigger>
                  <TabsTrigger value="Kelistrikan">Listrik</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <main className="container mx-auto px-4 py-8 flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Katalog Produk</h3>
              <p className="text-xs text-muted-foreground">
                Menampilkan {filteredProducts.length} produk
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const IconComp = product.icon
              return (
                <Card
                  key={product.id}
                  className="flex flex-col justify-between hover:shadow-lg transition-shadow border-border"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                        <IconComp className="size-5" />
                      </div>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <CardTitle className="text-lg font-bold mt-3">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-xs font-mono">
                      Part No: {product.partNumber}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-black text-foreground">
                        {product.price}
                      </span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-xs text-muted-foreground flex items-center gap-1 cursor-help">
                            <PackageCheck className="size-3.5 text-emerald-500" />
                            Stok: {product.stock} pcs
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Stok tersedia di gudang utama</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart className="size-4" />
                      Tambah ke Keranjang
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-6 bg-muted/20 text-center text-xs text-muted-foreground">
          <p>© 2026 AutoPart Central — Project React + Vite + shadcn/ui</p>
        </footer>
      </div>
    </TooltipProvider>
  )
}
