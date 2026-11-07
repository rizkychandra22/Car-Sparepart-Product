import { Search, SlidersHorizontal, TableProperties } from "lucide-react"

const features = [
  {
    number: "01 / SEARCH",
    title: "Cari spare part",
    description: "Telusuri katalog berdasarkan nama komponen, deskripsi, atau nomor part secara cepat.",
    footer: "KEYWORD SEARCH",
    Icon: Search,
  },
  {
    number: "02 / FILTER",
    title: "Filter multi-kriteria",
    description: "Pilih Hyundai Type, Brand, Vehicle Type, Part Group, kategori, status, atau rentang harga.",
    footer: "PRECISION FILTERS",
    Icon: SlidersHorizontal,
  },
  {
    number: "03 / VIEW",
    title: "Data lengkap dalam tabel",
    description: "Lihat informasi spare part terstruktur, urutkan hasil, dan telusuri referensi setiap baris.",
    footer: "STRUCTURED CATALOG",
    Icon: TableProperties,
  },
]

export function FeaturesSection() {
  return (
    <section className="bt-features" id="fitur" aria-labelledby="features-title">
      <div className="container">
        <div className="bt-section-heading">
          <div><p className="bt-section-eyebrow">01 / PLATFORM CAPABILITIES</p><h2 id="features-title">Pencarian yang <span>lebih cerdas.</span><br />Data yang lebih jelas.</h2></div>
          <p>Tak perlu lagi menelusuri spreadsheet yang panjang. Jelajahi data spare part dalam tampilan yang rapi, dengan filter sesuai atribut dari sumber data.</p>
        </div>
        <div className="bt-feature-grid">
          {features.map(({ number, title, description, footer, Icon }) => (
            <article className="bt-feature" key={number}>
              <div className="bt-feature-top"><span>{number}</span><Icon aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="bt-feature-footer">{footer}<span aria-hidden="true">↗</span></span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
