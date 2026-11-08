import { useMemo, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Search, X } from "lucide-react"
import { Brand } from "@/components/common/brand"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PartsFilterPanel, type PartsFilterField, type PartsFilterValues } from "@/features/app/parts-filter-panel"
import { PartsTable } from "@/features/app/parts-table"
import { PARTS, type SparePart } from "@/data/parts"
import { cn } from "@/lib/utils"

const numberFormat = new Intl.NumberFormat("id-ID")
const containerClass = "w-[min(calc(100%_-_72px),var(--max))] mx-auto max-[1160px]:w-[min(calc(100%_-_52px),var(--max))] max-[740px]:w-[min(calc(100%_-_36px),var(--max))]"

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
  const [draftFilters, setDraftFilters] = useState<PartsFilterValues>(createEmptyFilters)
  const [appliedFilters, setAppliedFilters] = useState<PartsFilterValues>(createEmptyFilters)
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

  function updateQuery(query: string) {
    updateDraft("query", query)
    setAppliedFilters((current) => ({ ...current, query }))
  }

  return (
    <div className="parts-page min-h-screen w-full max-w-full overflow-x-hidden bg-[#f4f7f7] text-[#183044]">
      <header className="site-header is-app-header relative z-40 h-[73px] border-b border-[#ecf0f2] bg-white max-[740px]:h-[67px]">
        <div className={cn(containerClass, "header-inner flex justify-between h-full items-center gap-[24px] max-[740px]:gap-[12px]")}>
          <Brand variant="app" />
          <nav className="app-nav mr-auto ml-[8%] max-[740px]:hidden" aria-label="Navigasi workspace">
            <span className="app-nav-current text-[12px] font-[790] text-[#21384b] flex items-center gap-[9px]">
              <span className="nav-square w-[7px] h-[7px] bg-[#57b39a] rounded-[2px]" aria-hidden="true" />
              Master Data Spare Parts
            </span>
          </nav>
          <div className="account-area flex gap-[12px] items-center max-[740px]:gap-[7px]">
            <Avatar className="account-avatar size-[35px] bg-[#e3efe9] rounded-full grid place-items-center text-[12px] text-[#3c776c] font-[850]" aria-hidden="true">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <span className="account-label text-[12px] font-[750] whitespace-nowrap max-[1160px]:hidden">Administrator</span>
            <Link to="/login" className="account-logout bg-none border-0 text-[#788d9b] text-[11px] font-extrabold hover:text-[#397b69] max-[740px]:text-[10px]">
              Keluar <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="catalog-heading bg-[#0b1b2d] text-white py-[50px] pb-[44px] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_36%_120%_at_90%_60%,#1a4550,transparent)] before:opacity-55 before:pointer-events-none max-[740px]:py-[35px]">
        <div className={cn(containerClass, "catalog-heading-inner flex justify-between items-end gap-[25px] relative")}>
          <div>
            <div className="catalog-kicker text-[10px] font-black tracking-[2.2px] text-[var(--lime)] mb-[15px]">
              WORKSPACE / DATA EXPLORER <span className="text-[#7a98a7] ml-[8px]">01</span>
            </div>
            <h1 className="text-[clamp(35px,4vw,53px)] max-[740px]:text-[36px] font-bold tracking-[-.065em] leading-[1.2] m-0 mb-[9px]">
              Master Data <em className="not-italic text-[var(--lime)]">Spare Parts.</em>
            </h1>
            <p className="text-[13px] max-[740px]:text-[12px] text-[#a0b5c3] m-0 leading-[1.8]">
              Jelajahi katalog referensi spare part menggunakan pencarian dan filter multi-kriteria.
            </p>
          </div>
          <div className="catalog-heading-detail flex flex-col gap-[7px] border-l border-[#3e5365] py-[5px] pl-[25px] max-[740px]:hidden">
            <span className="text-[#91aaae] tracking-[2px] text-[9px] font-black">DATA SOURCE</span>
            <strong className="text-[13px] tracking-[-.02em]">part_master_data.xlsx</strong>
            <small className="text-[#6e9d9a] text-[11px]">{numberFormat.format(PARTS.length)} original records</small>
          </div>
        </div>
      </section>

      <main className="page-parts bg-[var(--bg)] w-full">
        <section className="catalog-main pt-[31px] pb-[90px]">
          <div className={containerClass}>
            <div
              className="catalog-backdrop fixed inset-0 bg-[#091927aa] z-[80] hidden max-[900px]:block transition-opacity"
              hidden={!isFilterOpen}
              onClick={() => setIsFilterOpen(false)}
              aria-hidden="true"
            />

            <form
              className="catalog-layout grid grid-cols-[270px_minmax(0,1fr)] items-start gap-[20px] max-[1160px]:grid-cols-[245px_minmax(0,1fr)] max-[900px]:block"
              onSubmit={applyFilters}
            >
              <PartsFilterPanel
                values={draftFilters}
                fields={filterFields}
                activeCount={activeCount}
                isOpen={isFilterOpen}
                onChange={updateDraft}
                onClose={() => setIsFilterOpen(false)}
                onReset={resetFilters}
              />

              <div className="catalog-results min-w-0">
                <div className="result-toolbar bg-white border border-[#e3ebed] rounded-[10px] p-[17px_18px] flex flex-row items-center justify-between gap-[17px] mb-[18px] max-[760px]:flex-col max-[760px]:items-stretch max-[760px]:gap-[10px] max-[760px]:p-[10px_12px]">
                  <div className="toolbar-search flex-1 flex items-center gap-[12px] min-w-0 border border-[#dce6e7] rounded-[7px] h-[42px] px-[14px] bg-white transition-[border-color,box-shadow] focus-within:border-[#91c8b7] focus-within:ring-2 focus-within:ring-[#bcead633] max-[760px]:w-full max-[760px]:h-[42px] max-[760px]:flex-none">
                    <Search className="size-[19px] shrink-0 text-[#409e88]" aria-hidden="true" />
                    <input
                      type="search"
                      aria-label="Cari nama, deskripsi, atau nomor part"
                      placeholder="Cari nama part, deskripsi, atau nomor part..."
                      value={draftFilters.query}
                      onChange={(event) => updateQuery(event.target.value)}
                      className="w-full h-full min-w-0 p-0 border-0 bg-transparent text-[13px] text-[#203b4d] placeholder:text-[#a3b3bc] outline-none"
                    />
                    {draftFilters.query && (
                      <button
                        className="toolbar-search-clear grid place-items-center size-[28px] mr-[-4px] p-0 border-0 rounded-full bg-transparent text-[#81949d] hover:bg-[#eff5f3] hover:text-[#3d7368] cursor-pointer"
                        type="button"
                        aria-label="Hapus keyword pencarian"
                        onClick={() => updateQuery("")}
                      >
                        <X className="size-[15px]" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                  <div className="toolbar-controls-row flex items-center gap-[12px] max-[760px]:w-full max-[760px]:justify-stretch max-[760px]:gap-[8px]">
                    <Button
                      className="catalog-toolbar-filter hidden max-[760px]:inline-flex max-[760px]:order-1 max-[760px]:flex-1 max-[760px]:w-0 max-[760px]:min-h-[37px] max-[760px]:h-[37px] max-[760px]:justify-center items-center gap-[8px] bg-[var(--ink)] text-white text-[11px] font-[730] rounded-[7px] border-0 cursor-pointer"
                      type="button"
                      aria-expanded={isFilterOpen}
                      aria-controls="catalog-sidebar"
                      onClick={() => setIsFilterOpen(true)}
                    >
                      Filter{activeCount ? ` (${activeCount})` : ""}
                    </Button>
                    <div className="toolbar-sort flex items-center gap-[10px] max-[760px]:order-2 max-[760px]:flex-1 max-[760px]:w-0 max-[760px]:min-w-0 max-[760px]:justify-between max-[760px]:gap-[7px]">
                      <label htmlFor="sort" className="text-[11px] font-[780] text-[#6e8492] whitespace-nowrap max-[760px]:hidden">Urutkan</label>
                      <Select value={draftFilters.sort} onValueChange={updateSort}>
                        <SelectTrigger id="sort" className="toolbar-sort-select !h-[42px] h-[42px] max-w-[175px] min-w-[175px] border border-[#e1e9e9] rounded-[6px] bg-white px-[9px] text-[#30495a] text-[11px] font-[730] max-[760px]:max-w-none max-[760px]:w-full max-[760px]:min-w-0 max-[760px]:!h-[37px] max-[760px]:h-[37px] max-[760px]:min-h-[37px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="parts-select-content p-[4px] border border-[#dfe8e9] rounded-[6px] bg-white shadow-[0_8px_20px_#18304418]">
                          {sortOptions.map(([value, label]) => (
                            <SelectItem className="parts-select-item min-h-[32px] rounded-none text-[#30495a] text-[12px] data-[highlighted]:bg-[#edf5f1] data-[highlighted]:text-[#214c42]" key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="results-summary flex items-center justify-between m-[23px_2px_14px]">
                  <div>
                    <div className="results-title text-[19px] tracking-[-.03em] text-[#162f44] font-[850] flex items-center gap-[8px]">
                      Hasil pencarian{" "}
                      <Badge variant="secondary" className="result-count text-[10px] px-[7px] py-[4px] rounded-[4px] bg-[#e6f3ee] text-[#377d6d] font-extrabold h-auto border-0 leading-[1.2]">
                        {numberFormat.format(visibleParts.length)}
                      </Badge>
                    </div>
                    <p className="m-0 mt-[7px] text-[11px] text-[#8a9ba4]">Menampilkan data sesuai pencarian dan filter aktif.</p>
                  </div>
                  <span className="result-meta text-[9px] font-[850] tracking-[1.6px] text-[#9cabb0] max-[740px]:hidden">SOURCE MATCHED RECORDS</span>
                </div>

                <PartsTable parts={visibleParts} />
                <p className="data-footnote my-[19px] text-[11px] leading-[1.75] text-[#889fa6]">
                  * Nilai harga mengikuti file Excel sumber. Mata uang, tanggal survei, dan status kompatibilitas spare part belum diverifikasi; data tidak boleh dianggap penawaran harga pasar terkini.
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="app-footer border-t border-[#e2eae9] bg-[#f0f4f3] py-[20px] text-[10px] text-[#8298a1] max-[740px]:leading-[1.8]">
        <div className={cn(containerClass, "text-center")}>
          PARTSCOPE MVP · Data demonstrasi diimpor dari Excel · Sumber harga belum mencantumkan mata uang dan tanggal.
        </div>
      </footer>
    </div>
  )
}
