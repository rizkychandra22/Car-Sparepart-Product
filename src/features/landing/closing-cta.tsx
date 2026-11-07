import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

export function ClosingCta() {
  return (
    <section className="bt-footer-cta">
      <div className="container bt-footer-cta-inner">
        <div><span>READY TO DISCOVER?</span><h2>Temukan informasi part<br />yang Anda butuhkan.</h2></div>
        <Link to="/login" className="bt-btn bt-btn-dark">Buka master data <ArrowUpRight aria-hidden="true" /></Link>
      </div>
      <p className="container bt-data-disclaimer">Catatan: data awal berasal dari spreadsheet dan belum merupakan jaminan kecocokan part maupun validasi harga pasar. Mata uang dan tanggal harga belum tercantum pada sumber.</p>
    </section>
  )
}
