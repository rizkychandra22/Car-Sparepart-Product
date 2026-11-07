import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Car, Lock, ArrowLeft, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("admin123")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate("/dashboard")
    }, 400)
  }

  return (
    <div className="min-h-screen bg-radial-[at_top] from-primary/10 via-background to-background text-foreground flex flex-col justify-center items-center p-4 sm:p-6 relative">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <Card className="max-w-md w-full border border-border/80 shadow-2xl bg-card/95 backdrop-blur-md rounded-2xl relative z-10 overflow-hidden">
        {/* Subtle top primary highlight bar */}
        <div className="h-1.5 w-full bg-linear-to-r from-primary/60 via-primary to-primary/60" />

        <form onSubmit={handleLogin} className="p-2 sm:p-4">
          <CardHeader className="text-center space-y-3 pb-6 pt-4">
            {/* Brand Logo & Icon */}
            <div className="mx-auto flex flex-col items-center gap-3">
              <div className="size-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 ring-4 ring-primary/10">
                <Car className="size-7" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                  AutoPart Central
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  Portal Autentikasi Pengelola Gudang, Inventaris Sparepart & Transaksi
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center justify-center pt-1">
              <Badge variant="secondary" className="gap-1.5 text-[11px] px-2.5 py-0.5 font-medium border border-border">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                <span>Akses Khusus Administrator</span>
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 px-4 sm:px-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                Email Administrator
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@example.com"
                  required
                  className="pl-10 h-11 bg-background text-sm rounded-xl border-border focus:border-primary transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                  Kata Sandi
                </Label>
                <span className="text-[11px] text-muted-foreground hover:text-primary transition cursor-pointer">
                  Lupa sandi?
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 pr-10 h-11 bg-background text-sm rounded-xl border-border focus:border-primary transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition p-1 cursor-pointer"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-3 pt-5 px-4 sm:px-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl text-sm font-semibold gap-2 cursor-pointer shadow-md shadow-primary/10 transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              {isLoading ? (
                <div className="size-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              ) : (
                <Lock className="size-4" />
              )}
              <span>{isLoading ? "Memverifikasi..." : "Masuk ke Panel Gudang"}</span>
            </Button>

            <Link
              to="/"
              className="w-full py-2.5 text-center text-xs font-medium text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 rounded-xl hover:bg-muted/60 transition"
            >
              <ArrowLeft className="size-3.5" />
              <span>Kembali ke Katalog Produk</span>
            </Link>
          </CardFooter>
        </form>
      </Card>

      {/* Security Footer Note */}
      <div className="mt-8 text-center text-[11px] text-muted-foreground max-w-sm space-y-1">
        <p>Dilindungi enkripsi end-to-end berstandar industri.</p>
        <p>© 2026 AutoPart Central. Hak Cipta Dilindungi.</p>
      </div>
    </div>
  )
}
