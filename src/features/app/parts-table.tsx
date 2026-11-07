import { DataTable, type DataTableColumn } from "@/components/common/data-table"
import { type SparePart } from "@/data/parts"

const numberFormat = new Intl.NumberFormat("id-ID")

function formatPrice(price: string | null) {
  if (price === null) return "—"
  const amount = Number(price)
  return Number.isFinite(amount) ? numberFormat.format(amount) : price
}

function getStatusClass(status: string | null) {
  if (status === "Available") return "parts-status parts-status-available"
  if (status === "Part Price Not Available") return "parts-status parts-status-warning"
  return "parts-status parts-status-neutral"
}

const columns: DataTableColumn<SparePart>[] = [
  {
    key: "partNameOriginal",
    label: "Nama komponen",
    sortValue: (part) => part.partNameOriginal,
    cellClassName: "parts-name-cell",
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
    render: (part) => <span className="parts-vehicle-ref">{part.hyundaiType}</span>,
  },
  {
    key: "brand",
    label: "Brand kendaraan",
    sortValue: (part) => part.brand,
    render: (part) => <><strong className="parts-brand">{part.brand}</strong><span className="parts-vehicle-model">{part.vehicleType}</span></>,
  },
  {
    key: "partNumber",
    label: "Part number",
    sortValue: (part) => part.partNumber,
    render: (part) => <code className="parts-number">{part.partNumber ?? "—"}</code>,
  },
  {
    key: "partGroup",
    label: "Klasifikasi",
    sortValue: (part) => part.partGroup,
    render: (part) => <><strong className="parts-group">{part.partGroup ?? "—"}</strong><span className="parts-category">{part.category ?? ""}</span></>,
  },
  {
    key: "estimatedMoving",
    label: "Est. moving",
    sortValue: (part) => part.estimatedMoving,
    render: (part) => (
      <span className={`parts-moving parts-moving-${(part.estimatedMoving ?? "unknown").toLowerCase()}`}>
        {part.estimatedMoving ?? "—"}
      </span>
    ),
  },
  {
    key: "price",
    label: "Harga*",
    sortValue: (part) => part.price === null ? null : Number(part.price),
    cellClassName: "parts-price",
    render: (part) => formatPrice(part.price),
  },
  {
    key: "partNumberStatus",
    label: "Status",
    sortValue: (part) => part.partNumberStatus,
    render: (part) => <span className={getStatusClass(part.partNumberStatus)}><i aria-hidden="true" />{part.partNumberStatus ?? "—"}</span>,
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
