import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Check, Eye, EyeOff, Lock } from "lucide-react"
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
    <main className={`
      auth-layout [font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,Segoe_UI,sans-serif] min-h-[100vh] grid grid-cols-[47%_53%] max-[900px]:grid-cols-[44%_56%]
      max-[740px]:block max-[740px]:min-h-[100vh] [&_.field-wrap_input]:h-[42px]
      [&_.login-submit]:h-[42px]
    `}>
      <section className={`
        auth-art
        bg-[image:radial-gradient(ellipse_at_65%_48%,#1a4550,transparent_52%),linear-gradient(145deg,#08172a,#102e3e)]
        text-[#fff] relative overflow-hidden flex flex-col p-[46px_clamp(35px,5.3vw,91px)]
        [&::before]:[content:""] [&::before]:absolute [&::before]:[inset:0]
        [&::before]:bg-[image:linear-gradient(90deg,#ffffff07_1px,transparent_1px),linear-gradient(0deg,#ffffff07_1px,transparent_1px)]
        [&::before]:bg-[size:62px_62px] [&::before]:opacity-[.44]
        [&::before]:[mask-image:radial-gradient(circle_at_70%_50%,#000,transparent_75%)]
        [&::after]:[content:""] [&::after]:absolute [&::after]:w-[640px] [&::after]:h-[640px]
        [&::after]:[border:1px_solid_#ffffff13] [&::after]:rounded-full
        [&::after]:[bottom:-300px] [&::after]:[right:-270px]
        [&::after]:shadow-[0_0_0_95px_#ffffff06,0_0_0_200px_#ffffff04] max-[900px]:px-[34px]
        max-[740px]:min-h-[240px] max-[740px]:p-[28px_22px_32px]
      `} aria-label="Tentang PARTSCOPE">
        <Link to="/" className={`
          auth-back relative z-[2] inline-flex gap-[11px] items-center text-[#b6cbd1] text-[12px]
          font-bold [&:hover]:text-[var(--lime)]
        `}><ArrowLeft aria-hidden="true" /> <span>Kembali ke beranda</span></Link>
        <div className="auth-art-glow" aria-hidden="true" />
        <div className={`
          auth-art-content relative z-[2] m-[auto_0] max-w-[550px] p-[40px_0]
          [&_h2]:text-[clamp(42px,5.1vw,74px)] [&_h2]:font-bold [&_h2]:tracking-[-.075em] [&_h2]:leading-[1.11]
          [&_h2]:m-[35px_0_23px] [&_h2_em]:not-italic [&_h2_em]:text-[var(--lime)]
          [&>p]:text-[#a5bdc9] [&>p]:text-[14px] [&>p]:max-w-[400px] [&>p]:mb-[40px]
          max-[740px]:p-[21px_0_0] max-[740px]:m-0 max-[740px]:[&_h2]:text-[37px]
          max-[740px]:[&_h2]:m-[17px_0_9px] max-[740px]:[&>p]:text-[11px] max-[740px]:[&>p]:m-0
        `}>
          <span className={`
            auth-eyebrow text-[10px] tracking-[2.1px] font-black text-[var(--lime)] flex
            items-center gap-[10px] max-[740px]:text-[8px]
          `}><span className={`
            signal-dot w-[7px] h-[7px] shrink-0 rounded-full bg-[var(--lime)]
            shadow-[0_0_0_4px_#d0ff6b1b]
          `} /> PARTSCOPE WORKSPACE / ACCESS</span>
          <h2>Better data.<br /><em>Better decisions.</em></h2>
          <p>Seluruh informasi spare part ada dalam satu workspace yang bisa dicari, difilter, dan ditelusuri dengan mudah.</p>
          <Card className={`
            auth-art-card gap-0 ring-0 max-w-[430px] p-[28px] [border:1px_solid_#ffffff23]
            rounded-[13px] bg-transparent bg-[image:linear-gradient(135deg,#ffffff18,#ffffff07)]
            shadow-[0_23px_55px_#04131e32] [backdrop-filter:blur(7px)] max-[740px]:hidden
            text-[#fff]
          `}>
            <span className="auth-card-caption text-[9px] tracking-[2.2px] text-[#b1c7cb] font-[850]">AUTOMOTIVE MASTER DATA</span>
            <div className={`
              auth-card-stats grid grid-cols-[repeat(3,1fr)] gap-[15px] m-[26px_0] [&>span]:flex
              [&>span]:flex-col [&>span]:gap-[7px] [&_b]:text-[29px] [&_b]:tracking-[-.05em]
              [&_small]:text-[10px] [&_small]:text-[#b3c9cd]
            `}>
              <span><b>5.239</b><small>Records</small></span>
              <span><b>31</b><small>Vehicle types</small></span>
              <span><b>8</b><small>Brands</small></span>
            </div>
            <div className={`
              auth-art-card-bottom [border-top:1px_solid_#ffffff2b] flex items-center justify-between
              pt-[15px] text-[9px] font-black tracking-[1.25px] text-[#bed4d5]
            `}><span>DATA READY FOR DISCOVERY</span><Check className="auth-check text-[var(--lime)] text-[15px]" aria-hidden="true" /></div>
          </Card>
        </div>
        <div className={`
          auth-corner-caption relative z-[2] text-[#7697aa] tracking-[1.75px] text-[8px]
          font-black max-[740px]:hidden
        `}>PRECISION IN EVERY PART. CONFIDENCE IN EVERY DECISION.</div>
      </section>

      <section className={`
        auth-form-area p-[43px_clamp(35px,6.2vw,112px)_35px] flex flex-col min-w-[0]
        max-[900px]:px-[38px] max-[740px]:p-[26px_22px_24px] max-[740px]:min-h-[620px]
        [&_.form-alert-success]:text-[#286d4f] [&_.form-alert-success]:bg-[#eef9f2]
        [&_.form-alert-success]:border-[#cae9d5] [&_.form-alert-success_span]:text-[#2e8a60]
      `} aria-labelledby="login-title">
        <div className="auth-form-top flex items-center justify-between gap-[20px]"><Brand /><Badge variant="outline" className={`
          access-tag [border:1px_solid_#e1e9e9] p-[9px_12px] rounded-[5px] text-[#889ba2]
          whitespace-nowrap text-[9px] font-[850] tracking-[1.4px] max-[900px]:hidden h-auto
        `}>PRIVATE WORKSPACE</Badge></div>

        <div className={`
          auth-form-content w-full max-w-[470px] m-auto p-[65px_0]
          [&_h1]:text-[clamp(39px,4.15vw,59px)] [&_h1]:font-bold [&_h1]:tracking-[-.07em] [&_h1]:leading-[1.13]
          [&_h1]:mb-[19px] [&_h1_em]:text-[#389d89] [&_h1_em]:not-italic
          max-[740px]:p-[52px_0_60px] max-[740px]:[&_h1]:text-[42px]
        `}>
          <h1 id="login-title">Masuk ke akun<br /><em>PARTSCOPE.</em></h1>
          <p className="form-subtitle text-[#7e929d] text-[14px] leading-[1.9] mb-[38px]">Masuk menggunakan akun demo untuk mencoba alur login frontend PARTSCOPE.</p>

          {notice && (
            <Alert variant="destructive" className={`
              form-alert flex items-start gap-[11px] bg-[#fff3f0] [border:1px_solid_#f4d7cd]
              rounded-[7px] p-[13px_15px] m-[-10px_0_24px] text-[#9a3f2d] text-[12px] leading-[1.6]
              [&_span]:font-black [&_span]:text-[#d54d32]
            `}>
              <span>{notice.type === "success" ? "✓" : "!"}</span>{notice.message}
            </Alert>
          )}

          <form className={`
            login-form flex flex-col [&>label]:text-[12px] [&>label]:font-extrabold
            [&>label]:m-[0_0_10px]
          `} autoComplete="on" onSubmit={handleSubmit}>
            <Label htmlFor="email">Alamat email</Label>
            <div className={`
              field-wrap relative mb-[24px] [&_input]:w-full [&_input]:h-[56px]
              [&_input]:[border:1px_solid_#dce7e9] [&_input]:rounded-[8px] [&_input]:bg-[#f9fbfb]
              [&_input]:text-[var(--ink)] [&_input]:p-[0_50px] [&_input]:text-[14px]
              [&_input]:outline-none [&_input]:transition-[border-color_.18s,box-shadow_.18s]
              [&_input:focus]:border-[#65aa91] [&_input:focus]:shadow-[0_0_0_4px_#49ac8b18]
              [&_input::placeholder]:text-[#a8b8c0]
            `}>
              <span className={`
                field-icon absolute [top:50%] [left:19px] [transform:translateY(-50%)] text-[#77a49f]
                text-[18px] font-[650]
              `} aria-hidden="true">@</span>
              <Input id="email" name="email" type="email" required autoComplete="email" maxLength={190} placeholder="nama@perusahaan.com" autoFocus />
            </div>

            <Label htmlFor="password">Password</Label>
            <div className={`
              field-wrap relative mb-[24px] [&_input]:w-full [&_input]:h-[56px]
              [&_input]:[border:1px_solid_#dce7e9] [&_input]:rounded-[8px] [&_input]:bg-[#f9fbfb]
              [&_input]:text-[var(--ink)] [&_input]:p-[0_50px] [&_input]:text-[14px]
              [&_input]:outline-none [&_input]:transition-[border-color_.18s,box-shadow_.18s]
              [&_input:focus]:border-[#65aa91] [&_input:focus]:shadow-[0_0_0_4px_#49ac8b18]
              [&_input::placeholder]:text-[#a8b8c0]
            `}>
              <Lock className={`
                field-icon lock-icon size-4 absolute [top:50%] [left:19px] [transform:translateY(-50%)]
                text-[#77a49f] font-[650] text-[25px]
              `} aria-hidden="true" />
              <Input id="password" name="password" type={showPassword ? "text" : "password"} required autoComplete="current-password" placeholder="Masukkan password Anda" />
              <Button
                variant="ghost"
                size="icon"
                className={`
                  show-password border-0 shadow-none hover:bg-transparent absolute [right:15px] [top:50%]
                  [transform:translateY(-50%)] bg-[none] [border:0] p-[7px] text-[#8097a2]
                  [&_svg]:w-[20px] [&_svg]:h-[20px]
                `}
                type="button"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
              </Button>
            </div>

            <Button type="submit" className={`
              button button-ink login-submit inline-flex items-center justify-between gap-[24px]
              [border:1px_solid_transparent] rounded-[7px] p-[14px_20px] font-[730] text-[13px]
              tracking-[-.015em] whitespace-nowrap
              transition-[transform_.16s,background_.16s,box-shadow_.16s]
              [&:hover]:[transform:translateY(-2px)] [&_span]:text-[17px] max-[740px]:px-[15px]
              max-[740px]:text-[12px] max-[740px]:gap-[11px] max-[410px]:px-[11px]
              max-[410px]:text-[11px] bg-[var(--ink)] text-[#fff] [&:hover]:bg-[#1d3756]
              [&:hover]:shadow-[0_8px_23px_#0d233122] h-[56px] w-full mt-[6px]
            `}>Masuk ke workspace <span aria-hidden="true">↗</span></Button>
            <p className="login-help m-[19px_0_0] text-center text-[#8c9fa8] text-[11px] leading-[1.6]">Login demo memakai satu akun statis di browser; tidak membuat sesi backend.</p>
          </form>
        </div>

        <div className={`
          auth-form-footer flex items-center justify-between text-[#9caeb4] text-[9px]
          tracking-[1px] font-extrabold max-[740px]:text-[8px]
        `}><span>© {new Date().getFullYear()} PARTSCOPE</span><span>FRONTEND PREVIEW </span></div>
      </section>
    </main>
  )
}
