import { ArrowDown, ArrowUpRight, Search } from "lucide-react"
import { Link } from "react-router-dom"

export function HeroSection() {
  return (
    <section className="bt-hero" id="beranda" aria-labelledby="hero-title">
      <div className="bt-hero-graphic" aria-hidden="true" />
      <div className="bt-hero-glow" aria-hidden="true" />

      <div className="container bt-hero-content">
        <div className="bt-hero-copy">
          <div className="bt-kicker"><span className="bt-kicker-mark" /> AUTOMOTIVE DATA PLATFORM <span className="bt-kicker-divider">/</span> MVP 01</div>
          <p className="bt-overline">SMARTER DATA. SIMPLER DISCOVERY.</p>
          <h1 id="hero-title"><span>MASTER DATA</span><strong>SPARE PARTS<span className="bt-title-period">.</span></strong></h1>
          <p className="bt-hero-intro">Satu platform untuk menemukan informasi spare part kendaraan secara cepat, terstruktur, dan presisi. Telusuri nomor part, kategori, tipe kendaraan, harga referensi, hingga status data.</p>
          <div className="bt-hero-actions">
            <Link to="/login" className="bt-btn bt-btn-primary">Jelajahi katalog <ArrowUpRight aria-hidden="true" /></Link>
            <a href="#fitur" className="bt-btn bt-btn-ghost">Kenali fitur <ArrowDown aria-hidden="true" /></a>
          </div>
          <div className="bt-hero-smallprint">
            <span className="bt-smallprint-pulse" /> SECURE ACCESS <span className="bt-smallprint-sep" /> SEARCH-READY DATABASE <span className="bt-smallprint-sep" /> REFERENCE DATA
          </div>
        </div>

        <div className="bt-hero-data" aria-label="Ringkasan data awal pada platform">
          <div className="bt-network-orbit" aria-hidden="true">
            <div className="bt-orbit-core"><svg viewBox="0 0 120 120" fill="none"><path d="M31 40 60 23l29 17v38L60 96 31 78V40Z" stroke="currentColor" strokeWidth="2"/><path d="m31 40 29 17 29-17M60 57v39M31 78l29-21 29 21" stroke="currentColor" strokeWidth="2"/><circle cx="60" cy="57" r="6" fill="currentColor"/></svg></div>
          </div>
          <div className="bt-glass-panel">
            <div className="bt-panel-header"><span><i/><i/><i/></span> LIVE CATALOG PREVIEW <span className="bt-panel-code">MD / 001</span></div>
            <div className="bt-panel-label">MASTER DATA EXPLORER</div>
            <div className="bt-panel-search"><Search aria-hidden="true"/><span>Nama part, nomor part, tipe kendaraan...</span><kbd>⌘ F</kbd></div>
            <div className="bt-panel-chips"><span>HYUNDAI TYPE</span><span>BRAND</span><span>PART GROUP</span></div>
            <div className="bt-panel-divider" />
            <div className="bt-panel-row"><span className="bt-panel-row-icon">01</span><span><b>Part name</b><small>Nama komponen / deskripsi</small></span><span className="bt-panel-row-tail">↗</span></div>
            <div className="bt-panel-row"><span className="bt-panel-row-icon">02</span><span><b>Part number</b><small>Referensi identifikasi part</small></span><span className="bt-panel-row-tail">↗</span></div>
            <div className="bt-panel-row"><span className="bt-panel-row-icon">03</span><span><b>Vehicle type</b><small>Filter berdasarkan kendaraan</small></span><span className="bt-panel-row-tail">↗</span></div>
            <div className="bt-panel-foot"><span className="bt-status-dot"/> REFERENSI MASTER DATA <span>VIEW ONLY</span></div>
          </div>
          <div className="bt-data-floating"><span>INITIAL DATASET</span><strong>5.239 <small>records</small></strong><i/></div>
        </div>
      </div>

      <div className="container bt-hero-bottom"><span>01 <i/> CATALOG INTELLIGENCE STARTS HERE</span><a href="#fitur">SCROLL TO EXPLORE <ArrowDown aria-hidden="true"/></a></div>
    </section>
  )
}
