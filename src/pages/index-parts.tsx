import { useMemo, useState, type FormEvent } from "react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { Search, X } from "lucide-react"
import { Brand } from "@/components/common/brand"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

  function updateQuery(query: string) {
    updateDraft("query", query)
    setAppliedFilters((current) => ({ ...current, query }))
  }

  return (
    <>
      <header className="relative z-40 h-[73px] border-b border-[#ecf0f2] bg-white max-[740px]:h-[67px]">
        <div className={cn(`
          container header-inner w-[min(calc(100%_-_72px),var(--max))] mx-auto max-[1160px]:w-[min(calc(100%_-_52px),var(--max))]
          max-[740px]:w-[min(calc(100%_-_36px),var(--max))] flex justify-between gap-[12px] h-full
          items-center gap-[24px] max-[740px]:gap-[12px]
        `)}>
          <Brand variant="app" />
          <nav className={cn(`
            app-nav mr-[auto] ml-[8%] max-[740px]:hidden
          `)} aria-label="Navigasi workspace">
            <span className={cn(`
              app-nav-current text-[12px] font-[790] text-[#21384b] flex
              items-center gap-[9px]
            `)}><span className={cn(`
              nav-square w-[7px] h-[7px] bg-[#57b39a] rounded-[2px]
            `)} aria-hidden="true" />Master Data Spare Parts</span>
          </nav>
          <div className={cn(`
            account-area flex gap-[12px] items-center [&_form]:ml-[14px]
            max-[740px]:gap-[7px] max-[740px]:[&_form]:ml-[2px]
          `)}>
            <Avatar className={cn(`
              account-avatar w-[35px] h-[35px] bg-[#e3efe9] rounded-full
              grid place-items-center text-[12px] text-[#3c776c] font-[850]
            `)} aria-hidden="true"><AvatarFallback>A</AvatarFallback></Avatar>
            <span className={cn(`
              account-label text-[12px] font-[750] whitespace-nowrap max-[1160px]:hidden
            `)}>Administrator</span>
            <Link to="/login" className={cn(`
              account-logout bg-[none] [border:0] text-[#788d9b] text-[11px]
              font-extrabold [&:hover]:text-[#397b69] max-[740px]:text-[10px]
            `)}>Keluar <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </header>

      <section className={cn(`
        catalog-heading bg-[#0b1b2d] text-white p-[50px_0_44px] relative
        overflow-hidden [&::before]:[content:""] [&::before]:absolute [&::before]:[inset:0] [&::before]:bg-[radial-gradient(ellipse_36%_120%_at_90%_60%,#1a4550,transparent)]
        [&::before]:opacity-[.55] [&::before]:pointer-events-none [&_h1]:text-[clamp(35px,4vw,53px)] [&_h1]:tracking-[-.065em] [&_h1]:leading-[1.2]
        [&_h1]:m-[0_0_9px] [&_h1_em]:not-italic [&_h1_em]:text-[var(--lime)] [&_p]:text-[13px] [&_p]:text-[#a0b5c3]
        [&_p]:m-0 [&_p]:leading-[1.8] max-[740px]:p-[35px_0] max-[740px]:[&_h1]:text-[36px] max-[740px]:[&_p]:text-[12px]
      `)}>
        <div className={cn(`
          container catalog-heading-inner w-[min(calc(100%_-_72px),var(--max))] mx-auto max-[1160px]:w-[min(calc(100%_-_52px),var(--max))]
          max-[740px]:w-[min(calc(100%_-_36px),var(--max))] flex justify-between gap-[12px] items-end
          gap-[25px] relative
        `)}>
          <div>
            <div className={cn(`
              catalog-kicker text-[10px] font-black tracking-[2.2px] text-[var(--lime)]
              mb-[15px] [&_span]:text-[#7a98a7] [&_span]:ml-[8px]
            `)}>WORKSPACE / DATA EXPLORER <span>01</span></div>
            <h1>Master Data <em>Spare Parts.</em></h1>
            <p>Jelajahi katalog referensi spare part menggunakan pencarian dan filter multi-kriteria.</p>
          </div>
          <div className={cn(`
            catalog-heading-detail flex flex-col gap-[7px] [border-left:1px_solid_#3e5365]
            p-[5px_0_5px_25px] [&_span]:text-[#91aaae] [&_span]:tracking-[2px] [&_span]:text-[9px] [&_span]:font-black
            [&_strong]:text-[13px] [&_strong]:tracking-[-.02em] [&_small]:text-[#6e9d9a] [&_small]:text-[11px] max-[740px]:hidden
          `)}>
            <span>DATA SOURCE</span>
            <strong>part_master_data.xlsx</strong>
            <small>{numberFormat.format(PARTS.length)} original records</small>
          </div>
        </div>
      </section>

      <main className={cn(`
        page-parts bg-[var(--bg)]
      `)}>
        <section className={cn(`
          catalog-main p-[31px_0_90px]
        `)}>
          <div className={cn(`
            container w-[min(calc(100%_-_72px),var(--max))] mx-auto max-[1160px]:w-[min(calc(100%_-_52px),var(--max))] max-[740px]:w-[min(calc(100%_-_36px),var(--max))]
            flex justify-between gap-[12px]
          `)}>
            <div className={cn(`
              catalog-backdrop max-[900px]:fixed max-[900px]:[inset:0] max-[900px]:bg-[#091927aa] max-[900px]:z-[80]
            `)} hidden={!isFilterOpen} onClick={() => setIsFilterOpen(false)} aria-hidden="true" />

            <form className={cn(`
              catalog-layout grid grid-cols-[270px_minmax(0,1fr)] items-start gap-[20px]
              max-[1160px]:grid-cols-[245px_minmax(0,1fr)] max-[900px]:block
            `)} onSubmit={applyFilters}>
              <PartsFilterPanel
                values={draftFilters}
                fields={filterFields}
                activeCount={activeCount}
                isOpen={isFilterOpen}
                onChange={updateDraft}
                onClose={() => setIsFilterOpen(false)}
                onReset={resetFilters}
              />

              <div className={cn(`
                catalog-results min-w-[0]
              `)}>
                <Card className={cn(`
                  result-toolbar gap-0 ring-0 bg-[#fff] [border:1px_solid_#e3ebed]
                  rounded-[10px] p-[17px_18px] flex items-center gap-[17px]
                  justify-between mb-[18px] max-[900px]:gap-[11px] max-[740px]:flex-col max-[740px]:items-stretch
                  max-[740px]:p-[13px] flex-row [&_.toolbar-search]:h-[42px] [&_.toolbar-search]:gap-[13px] [&_.toolbar-search]:p-[0_12px_0_16px]
                  [&_.toolbar-search]:[border:1px_solid_#dce6e7] [&_.toolbar-search]:rounded-[7px] [&_.toolbar-search]:bg-[#fff] [&_.toolbar-search]:transition-[border-color_.18s_ease,box-shadow_.18s_ease] [&_.toolbar-search:focus-within]:border-[#91c8b7]
                  [&_.toolbar-search:focus-within]:shadow-[0_0_0_3px_#bcead633] [&_.toolbar-search_input]:w-[0] [&_.toolbar-search_input]:[flex:1_1_0%] [&_.toolbar-search_input]:h-full [&_.toolbar-search_input]:min-w-[0]
                  [&_.toolbar-search_input]:p-0 [&_.toolbar-search_input]:[border:0] [&_.toolbar-search_input]:rounded-none [&_.toolbar-search_input]:bg-transparent [&_.toolbar-search_input]:shadow-none
                  [&_.toolbar-search_input]:outline-none [&_.toolbar-search_input]:text-[13px] [&_.toolbar-search_input:focus]:[border:0] [&_.toolbar-search_input:focus]:shadow-none [&_.toolbar-search_input:focus]:outline-none
                  [&_.toolbar-search_input:focus-visible]:[border:0] [&_.toolbar-search_input:focus-visible]:shadow-none [&_.toolbar-search_input:focus-visible]:outline-none [&_.toolbar-search>svg]:w-[19px] [&_.toolbar-search>svg]:h-[19px]
                  max-[760px]:flex-col max-[760px]:items-stretch max-[760px]:gap-[10px] max-[760px]:p-[10px_12px] max-[760px]:[&_.toolbar-search]:w-full
                  max-[760px]:[&_.toolbar-search]:h-[42px] max-[760px]:[&_.toolbar-search]:[flex:none] max-[760px]:[&_.toolbar-sort]:[order:2] max-[760px]:[&_.toolbar-sort]:[align-self:auto] max-[760px]:[&_.toolbar-sort]:justify-between
                  max-[760px]:[&_.toolbar-sort]:gap-[7px] max-[760px]:[&_.toolbar-sort]:[flex:1_1_0] max-[760px]:[&_.toolbar-sort]:w-[0] max-[760px]:[&_.toolbar-sort]:min-w-[0] max-[760px]:[&_.toolbar-sort_label]:hidden
                  max-[760px]:[&_.toolbar-sort_[data-slot=select-trigger]]:[flex:1] max-[760px]:[&_.toolbar-sort_[data-slot=select-trigger]]:w-full max-[760px]:[&_.toolbar-sort_[data-slot=select-trigger]]:min-w-[0] max-[760px]:[&_.toolbar-sort_[data-slot=select-trigger]]:max-w-[none] max-[760px]:[&_.toolbar-sort_[data-slot=select-trigger]]:h-[37px]
                  max-[760px]:[&_.toolbar-sort_[data-slot=select-trigger]]:min-h-[37px]
                `)}>
                  <div className={cn(`
                    toolbar-search [&_input:focus]:border-[#77bfa2] [&_input:focus]:shadow-[0_0_0_3px_#bcead633] [flex:1] flex
                    items-center gap-[12px] min-w-[0] [border:1px_solid_#e0e9e9] rounded-[7px]
                    h-[44px] pl-[14px] [&>span]:text-[25px] [&>span]:text-[#409e88] [&>span]:leading-[1]
                    [&_input]:[flex:1] [&_input]:min-w-[0] [&_input]:[border:0] [&_input]:[outline:0] [&_input]:h-full
                    [&_input]:text-[12px] [&_input]:text-[#203b4d] [&_input::placeholder]:text-[#a3b3bc] [&_button]:[align-self:stretch] [&_button]:bg-[#e5f5ed]
                    [&_button]:text-[#2d7365] [&_button]:[border:0] [&_button]:[border-left:1px_solid_#d6e9de] [&_button]:rounded-[0_6px_6px_0] [&_button]:p-[0_17px]
                    [&_button]:text-[11px] [&_button]:font-[850] [&_button:hover]:bg-[#d4ebdc] max-[740px]:w-full max-[740px]:[&_input]:text-[11px]
                    [&>svg]:w-[16px] [&>svg]:h-[16px] [&>svg]:shrink-0 [&>svg]:text-[#409e88] [&_.toolbar-search-clear]:grid
                    [&_.toolbar-search-clear]:place-items-center [&_.toolbar-search-clear]:[align-self:center] [&_.toolbar-search-clear]:w-[28px] [&_.toolbar-search-clear]:h-[28px] [&_.toolbar-search-clear]:mr-[7px]
                    [&_.toolbar-search-clear]:p-0 [&_.toolbar-search-clear]:[border:0] [&_.toolbar-search-clear]:rounded-full [&_.toolbar-search-clear]:bg-transparent [&_.toolbar-search-clear]:text-[#81949d]
                    [&_.toolbar-search-clear]:shadow-none [&_.toolbar-search-clear]:cursor-pointer [&_.toolbar-search-clear:hover]:bg-[#eff5f3] [&_.toolbar-search-clear:hover]:text-[#3d7368] [&_.toolbar-search-clear_svg]:w-[15px]
                    [&_.toolbar-search-clear_svg]:h-[15px]
                  `)}>
                    <Search aria-hidden="true" />
                    <Input
                      type="search"
                      aria-label="Cari nama, deskripsi, atau nomor part"
                      placeholder="Cari nama part, deskripsi, atau nomor part..."
                      value={draftFilters.query}
                      onChange={(event) => updateQuery(event.target.value)}
                    />
                    {draftFilters.query && (
                      <Button variant="ghost" size="icon-sm" className="toolbar-search-clear" type="button" aria-label="Hapus keyword pencarian" onClick={() => updateQuery("")}>
                        <X aria-hidden="true" />
                      </Button>
                    )}
                  </div>
                  <div className={cn(`
                    toolbar-controls-row flex items-center gap-[12px] max-[760px]:w-full
                    max-[760px]:[justify-content:stretch] max-[760px]:gap-[8px]
                  `)}>
                    <Button
                      className={cn(`
                        catalog-toolbar-filter button button-ink button-sm hidden
                        max-[760px]:inline-flex max-[760px]:[order:1] max-[760px]:[flex:1_1_0] max-[760px]:w-[0] max-[760px]:min-h-[37px]
                        max-[760px]:h-[37px] max-[760px]:justify-center inline-flex items-center justify-between
                        gap-[24px] [border:1px_solid_transparent] rounded-[7px] p-[14px_20px] font-[730]
                        text-[13px] tracking-[-.015em] whitespace-nowrap transition-[transform_.16s,background_.16s,box-shadow_.16s] [&:hover]:[transform:translateY(-2px)]
                        [&_span]:text-[17px] max-[740px]:px-[15px] max-[740px]:text-[12px] max-[740px]:gap-[11px] max-[410px]:px-[11px]
                        max-[410px]:text-[11px] bg-[var(--ink)] text-[#fff] [&:hover]:bg-[#1d3756] [&:hover]:shadow-[0_8px_23px_#0d233122]
                        min-h-[37px] p-[10px_15px] text-[11px]
                      `)}
                      type="button"
                      aria-expanded={isFilterOpen}
                      aria-controls="catalog-sidebar"
                      onClick={() => setIsFilterOpen(true)}
                    >
                      Filter{activeCount ? ` (${activeCount})` : ""}
                    </Button>
                    <div className="toolbar-sort">
                      <label htmlFor="sort">Urutkan</label>
                      <Select value={draftFilters.sort} onValueChange={updateSort}>
                        <SelectTrigger id="sort" className="toolbar-sort-select" size="sm"><SelectValue /></SelectTrigger>
                        <SelectContent className={cn(`
                          parts-select-content p-[4px] [border:1px_solid_#dfe8e9] rounded-[6px] bg-[#fff]
                          shadow-[0_8px_20px_#18304418]
                        `)}>
                          {sortOptions.map(([value, label]) => <SelectItem className={cn(`
                            parts-select-item min-h-[32px] rounded-none text-[#30495a] text-[12px]
                            [&[data-highlighted]]:bg-[#edf5f1] [&[data-highlighted]]:text-[#214c42]
                          `)} key={value} value={value}>{label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>

                <div className="results-summary">
                  <div>
                    <div className="results-title">Hasil pencarian <Badge variant="secondary" className="result-count">{numberFormat.format(visibleParts.length)}</Badge></div>
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
        <div className={cn(`
          container w-[min(calc(100%_-_72px),var(--max))] mx-auto max-[1160px]:w-[min(calc(100%_-_52px),var(--max))] max-[740px]:w-[min(calc(100%_-_36px),var(--max))]
          flex justify-between gap-[12px]
        `)}>PARTSCOPE MVP · Data demonstrasi diimpor dari Excel · Sumber harga belum mencantumkan mata uang dan tanggal.</div>
      </footer>
    </>
  )
}
