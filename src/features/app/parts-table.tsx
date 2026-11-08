import { DataTable, type DataTableColumn } from "@/components/common/data-table"
import { Badge } from "@/components/ui/badge"
import { type SparePart } from "@/data/parts"
import { cn } from "@/lib/utils"

const numberFormat = new Intl.NumberFormat("id-ID")

function formatPrice(price: string | null) {
  if (price === null) return "—"
  const amount = Number(price)
  return Number.isFinite(amount) ? numberFormat.format(amount) : price
}

function getStatusClass(status: string | null) {
  const base = "parts-status inline-flex h-auto items-center gap-[6px] rounded border-0 px-2 py-[5px] text-[9px] font-[750] leading-[1.1] whitespace-nowrap"
  if (status === "Available") return `${base} bg-[#e4f5ed] text-[#39866c] [&_i]:bg-[#55b58a]`
  if (status === "Part Price Not Available") return `${base} bg-[#fbf2e4] text-[#aa7740] [&_i]:bg-[#daa652]`
  return `${base} bg-[#f0f3f5] text-[#8a9aa2] [&_i]:bg-[#9caab0]`
}

function getMovingClass(value: string | null) {
  if (value === "Fast") return "parts-moving-fast bg-[#e6f4ed] text-[#3e886d]"
  if (value === "Medium") return "parts-moving-medium bg-[#f2f1e8] text-[#8a7e46]"
  return "parts-moving-slow bg-[#edf0f3] text-[#778794]"
}

const columns: DataTableColumn<SparePart>[] = [
  {
    key: "partNameOriginal",
    label: "Nama komponen",
    sortValue: (part) => part.partNameOriginal,
    cellClassName: "parts-name-cell min-w-[150px] lg:min-w-[170px] xl:min-w-[210px] max-w-[260px] whitespace-normal [&_strong]:block [&_span]:block [&_small]:block [&_strong]:text-[#293f50] [&_strong]:text-[11px] [&_strong]:font-extrabold [&_strong]:leading-[1.45] [&_span]:mt-[3px] [&_span]:text-[10px] [&_span]:leading-[1.45] [&_span]:text-[#7d929d] [&_small]:mt-[5px] [&_small]:text-[8px] [&_small]:font-extrabold [&_small]:tracking-[.8px] [&_small]:text-[#a0afb6]",
    render: (part) => (
      <>
        <strong>{part.partNameOriginal}</strong>
        {part.partDescriptionCompetitor && <span>{part.partDescriptionCompetitor}</span>}
        <small>EXCEL ROW {part.sourceExcelRow}</small>
      </>
    ),
  },
  {
    key: "hyundaiType",
    label: "Kendaraan acuan",
    sortValue: (part) => part.hyundaiType,
    render: (part) => (
      <span className="parts-vehicle-ref inline-block px-2 py-[5px] border border-[#e7eded] rounded text-[#556e7c] text-[10px] font-[750] whitespace-nowrap">
        {part.hyundaiType}
      </span>
    ),
  },
  {
    key: "brand",
    label: "Brand kendaraan",
    sortValue: (part) => part.brand,
    render: (part) => (
      <>
        <strong className="parts-brand block text-[#354e60] text-[10px] font-[850]">{part.brand}</strong>
        <span className="parts-vehicle-model block mt-1 text-[#80939e] text-[10px]">{part.vehicleType}</span>
      </>
    ),
  },
  {
    key: "partNumber",
    label: "Part number",
    sortValue: (part) => part.partNumber,
    render: (part) => (
      <code className="parts-number text-[#367968] font-mono text-[10px]">
        {part.partNumber ?? "—"}
      </code>
    ),
  },
  {
    key: "partGroup",
    label: "Klasifikasi",
    sortValue: (part) => part.partGroup,
    render: (part) => (
      <>
        <strong className="parts-group block text-[#354e60] text-[10px] font-[850]">{part.partGroup ?? "—"}</strong>
        <span className="parts-category block mt-1 text-[#80939e] text-[10px]">{part.category ?? ""}</span>
      </>
    ),
  },
  {
    key: "estimatedMoving",
    label: "Est. moving",
    sortValue: (part) => part.estimatedMoving,
    render: (part) => (
      <Badge variant="secondary" className={cn("parts-moving inline-flex h-auto rounded border-0 px-2 py-[5px] text-[9px] font-extrabold leading-[1.1]", getMovingClass(part.estimatedMoving))}>
        {part.estimatedMoving ?? "—"}
      </Badge>
    ),
  },
  {
    key: "price",
    label: "Harga*",
    sortValue: (part) => part.price === null ? null : Number(part.price),
    cellClassName: "parts-price text-right [font-variant-numeric:tabular-nums] font-[750] text-[#40586a]",
    render: (part) => formatPrice(part.price),
  },
  {
    key: "partNumberStatus",
    label: "Status",
    sortValue: (part) => part.partNumberStatus,
    render: (part) => (
      <Badge variant="outline" className={getStatusClass(part.partNumberStatus)}>
        <i className="size-[6px] shrink-0 rounded-full" aria-hidden="true" />
        {part.partNumberStatus ?? "—"}
      </Badge>
    ),
  },
]

export function PartsTable({ parts }: { parts: readonly SparePart[] }) {
  return (
    <DataTable
      data={parts}
      columns={columns}
      getRowKey={(part) => part.sourceExcelRow}
      title="Daftar spare parts"
      eyebrow="MASTER DATA"
      pageSize={10}
      formatCount={(count) => numberFormat.format(count)}
    />
  )
}
