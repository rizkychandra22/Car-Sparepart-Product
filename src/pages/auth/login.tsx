import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react"
import { Brand } from "@/components/common/brand"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authenticateDemoUser } from "@/data/user"

type LoginNotice = {
  type: "success" | "error"
  message: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState<LoginNotice | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")
    const matchedUser = authenticateDemoUser(email, password)

    if (!matchedUser) {
      setNotice({ type: "error", message: "Email atau password tidak sesuai dengan akun demo." })
      return
    }

    setNotice(null)
    navigate("/parts", { replace: true })
  }

  return (
    <main className="auth-layout">
      <section className="auth-art" aria-label="Tentang PARTSCOPE">
        <Link to="/" className="auth-back"><ArrowLeft aria-hidden="true" /> <span>Kembali ke beranda</span></Link>
        <div className="auth-art-glow" aria-hidden="true" />
        <div className="auth-art-content">
          <span className="auth-eyebrow"><span className="signal-dot" /> PARTSCOPE WORKSPACE / ACCESS</span>
          <h2>Better data.<br /><em>Better decisions.</em></h2>
          <p>Seluruh informasi spare part ada dalam satu workspace yang bisa dicari, difilter, dan ditelusuri dengan mudah.</p>
          <Card className="auth-art-card gap-0 p-0 ring-0">
            <span className="auth-card-caption">AUTOMOTIVE MASTER DATA</span>
            <div className="auth-card-stats">
              <span><b>5.239</b><small>Records</small></span>
              <span><b>31</b><small>Vehicle types</small></span>
              <span><b>8</b><small>Brands</small></span>
            </div>
            <div className="auth-art-card-bottom"><span>REFERENCE DATA / DEMO</span><ShieldCheck className="auth-check" aria-hidden="true" /></div>
          </Card>
        </div>
        <div className="auth-corner-caption">PRECISION IN EVERY PART. CONFIDENCE IN EVERY DECISION.</div>
      </section>

      <section className="auth-form-area" aria-labelledby="login-title">
        <div className="auth-form-top"><Brand /><Badge variant="outline" className="access-tag">DEMO FRONTEND</Badge></div>

        <div className="auth-form-content">
          <h1 id="login-title">Masuk ke akun<br /><em>PARTSCOPE.</em></h1>
          <p className="form-subtitle">Masuk menggunakan akun demo untuk mencoba alur login frontend PARTSCOPE.</p>

          {notice && (
            <Alert variant="destructive" className="form-alert">
              <span>{notice.type === "success" ? "✓" : "!"}</span>{notice.message}
            </Alert>
          )}

          <form className="login-form" autoComplete="on" onSubmit={handleSubmit}>
            <Label htmlFor="email">Alamat email</Label>
            <div className="field-wrap">
              <span className="field-icon" aria-hidden="true">@</span>
              <Input id="email" name="email" type="email" required autoComplete="email" maxLength={190} placeholder="nama@perusahaan.com" autoFocus />
            </div>

            <Label htmlFor="password">Password</Label>
            <div className="field-wrap">
              <Lock className="field-icon lock-icon size-4" aria-hidden="true" />
              <Input id="password" name="password" type={showPassword ? "text" : "password"} required autoComplete="current-password" placeholder="Masukkan password Anda" />
              <Button
                variant="ghost"
                size="icon"
                className="show-password border-0 bg-transparent p-0 shadow-none hover:bg-transparent"
                type="button"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
              </Button>
            </div>

            <Button type="submit" className="button button-ink login-submit">Masuk ke workspace <span aria-hidden="true">↗</span></Button>
            <p className="login-help">Login demo memakai satu akun statis di browser; tidak membuat sesi backend.</p>
          </form>
        </div>

        <div className="auth-form-footer"><span>© {new Date().getFullYear()} PARTSCOPE</span><span>FRONTEND PREVIEW </span></div>
      </section>
    </main>
  )
}
