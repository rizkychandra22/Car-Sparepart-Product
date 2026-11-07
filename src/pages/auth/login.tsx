import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react"
import { Brand } from "@/components/common/brand"
import { Button } from "@/components/ui/button"
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
          <div className="auth-art-card">
            <span className="auth-card-caption">AUTOMOTIVE MASTER DATA</span>
            <div className="auth-card-stats">
              <span><b>5.239</b><small>Records</small></span>
              <span><b>31</b><small>Vehicle types</small></span>
              <span><b>8</b><small>Brands</small></span>
            </div>
            <div className="auth-art-card-bottom"><span>REFERENCE DATA / DEMO</span><ShieldCheck className="auth-check" aria-hidden="true" /></div>
          </div>
        </div>
        <div className="auth-corner-caption">PRECISION IN EVERY PART. CONFIDENCE IN EVERY DECISION.</div>
      </section>

      <section className="auth-form-area" aria-labelledby="login-title">
        <div className="auth-form-top"><Brand /><span className="access-tag">DEMO FRONTEND</span></div>

        <div className="auth-form-content">
          <h1 id="login-title">Masuk ke akun<br /><em>PARTSCOPE.</em></h1>
          <p className="form-subtitle">Masuk menggunakan akun demo untuk mencoba alur login frontend PARTSCOPE.</p>

          {notice && (
            <div
              role={notice.type === "error" ? "alert" : "status"}
              className={`form-alert ${notice.type === "success" ? "form-alert-success" : ""}`}
            >
              <span>{notice.type === "success" ? "✓" : "!"}</span>{notice.message}
            </div>
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
              <button
                className="show-password"
                type="button"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
              </button>
            </div>

            <Button type="submit" className="button button-ink login-submit">Masuk ke workspace <span aria-hidden="true">↗</span></Button>
            <p className="login-help">Login demo memakai satu akun statis di browser; tidak membuat sesi backend.</p>
          </form>
        </div>

        <div className="auth-form-footer"><span>© {new Date().getFullYear()} PARTSCOPE</span><span>FRONTEND PREVIEW <ShieldCheck className="lock-small" aria-hidden="true" /></span></div>
      </section>
    </main>
  )
}
