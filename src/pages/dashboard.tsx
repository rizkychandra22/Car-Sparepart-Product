import { useState } from "react"
import { Link } from "react-router-dom"
import { PRODUCTS } from "@/constans"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Package,
  Layers,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
} from "lucide-react"

export default function DashboardPage() {
  const [search, setSearch] = useState("")

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.partNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  )

  const totalStock = PRODUCTS.reduce((sum, p) => sum + p.stock, 0)
  const totalValue = PRODUCTS.reduce((sum, p) => sum + p.price * p.stock, 0)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="size-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <div>
              <h1 className="text-base font-bold leading-none">Panel Manajemen Gudang & Stok</h1>
              <span className="text-[11px] text-muted-foreground">
                AutoPart Central Administration
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="gap-1.5 cursor-pointer text-xs">
              <Plus className="size-3.5" />
              <span>Tambah Sparepart</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto px-4 py-8 space-y-6 flex-1">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Total Produk</span>
              <Package className="size-4 text-primary" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-black">{PRODUCTS.length} SKUs</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Tersedia dalam 6 kategori</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Total Unit Stok</span>
              <Layers className="size-4 text-emerald-500" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-black text-emerald-500">{totalStock} pcs</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Siap kirim dari gudang</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Estimasi Nilai Stok</span>
              <DollarSign className="size-4 text-amber-500" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-black">
                Rp {(totalValue / 1000000).toFixed(1)} Jt
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Berdasarkan HET katalog</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Performa Katalog</span>
              <TrendingUp className="size-4 text-blue-500" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-black text-blue-500">100%</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">Semua data mock siap integrasi</p>
            </CardContent>
          </Card>
        </div>

        {/* Table Inventory Card */}
        <Card className="border-border overflow-hidden">
          <CardHeader className="p-5 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <CardTitle className="text-base font-bold">Daftar Inventaris Sparepart</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Kelola stok fisik dan harga satuan komponen suku cadang.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Cari SKU / nama part..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-8 text-xs bg-background"
              />
            </div>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/50 text-muted-foreground font-semibold border-b border-border">
                <tr>
                  <th className="py-3 px-4">Nama Produk & Part No</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Merk</th>
                  <th className="py-3 px-4 text-right">Harga Satuan</th>
                  <th className="py-3 px-4 text-center">Stok</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-foreground">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{p.partNumber}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-[10px]">
                        {p.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-medium">{p.brand}</td>
                    <td className="py-3 px-4 text-right font-semibold text-foreground">
                      Rp {p.price.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-4 text-center font-bold">
                      {p.stock} pcs
                    </td>
                    <td className="py-3 px-4 text-center">
                      {p.stock > 15 ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500">
                          Aman
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-500">
                          Menipis
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  )
}

