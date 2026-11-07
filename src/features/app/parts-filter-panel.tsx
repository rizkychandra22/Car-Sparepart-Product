import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface PartsFilterValues {
  query: string
  partNumber: string
  hyundaiType: string
  brand: string
  vehicleType: string
  partGroup: string
  category: string
  estimatedMoving: string
  partNumberStatus: string
  priceMin: string
  priceMax: string
  hasPrice: boolean
  hasNumber: boolean
  sort: string
}

export interface PartsFilterField {
  key: keyof Pick<PartsFilterValues, "hyundaiType" | "brand" | "vehicleType" | "partGroup" | "category" | "estimatedMoving" | "partNumberStatus">
  label: string
  options: string[]
}

interface PartsFilterPanelProps {
  values: PartsFilterValues
  fields: PartsFilterField[]
  activeCount: number
  isOpen: boolean
  onChange: <K extends keyof PartsFilterValues>(key: K, value: PartsFilterValues[K]) => void
  onClose: () => void
  onReset: () => void
}

export function PartsFilterPanel({ values, fields, activeCount, isOpen, onChange, onClose, onReset }: PartsFilterPanelProps) {
  return (
    <aside className={`filter-panel${isOpen ? " is-open" : ""}`} id="catalog-sidebar" aria-label="Filter pencarian">
      <div className="filter-head">
        <div>
          <span className="filter-label">SEARCH PARAMETERS</span>
          <h2>Filter data <span>{activeCount}</span></h2>
        </div>
        <button className="filter-close" type="button" onClick={onClose} aria-label="Tutup filter">×</button>
      </div>

      <div className="filter-section">
        <label className="filter-section-label" htmlFor="part_number">Nomor part</label>
        <Input id="part_number" className="filter-control" type="search" value={values.partNumber} placeholder="Contoh: 86521I7700" onChange={(event) => onChange("partNumber", event.target.value)} />
      </div>

      {fields.map((field) => (
        <div className="filter-section" key={field.key}>
          <label className="filter-section-label" htmlFor={field.key}>{field.label}</label>
          <div className="select-wrap">
            <select id={field.key} className="filter-control" value={values[field.key]} onChange={(event) => onChange(field.key, event.target.value)}>
              <option value="">Semua {field.label}</option>
              {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>
      ))}

      <div className="filter-section">
        <span className="filter-section-label">Rentang harga sumber</span>
        <div className="price-inputs">
          <Input className="filter-control" type="number" min="0" step="0.000001" value={values.priceMin} placeholder="Min" aria-label="Harga minimum" onChange={(event) => onChange("priceMin", event.target.value)} />
          <span>–</span>
          <Input className="filter-control" type="number" min="0" step="0.000001" value={values.priceMax} placeholder="Maks" aria-label="Harga maksimum" onChange={(event) => onChange("priceMax", event.target.value)} />
        </div>
      </div>

      <div className="filter-section filter-checks">
        <label><input type="checkbox" checked={values.hasPrice} onChange={(event) => onChange("hasPrice", event.target.checked)} /><span>Hanya yang memiliki harga</span></label>
        <label><input type="checkbox" checked={values.hasNumber} onChange={(event) => onChange("hasNumber", event.target.checked)} /><span>Hanya yang memiliki nomor part</span></label>
      </div>

      <div className="filter-actions">
        <Button className="button button-ink filter-submit" type="submit">Terapkan filter <span aria-hidden="true">↗</span></Button>
        <button className="reset-link" type="button" onClick={onReset}>↺ Reset semua filter</button>
      </div>
    </aside>
  )
}
