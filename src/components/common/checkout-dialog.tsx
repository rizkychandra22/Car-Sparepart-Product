import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import type { CustomerDetails, Order, PaymentMethod } from "@/types/order"
import { CheckCircle2, QrCode, Building2, Truck, Loader2 } from "lucide-react"

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { items, summary, clearCart } = useCart()

  const [form, setForm] = useState<CustomerDetails>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Jakarta",
    postalCode: "12340",
    vehicleInfo: "",
  })

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("QRIS")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.fullName || !form.phone || !form.address) return

    setIsSubmitting(true)
    setTimeout(() => {
      const order: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `AUTO-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
        items,
        customer: form,
        subtotal: summary.subtotal,
        shippingCost: summary.estimatedShipping,
        totalAmount: summary.total,
        paymentMethod,
        paymentStatus: "PENDING",
        orderStatus: "PROCESSING",
      }
      setCompletedOrder(order)
      clearCart()
      setIsSubmitting(false)
    }, 400)
  }

  const handleClose = () => {
    setCompletedOrder(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-6 max-h-[90vh] overflow-y-auto no-scrollbar">
        {completedOrder ? (
          <div className="text-center py-6 space-y-4">
            <div className="size-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="size-10" />
            </div>

            <div className="space-y-1">
              <Badge variant="outline" className="text-xs font-mono mb-2">
                {completedOrder.orderNumber}
              </Badge>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Pesanan Berhasil Dibuat!
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Terima kasih, {completedOrder.customer.fullName}. Suku cadang pesanan Anda
                sedang dipersiapkan oleh tim logistik kami.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-muted/40 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Metode Bayar:</span>
                <span className="font-semibold text-foreground">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Pembayaran:</span>
                <span className="font-bold text-primary">
                  Rp {completedOrder.totalAmount.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Alamat Pengiriman:</span>
                <span className="font-medium text-foreground text-right truncate max-w-[200px]">
                  {completedOrder.customer.address}, {completedOrder.customer.city}
                </span>
              </div>
            </div>

            <Button onClick={handleClose} className="w-full cursor-pointer">
              Kembali ke Beranda
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Checkout & Pengiriman</DialogTitle>
              <DialogDescription>
                Lengkapi data penerima untuk pengiriman suku cadang kendaraan Anda.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 text-xs">
              <div>
                <Label htmlFor="name" className="text-xs">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Contoh: Budi Santoso"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="phone" className="text-xs">No. WhatsApp / HP</Label>
                  <Input
                    id="phone"
                    placeholder="08123456789"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="vehicle" className="text-xs">Tipe & Tahun Mobil</Label>
                  <Input
                    id="vehicle"
                    placeholder="Contoh: Avanza 2018"
                    value={form.vehicleInfo}
                    onChange={(e) => setForm({ ...form, vehicleInfo: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-xs">Alamat Lengkap</Label>
                <Input
                  id="address"
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              {/* Payment Method */}
              <div className="pt-2">
                <Label className="text-xs mb-2 block font-semibold">Pilih Metode Pembayaran</Label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("QRIS")}
                    className={`p-2.5 rounded-lg border text-center transition cursor-pointer flex flex-col items-center gap-1 text-xs ${
                      paymentMethod === "QRIS"
                        ? "border-primary bg-primary/10 text-primary font-bold"
                        : "border-border hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <QrCode className="size-4" />
                    <span>QRIS Instan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("BANK_TRANSFER")}
                    className={`p-2.5 rounded-lg border text-center transition cursor-pointer flex flex-col items-center gap-1 text-xs ${
                      paymentMethod === "BANK_TRANSFER"
                        ? "border-primary bg-primary/10 text-primary font-bold"
                        : "border-border hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Building2 className="size-4" />
                    <span>Transfer Bank</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    className={`p-2.5 rounded-lg border text-center transition cursor-pointer flex flex-col items-center gap-1 text-xs ${
                      paymentMethod === "COD"
                        ? "border-primary bg-primary/10 text-primary font-bold"
                        : "border-border hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Truck className="size-4" />
                    <span>COD Bayar Ditempat</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Total recap */}
            <div className="p-3 rounded-lg border border-border bg-muted/30 flex justify-between items-center text-xs">
              <span className="text-muted-foreground font-medium">Total ({items.length} jenis item):</span>
              <span className="text-base font-black text-primary">
                Rp {summary.total.toLocaleString("id-ID")}
              </span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full gap-2 cursor-pointer"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Memproses Pesanan...</span>
                </>
              ) : (
                <span>Konfirmasi Pesanan Sekarang</span>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

