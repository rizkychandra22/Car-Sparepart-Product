import { useState, useEffect } from "react"
import { Outlet, Link, NavLink, useLocation } from "react-router-dom"
import { useCart } from "@/context/cart-context"
import { CartSheet, CheckoutDialog } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Car, ShoppingCart, ShieldCheck, Wrench, Package, Menu, X } from "lucide-react"

export function Guest() {
  const { summary, setIsCartOpen } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Auto close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Banner Info */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5 px-4 text-center font-medium">
        <span>Gratis Ongkir se-Indonesia untuk pesanan di atas Rp 1.000.000! Garansi 100% Produk Original</span>
      </div>

      {/* Main Navbar */}
      <header className="border-b border-border sticky top-0 z-40 bg-background/90 backdrop-blur-md relative">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md">
              <Car className="size-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-foreground block leading-none">
                AutoPart Central
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                Car Sparepart & Accessories
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-xs font-semibold transition ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              Katalog Produk
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-xs px-2.5 py-1.5 rounded-lg transition flex items-center gap-1.5 font-medium ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`
              }
            >
              <Wrench className="size-3.5" />
              <span>Admin Panel</span>
            </NavLink>
          </nav>

          {/* Actions: Cart & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer gap-2 rounded-xl"
            >
              <ShoppingCart className="size-4" />
              <span className="hidden sm:inline">Keranjang</span>
              {summary.totalItems > 0 && (
                <Badge className="h-5 px-1.5 text-[10px] font-bold">
                  {summary.totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Nav Toggle */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden size-9 rounded-xl border-border cursor-pointer text-foreground"
              onClick={() => setIsMobileMenuOpen((val) => !val)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Floating Mobile Nav Menu (Solid, High-Contrast Dropdown) */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop to prevent distraction and close on click outside */}
            <div
              className="fixed inset-0 top-16 bg-black/60 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Solid Dropdown Card */}
            <div className="absolute left-4 right-4 top-[calc(100%+0.5rem)] md:hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <Card className="shadow-2xl border-2 border-border bg-card rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
                <CardContent className="flex flex-col p-3">
                  <nav className="flex flex-col gap-2">
                    <NavLink
                      to="/"
                      end
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-foreground bg-muted/50 hover:bg-muted"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div
                            className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isActive
                                ? "bg-primary-foreground/20 text-primary-foreground"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            <Car className="size-4.5" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="leading-tight text-sm font-bold">Katalog Produk</span>
                            <span
                              className={`text-[11px] font-normal ${
                                isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                              }`}
                            >
                              Katalog sparepart & komponen mobil
                            </span>
                          </div>
                        </>
                      )}
                    </NavLink>

                    <NavLink
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-foreground bg-muted/50 hover:bg-muted"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div
                            className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isActive
                                ? "bg-primary-foreground/20 text-primary-foreground"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            <Wrench className="size-4.5" />
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="leading-tight text-sm font-bold">Admin Panel</span>
                            <span
                              className={`text-[11px] font-normal ${
                                isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                              }`}
                            >
                              Portal login & manajemen gudang
                            </span>
                          </div>
                        </>
                      )}
                    </NavLink>
                  </nav>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16 text-muted-foreground text-xs">
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                <Car className="size-4" />
              </div>
              <span className="font-bold text-sm text-foreground">AutoPart Central</span>
            </div>
            <p className="text-xs leading-relaxed">
              Distributor resmi suku cadang mobil orisinil dan komponen aftermarket
              bergaransi terlengkap di Indonesia.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-3">Kategori Populer</h5>
            <ul className="space-y-2">
              <li>Sistem Pengereman (Brake Pad & Rotor)</li>
              <li>Komponen Mesin & Timing Belt</li>
              <li>Kelistrikan & Busi Iridium</li>
              <li>Filter & Oli Sintetik</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-3">Jaminan Layanan</h5>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-emerald-500" /> 100% Produk Original OEM
              </li>
              <li className="flex items-center gap-1.5">
                <Package className="size-3.5 text-blue-500" /> Garansi Penggantian Barang Rusak
              </li>
              <li>Pengiriman Cepat Seluruh Kota</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-3">Layanan Konsumen</h5>
            <p>WhatsApp: 0812-3456-7890</p>
            <p className="mt-1">Jam Operasional: Senin - Sabtu (08:00 - 17:00 WIB)</p>
          </div>
        </div>

        <div className="border-t border-border/60 py-4 text-center text-muted-foreground text-[11px]">
          © 2026 AutoPart Central. All rights reserved. Mock up Application.
        </div>
      </footer>

      {/* Global Slide-over Cart & Checkout Dialog */}
      <CartSheet onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutDialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen} />
    </div>
  )
}
