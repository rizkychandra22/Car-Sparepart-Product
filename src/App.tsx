import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { CartProvider } from "@/context/cart-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { ErrorBoundary } from "@/components/common/error-boundary"
import { Guest } from "@/layouts/guest"

// Lazy Loading Routes (Code Splitting like in Ukm-Lises)
const WebPage = lazy(() => import("@/pages/web"))
const DashboardPage = lazy(() => import("@/pages/dashboard"))
const LoginPage = lazy(() => import("@/pages/auth/login"))

function PageFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-xs text-muted-foreground">Memuat halaman...</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <TooltipProvider>
          <Toaster position="top-right" richColors />
          <BrowserRouter>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* Public Storefront Routes */}
                <Route element={<Guest />}>
                  <Route path="/" element={<WebPage />} />
                </Route>

                {/* Admin & Auth Routes */}
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </ErrorBoundary>
  )
}
