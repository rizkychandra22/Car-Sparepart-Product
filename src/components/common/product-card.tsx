import type { Product } from "@/types/product"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Car, Info, ShoppingCart } from "lucide-react"

export interface ProductCardProps {
  product: Product
  onDetail?: (product: Product) => void
  onAddToCart?: (product: Product) => void
  className?: string
}

export function ProductCard({
  product,
  onDetail,
  onAddToCart,
  className = "",
}: ProductCardProps) {
  return (
    <Card
      className={`flex flex-col justify-between overflow-hidden border-border hover:shadow-lg transition-all group ${className}`}
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={(e) => {
              const target = e.currentTarget
              if (!target.src.includes("photo-1486262715619-67b85e0b08d3")) {
                target.src = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&auto=format&fit=crop&q=80"
              }
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
            <Badge variant="secondary" className="text-[10px] font-bold backdrop-blur-md bg-card/80">
              {product.brand}
            </Badge>
            {product.isBestSeller && (
              <Badge className="text-[10px] bg-amber-500 hover:bg-amber-600 text-white font-bold">
                Best Seller
              </Badge>
            )}
          </div>
        </div>

        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-mono text-[11px] text-primary font-semibold">
              {product.partNumber}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="size-3 fill-amber-500" />
              <span>{product.rating}</span>
              <span className="text-[10px] text-muted-foreground font-normal">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          <CardTitle
            onClick={() => onDetail?.(product)}
            className="text-sm font-bold mt-1 line-clamp-2 hover:text-primary cursor-pointer transition"
          >
            {product.name}
          </CardTitle>

          {/* Compatibility Tags */}
          <div className="flex items-center gap-1 mt-1 text-[11px] text-muted-foreground truncate">
            <Car className="size-3 text-muted-foreground shrink-0" />
            <span className="truncate">
              {product.compatibility.map((c) => c.model).join(", ")}
            </span>
          </div>
        </CardHeader>
      </div>

      <div>
        <CardContent className="p-4 pt-0 space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black text-foreground">
              Rp {product.price.toLocaleString("id-ID")}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                Rp {product.originalPrice.toLocaleString("id-ID")}
              </span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Stok tersedia: <span className="font-semibold text-foreground">{product.stock} pcs</span>
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-3.5 grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDetail?.(product)}
            className="text-xs cursor-pointer gap-1"
          >
            <Info className="size-3.5" />
            <span>Detail</span>
          </Button>
          <Button
            size="sm"
            onClick={() => onAddToCart?.(product)}
            className="text-xs cursor-pointer gap-1"
          >
            <ShoppingCart className="size-3.5" />
            <span>Beli</span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}

