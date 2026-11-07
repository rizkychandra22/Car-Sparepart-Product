import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

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
    <Card className={`filter-panel gap-0 ring-0${isOpen ? " is-open" : ""}`} id="catalog-sidebar" role="complementary" aria-label="Filter pencarian">
      <div className="filter-head">
        <div>
          <span className="filter-label">SEARCH PARAMETERS</span>
          <h2>Filter data <Badge variant="secondary">{activeCount}</Badge></h2>
        </div>
        <Button variant="ghost" size="icon-sm" className="filter-close border-0 bg-transparent p-0 shadow-none hover:bg-transparent" type="button" onClick={onClose} aria-label="Tutup filter">
          <X aria-hidden="true" />
        </Button>
      </div>

      <div className="filter-section">
        <Label className="filter-section-label" htmlFor="part_number">Nomor part</Label>
        <Input id="part_number" className="filter-control" type="search" value={values.partNumber} placeholder="Contoh: 86521I7700" onChange={(event) => onChange("partNumber", event.target.value)} />
      </div>

      {fields.map((field) => (
        <div className="filter-section" key={field.key}>
          <Label className="filter-section-label" htmlFor={field.key}>{field.label}</Label>
          <div className="select-wrap">
            <Select value={values[field.key] || "all"} onValueChange={(value) => onChange(field.key, value === "all" ? "" : value)}>
              <SelectTrigger id={field.key} className="filter-control parts-filter-select" size="sm">
                <SelectValue placeholder={`Semua ${field.label}`} />
              </SelectTrigger>
              <SelectContent className="parts-select-content">
                <SelectItem className="parts-select-item" value="all">Semua {field.label}</SelectItem>
                {field.options.map((option) => <SelectItem className="parts-select-item" key={option} value={option}>{option}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}

      <div className="filter-section">
        <Label className="filter-section-label">Rentang harga sumber</Label>
        <div className="price-inputs">
          <Input className="filter-control" type="number" min="0" step="0.000001" value={values.priceMin} placeholder="Min" aria-label="Harga minimum" onChange={(event) => onChange("priceMin", event.target.value)} />
          <span>–</span>
          <Input className="filter-control" type="number" min="0" step="0.000001" value={values.priceMax} placeholder="Maks" aria-label="Harga maksimum" onChange={(event) => onChange("priceMax", event.target.value)} />
        </div>
      </div>

      <div className="filter-section filter-checks">
        <label><Checkbox id="has-price" checked={values.hasPrice} onCheckedChange={(checked) => onChange("hasPrice", checked === true)} /><span>Hanya yang memiliki harga</span></label>
        <label><Checkbox id="has-number" checked={values.hasNumber} onCheckedChange={(checked) => onChange("hasNumber", checked === true)} /><span>Hanya yang memiliki nomor part</span></label>
      </div>

      <div className="filter-actions">
        <Button className="button button-ink filter-submit" type="submit">Terapkan filter <span aria-hidden="true">↗</span></Button>
        <Button variant="link" className="reset-link" type="button" onClick={onReset}>↺ Reset semua filter</Button>
      </div>
    </Card>
  )
}
