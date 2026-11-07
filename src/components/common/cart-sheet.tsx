import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"

interface CartSheetProps {
  onOpenCheckout: () => void
}

export function CartSheet({ onOpenCheckout }: CartSheetProps) {
  const {
    items,
    updateQuantity,
    removeFromCart,
    summary,
    isCartOpen,
    setIsCartOpen,
  } = useCart()

  const handleCheckoutClick = () => {
    setIsCartOpen(false)
    onOpenCheckout()
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-6">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-primary" />
            Keranjang Belanja ({summary.totalItems})
          </SheetTitle>
          <SheetDescription>
            Tinjau suku cadang yang akan Anda pesan sebelum checkout.
          </SheetDescription>
        </SheetHeader>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="size-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="size-8" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Keranjang Anda Masih Kosong</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Pilih suku cadang berkualitas untuk kendaraan Anda di katalog.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(false)}
                className="cursor-pointer"
              >
                Mulai Belanja
              </Button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/60 hover:bg-card transition"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="size-14 rounded-lg object-cover bg-muted shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate text-foreground">
                    {product.name}
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono">
                    {product.partNumber}
                  </p>
                  <p className="text-xs font-bold text-primary mt-1">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7 cursor-pointer"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                  >
                    <Minus className="size-3" />
                  </Button>
                  <span className="w-6 text-center text-xs font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-7 cursor-pointer"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                  >
                    <Plus className="size-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 text-destructive hover:bg-destructive/10 cursor-pointer ml-1"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <SheetFooter className="border-t border-border pt-4 flex-col gap-3 sm:flex-col">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal Barang:</span>
                <span>Rp {summary.subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimasi Ongkir:</span>
                <span>
                  {summary.estimatedShipping === 0 ? (
                    <span className="text-emerald-500 font-medium">Gratis</span>
                  ) : (
                    `Rp ${summary.estimatedShipping.toLocaleString("id-ID")}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>PPN (11%):</span>
                <span>Rp {summary.tax.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-foreground border-t border-border/60 pt-2">
                <span>Total Pembayaran:</span>
                <span className="text-primary font-black">
                  Rp {summary.total.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <Button
              onClick={handleCheckoutClick}
              className="w-full gap-2 cursor-pointer mt-2"
              size="lg"
            >
              <span>Lanjut ke Checkout</span>
              <ArrowRight className="size-4" />
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

