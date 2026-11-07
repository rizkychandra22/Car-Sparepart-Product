import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Brand } from "@/components/common/brand"
import { Button } from "@/components/ui/button"

const sectionLinks = [
  ["Beranda", "#beranda"],
  ["Fitur", "#fitur"],
  ["Data awal", "#data"],
  ["Cara kerja", "#alur"],
] as const

export function Guest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="page-home min-h-screen">
      <header className="site-header is-tech-header">
        <div className="container header-inner">
          <nav className="desktop-nav" aria-label="Navigasi utama">
            {sectionLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>

          <Brand />

          <div className="header-actions">
            <Link className="link-login" to="/login">Masuk</Link>
            <Button asChild className="button button-ink button-sm border-0 shadow-none">
              <Link to="/login">
              Buka katalog <span aria-hidden="true">↗</span>
              </Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu-trigger"
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Tutup navigasi" : "Buka navigasi"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>

        <nav className="mobile-menu" id="mobile-menu" aria-label="Navigasi mobile" hidden={!isMenuOpen}>
          {sectionLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setIsMenuOpen(false)}>{label}</a>
          ))}
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>Akses platform</Link>
        </nav>
      </header>

      <main id="main-content"><Outlet /></main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} PARTSCOPE</span>
          <span>MASTER DATA · SPARE PARTS</span>
          <span>Built for precise discovery.</span>
        </div>
      </footer>
    </div>
  )
}
