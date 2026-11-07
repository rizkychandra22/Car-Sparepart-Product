import { useMemo, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import { Brand } from "@/components/common/brand"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PartsFilterPanel, type PartsFilterField, type PartsFilterValues } from "@/features/app/parts-filter-panel"
import { PartsTable } from "@/features/app/parts-table"
import { PARTS, type SparePart } from "@/data/parts"

const numberFormat = new Intl.NumberFormat("id-ID")

function createEmptyFilters(): PartsFilterValues {
  return {
    query: "",
    partNumber: "",
    hyundaiType: "",
    brand: "",
    vehicleType: "",
    partGroup: "",
    category: "",
    estimatedMoving: "",
    partNumberStatus: "",
    priceMin: "",
    priceMax: "",
    hasPrice: false,
    hasNumber: false,
    sort: "default",
  }
}

function getOptions(key: keyof Pick<SparePart, "hyundaiType" | "brand" | "vehicleType" | "partGroup" | "category" | "estimatedMoving" | "partNumberStatus">) {
  return Array.from(new Set(
    PARTS.map((part) => part[key]).filter((value): value is string => typeof value === "string" && value.length > 0)
  )).sort((a, b) => a.localeCompare(b, "id", { sensitivity: "base" }))
}

const filterFields: PartsFilterField[] = [
  { key: "hyundaiType", label: "Hyundai Type (Acuan)", options: getOptions("hyundaiType") },
  { key: "brand", label: "Brand Kendaraan", options: getOptions("brand") },
  { key: "vehicleType", label: "Vehicle Type", options: getOptions("vehicleType") },
  { key: "partGroup", label: "Part Group", options: getOptions("partGroup") },
  { key: "category", label: "Kategori", options: getOptions("category") },
  { key: "estimatedMoving", label: "Est. Moving", options: getOptions("estimatedMoving") },
  { key: "partNumberStatus", label: "Part Number Status", options: getOptions("partNumberStatus") },
]

const sortOptions = [
  ["default", "Urutan sumber Excel"],
  ["name_asc", "Nama komponen A–Z"],
  ["brand_asc", "Brand A–Z"],
  ["price_asc", "Harga terendah"],
  ["price_desc", "Harga tertinggi"],
] as const

function matchesSearch(part: SparePart, query: string) {
  if (!query) return true
  const needle = query.trim().toLocaleLowerCase("id")
  return [part.partNameOriginal, part.partDescriptionCompetitor, part.partNumber]
    .some((value) => value?.toLocaleLowerCase("id").includes(needle))
}

function filterParts(filters: PartsFilterValues) {
  const filtered = PARTS.filter((part) => {
    if (!matchesSearch(part, filters.query)) return false
    if (filters.partNumber && !part.partNumber?.toLowerCase().includes(filters.partNumber.trim().toLowerCase())) return false
    if (filters.hyundaiType && part.hyundaiType !== filters.hyundaiType) return false
    if (filters.brand && part.brand !== filters.brand) return false
    if (filters.vehicleType && part.vehicleType !== filters.vehicleType) return false
    if (filters.partGroup && part.partGroup !== filters.partGroup) return false
    if (filters.category && part.category !== filters.category) return false
    if (filters.estimatedMoving && part.estimatedMoving !== filters.estimatedMoving) return false
    if (filters.partNumberStatus && part.partNumberStatus !== filters.partNumberStatus) return false
    if (filters.hasPrice && part.price === null) return false
    if (filters.hasNumber && !part.partNumber) return false

    const price = part.price === null ? null : Number(part.price)
    if (filters.priceMin && (price === null || price < Number(filters.priceMin))) return false
    if (filters.priceMax && (price === null || price > Number(filters.priceMax))) return false
    return true
  })

  switch (filters.sort) {
    case "name_asc":
      return filtered.sort((a, b) => a.partNameOriginal.localeCompare(b.partNameOriginal, "id", { numeric: true, sensitivity: "base" }))
    case "brand_asc":
      return filtered.sort((a, b) => a.brand.localeCompare(b.brand, "id", { numeric: true, sensitivity: "base" }))
    case "price_asc":
    case "price_desc": {
      const direction = filters.sort === "price_asc" ? 1 : -1
      return filtered.sort((a, b) => {
        if (a.price === null) return b.price === null ? 0 : 1
        if (b.price === null) return -1
        return (Number(a.price) - Number(b.price)) * direction
      })
    }
    default:
      return filtered
  }
}

function countActiveFilters(filters: PartsFilterValues) {
  return [
    filters.partNumber,
    filters.hyundaiType,
    filters.brand,
    filters.vehicleType,
    filters.partGroup,
    filters.category,
    filters.estimatedMoving,
    filters.partNumberStatus,
    filters.priceMin,
    filters.priceMax,
    filters.hasPrice,
    filters.hasNumber,
  ].filter(Boolean).length
}

export default function PartsPage() {
  const [draftFilters, setDraftFilters] = useState(createEmptyFilters)
  const [appliedFilters, setAppliedFilters] = useState(createEmptyFilters)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const visibleParts = useMemo(() => filterParts(appliedFilters), [appliedFilters])
  const activeCount = countActiveFilters(appliedFilters)

  function updateDraft<K extends keyof PartsFilterValues>(key: K, value: PartsFilterValues[K]) {
    setDraftFilters((current) => ({ ...current, [key]: value }))
  }

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAppliedFilters(draftFilters)
    setIsFilterOpen(false)
  }

  function resetFilters() {
    const empty = createEmptyFilters()
    setDraftFilters(empty)
    setAppliedFilters(empty)
    setIsFilterOpen(false)
  }

  function updateSort(sort: string) {
    updateDraft("sort", sort)
    setAppliedFilters((current) => ({ ...current, sort }))
  }

  return (
    <>
      <header className="site-header is-app-header">
        <div className="container header-inner">
          <Brand />
          <nav className="app-nav" aria-label="Navigasi workspace">
            <span className="app-nav-current"><span className="nav-square" aria-hidden="true" />Master Data Spare Parts</span>
          </nav>
          <div className="account-area">
            <div className="account-avatar" aria-hidden="true">A</div>
            <span className="account-label">Administrator</span>
            <Link to="/login" className="account-logout">Keluar <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </header>

      <section className="catalog-heading">
        <div className="container catalog-heading-inner">
          <div>
            <div className="catalog-kicker">WORKSPACE / DATA EXPLORER <span>01</span></div>
            <h1>Master Data <em>Spare Parts.</em></h1>
            <p>Jelajahi katalog referensi spare part menggunakan pencarian dan filter multi-kriteria.</p>
          </div>
          <div className="catalog-heading-detail">
            <span>DATA SOURCE</span>
            <strong>part_master_data.xlsx</strong>
            <small>{numberFormat.format(PARTS.length)} original records</small>
          </div>
        </div>
      </section>

      <main className="page-parts">
        <section className="catalog-main">
          <div className="container">
            <div className="catalog-mobile-controls">
              <Button className="button button-ink button-sm" type="button" aria-expanded={isFilterOpen} aria-controls="catalog-sidebar" onClick={() => setIsFilterOpen(true)}>
                Filter{activeCount ? ` (${activeCount})` : ""}
              </Button>
              <span>{numberFormat.format(visibleParts.length)} hasil</span>
            </div>
            <div className="catalog-backdrop" hidden={!isFilterOpen} onClick={() => setIsFilterOpen(false)} aria-hidden="true" />

            <form className="catalog-layout" onSubmit={applyFilters}>
              <PartsFilterPanel
                values={draftFilters}
                fields={filterFields}
                activeCount={activeCount}
                isOpen={isFilterOpen}
                onChange={updateDraft}
                onClose={() => setIsFilterOpen(false)}
                onReset={resetFilters}
              />

              <div className="catalog-results">
                <div className="result-toolbar">
                  <div className="toolbar-search">
                    <Search aria-hidden="true" />
                    <Input
                      type="search"
                      aria-label="Cari nama, deskripsi, atau nomor part"
                      placeholder="Cari nama part, deskripsi, atau nomor part..."
                      value={draftFilters.query}
                      onChange={(event) => updateDraft("query", event.target.value)}
                    />
                    <Button type="submit">Cari <span aria-hidden="true">↗</span></Button>
                  </div>
                  <div className="toolbar-sort">
                    <label htmlFor="sort">Urutkan</label>
                    <select id="sort" value={draftFilters.sort} onChange={(event) => updateSort(event.target.value)}>
                      {sortOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="results-summary">
                  <div>
                    <div className="results-title">Hasil pencarian <span className="result-count">{numberFormat.format(visibleParts.length)}</span></div>
                    <p>Menampilkan data sesuai pencarian dan filter aktif.</p>
                  </div>
                  <span className="result-meta">SOURCE MATCHED RECORDS</span>
                </div>

                <PartsTable parts={visibleParts} />
                <p className="data-footnote">* Nilai harga mengikuti file Excel sumber. Mata uang, tanggal survei, dan status kompatibilitas spare part belum diverifikasi; data tidak boleh dianggap penawaran harga pasar terkini.</p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="container">PARTSCOPE MVP · Data demonstrasi diimpor dari Excel · Sumber harga belum mencantumkan mata uang dan tanggal.</div>
      </footer>
    </>
  )
}
