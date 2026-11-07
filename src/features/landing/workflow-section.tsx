import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

const steps = [
  ["01", "Login ke platform", "Masuk dengan akun yang sudah disediakan administrator."],
  ["02", "Cari berdasarkan kriteria", "Gunakan kata kunci, merek, tipe kendaraan, nomor part, kategori, atau status."],
  ["03", "Tinjau hasil pencarian", "Lihat data dalam tabel, urutkan hasil, dan jelajahi semua record."],
]

export function WorkflowSection() {
  return (
    <section className="bt-workflow" id="alur" aria-labelledby="workflow-title">
      <div className="bt-workflow-graphic" aria-hidden="true" />
      <div className="container bt-workflow-inner">
        <div className="bt-workflow-title">
          <p className="bt-section-eyebrow">02 / HOW IT WORKS</p>
          <h2 id="workflow-title">Dari data mentah<br />menjadi <span>informasi.</span></h2>
          <p>Alur sederhana untuk menampilkan dan menemukan referensi spare part lintas kendaraan.</p>
          <Link to="/login" className="bt-btn bt-btn-primary">Masuk ke sistem <ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <div className="bt-workflow-steps">
          {steps.map(([number, title, description]) => (
            <div key={number}><span>{number}</span><section><h3>{title}</h3><p>{description}</p></section></div>
          ))}
        </div>
      </div>
    </section>
  )
}
