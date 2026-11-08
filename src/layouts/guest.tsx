import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Brand } from "@/components/common/brand"
import { Button } from "@/components/ui/button"
import { landingContainerClass } from "@/features/landing/container"

const sectionLinks = [
  ["Fitur", "#fitur"],
  ["Data awal", "#data"],
  ["Cara kerja", "#alur"],
] as const

export function Guest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#122442]">
      <header className="absolute inset-x-0 top-0 z-[50] h-[88px] border-0 bg-transparent text-white max-[700px]:h-[74px]">
        <div className={`${landingContainerClass} flex h-full items-center justify-between gap-[26px]`}>
          <Brand
            variant="landing"
            className="order-0 mr-[22px] text-white max-[1180px]:mr-0 max-[900px]:mr-auto"
          />

          <nav className="order-1 mr-auto flex items-center gap-[34px] max-[1180px]:gap-[20px] max-[900px]:hidden" aria-label="Navigasi utama">
            {sectionLinks.map(([label, href]) => (
              <a className="text-[11px] font-[720] tracking-[1.25px] text-white opacity-[.88] transition-colors hover:opacity-100" key={href} href={href}>{label}</a>
            ))}
          </nav>

          <div className="order-2 flex items-center gap-5 max-[1180px]:gap-[10px] max-[900px]:order-1 max-[700px]:hidden">
            <Button asChild className="inline-flex min-h-[37px] items-center justify-between gap-[24px] rounded-[7px] border border-[#b5eaff77] bg-[#ffffff18] px-[15px] py-[11px] text-[10px] font-bold tracking-[.5px] text-white transition-all hover:-translate-y-0.5 hover:bg-[#ffffff35] hover:shadow-[0_0_15px_#a2e7ff25]">
              <Link to="/login">Masuk & Buka katalog <span aria-hidden="true">↗</span></Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="order-3 ml-0 hidden border-0 bg-transparent p-2 text-white shadow-none hover:bg-transparent max-[900px]:inline-flex max-[700px]:ml-auto"
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Tutup navigasi" : "Buka navigasi"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>

        <nav
          className="rounded-b-[14px] border border-[#3daaff45] bg-[#071f5a] px-[26px] pb-[22px] pt-4 shadow-[0_14px_25px_#10203015] [&_a]:block [&_a]:border-b [&_a]:border-[#ffffff29] [&_a]:px-1 [&_a]:py-[13px] [&_a]:text-[14px] [&_a]:font-bold [&_a]:text-white"
          id="mobile-menu"
          aria-label="Navigasi mobile"
          hidden={!isMenuOpen}
        >
          {sectionLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setIsMenuOpen(false)}>{label}</a>
          ))}
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>Akses platform</Link>
        </nav>
      </header>

      <main id="main-content"><Outlet /></main>

      <footer className="border-t border-[#61c9ff23] bg-[#061743] text-[#adcee7]">
        <div className={`${landingContainerClass} flex justify-between gap-5 py-[26px] text-[9px] tracking-[1.1px] max-[700px]:flex-col max-[700px]:gap-[7px] max-[700px]:text-center`}>
          <span>© {new Date().getFullYear()} PARTSCOPE</span>
          <span>MASTER DATA · SPARE PARTS</span>
          <span>Built for precise discovery.</span>
        </div>
      </footer>
    </div>
  )
}
