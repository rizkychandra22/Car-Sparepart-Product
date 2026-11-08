import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ErrorBoundary } from "@/components/common/error-boundary"
import { Guest } from "@/layouts/guest"

const LandingHome = lazy(() => import("@/pages/landing-home"))
const LoginPage = lazy(() => import("@/pages/auth/login"))
const PartsPage = lazy(() => import("@/pages/index-parts"))

function PageFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Memuat halaman...</p>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<Guest />}>
              <Route path="/" element={<LandingHome />} />
            </Route>
            <Route path="/parts" element={<PartsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
