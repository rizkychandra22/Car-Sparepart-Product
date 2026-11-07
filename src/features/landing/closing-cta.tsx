import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function ClosingCta() {
  return (
    <section className="bt-footer-cta">
      <div className="container bt-footer-cta-inner">
        <div><span>READY TO DISCOVER?</span><h2>Temukan informasi part<br />yang Anda butuhkan.</h2></div>
        <Button asChild className="bt-btn bt-btn-dark border-0 shadow-none hover:bg-transparent">
          <Link to="/login">Buka master data <ArrowUpRight aria-hidden="true" /></Link>
        </Button>
      </div>
      <p className="container bt-data-disclaimer">Catatan: data awal berasal dari spreadsheet dan belum merupakan jaminan kecocokan part maupun validasi harga pasar. Mata uang dan tanggal harga belum tercantum pada sumber.</p>
    </section>
  )
}
