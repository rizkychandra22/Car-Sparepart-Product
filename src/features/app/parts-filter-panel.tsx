import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
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
    <Card
      className={cn(
        `filter-panel gap-0 ring-0 bg-white border border-[#e2e9eb] rounded-[11px] p-[22px_19px_20px] shadow-[0_8px_26px_#13344206]
         max-[900px]:fixed max-[900px]:inset-y-0 max-[900px]:left-0 max-[900px]:w-[min(350px,91vw)]
         max-[900px]:z-[90] max-[900px]:overflow-y-auto max-[900px]:rounded-none max-[900px]:border-r max-[900px]:border-[#e2e9eb]
         max-[900px]:shadow-none max-[900px]:transition-transform max-[900px]:duration-200
         max-[760px]:[scrollbar-width:none] max-[760px]:[-ms-overflow-style:none] max-[760px]:[&::-webkit-scrollbar]:hidden`,
        isOpen
          ? "max-[900px]:translate-x-0"
          : "max-[900px]:-translate-x-[120%] max-[900px]:pointer-events-none max-[900px]:invisible",
      )}
      id="catalog-sidebar"
      role="complementary"
      aria-label="Filter pencarian"
    >
      <div className="filter-head mb-[15px] flex items-center justify-between border-b border-[#e9eff0] pb-[20px]">
        <div>
          <span className="filter-label text-[8px] font-black tracking-[1.8px] text-[#8ca2ae]">SEARCH PARAMETERS</span>
          <h2 className="mt-[6px] mb-0 text-[19px] font-extrabold tracking-[-.04em] text-[#183044] flex items-center">
            Filter data
            <Badge
              variant="secondary"
              className="ml-[6px] inline-grid size-auto place-items-center align-middle rounded-[4px] bg-[#e5f3ed] px-[7px] py-[3px] text-[10px] text-[#387b6c] border-0 font-extrabold"
            >
              {activeCount}
            </Badge>
          </h2>
        </div>
        <Button variant="ghost" size="icon-sm" className="filter-close hidden border-0 bg-transparent p-0 text-[27px] text-[#5e777c] shadow-none hover:bg-transparent max-[900px]:grid max-[900px]:place-items-center cursor-pointer" type="button" onClick={onClose} aria-label="Tutup filter">
          <X className="size-5" aria-hidden="true" />
        </Button>
      </div>

      <div className="filter-section py-[11px]">
        <Label className="filter-section-label mb-[10px] block text-[11px] font-extrabold text-[#475d70]" htmlFor="part_number">Nomor part</Label>
        <Input id="part_number" className="filter-control h-[40px] min-w-0 w-full rounded-[6px] border border-[#dfe8e9] bg-[#fafcfc] px-[10px] text-[12px] text-[#1b3549] shadow-none outline-none placeholder:text-[#a4b2b9] focus-visible:border-[#77bfa2] focus-visible:ring-0 focus-visible:shadow-[0_0_0_3px_#bcead633]" type="search" value={values.partNumber} placeholder="Contoh: 86521I7700" onChange={(event) => onChange("partNumber", event.target.value)} />
      </div>

      {fields.map((field) => (
        <div className="filter-section py-[11px]" key={field.key}>
          <Label className="filter-section-label mb-[10px] block text-[11px] font-extrabold text-[#475d70]" htmlFor={field.key}>{field.label}</Label>
          <div className="select-wrap relative">
            <Select value={values[field.key] || "all"} onValueChange={(value) => onChange(field.key, value === "all" ? "" : value)}>
              <SelectTrigger id={field.key} className="filter-control parts-filter-select h-[40px] min-h-[40px] min-w-0 w-full rounded-[6px] border border-[#dfe8e9] bg-[#fafcfc] px-[10px] pr-[25px] text-[12px] font-normal text-[#1b3549] shadow-none focus-visible:border-[#77bfa2] focus-visible:ring-0 focus-visible:shadow-[0_0_0_3px_#bcead633] [&_svg]:size-[16px] [&_svg]:text-[#859ca5]" size="sm">
                <SelectValue placeholder={`Semua ${field.label}`} />
              </SelectTrigger>
              <SelectContent className="parts-select-content p-[4px] border border-[#dfe8e9] rounded-[6px] bg-white shadow-[0_8px_20px_#18304418]">
                <SelectItem className="parts-select-item min-h-[32px] rounded-none text-[#30495a] text-[12px] data-[highlighted]:bg-[#edf5f1] data-[highlighted]:text-[#214c42]" value="all">Semua {field.label}</SelectItem>
                {field.options.map((option) => (
                  <SelectItem className="parts-select-item min-h-[32px] rounded-none text-[#30495a] text-[12px] data-[highlighted]:bg-[#edf5f1] data-[highlighted]:text-[#214c42]" key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}

      <div className="filter-section py-[11px]">
        <Label className="filter-section-label mb-[10px] block text-[11px] font-extrabold text-[#475d70]">Rentang harga sumber</Label>
        <div className="price-inputs flex items-center gap-[5px] [&>span]:text-[#97a8af]">
          <Input className="filter-control h-[40px] min-w-0 w-full rounded-[6px] border border-[#dfe8e9] bg-[#fafcfc] px-[8px] text-[12px] text-[#1b3549] shadow-none placeholder:text-[#a4b2b9] focus-visible:border-[#77bfa2] focus-visible:ring-0 focus-visible:shadow-[0_0_0_3px_#bcead633]" type="number" min="0" step="0.000001" value={values.priceMin} placeholder="Min" aria-label="Harga minimum" onChange={(event) => onChange("priceMin", event.target.value)} />
          <span>–</span>
          <Input className="filter-control h-[40px] min-w-0 w-full rounded-[6px] border border-[#dfe8e9] bg-[#fafcfc] px-[8px] text-[12px] text-[#1b3549] shadow-none placeholder:text-[#a4b2b9] focus-visible:border-[#77bfa2] focus-visible:ring-0 focus-visible:shadow-[0_0_0_3px_#bcead633]" type="number" min="0" step="0.000001" value={values.priceMax} placeholder="Maks" aria-label="Harga maksimum" onChange={(event) => onChange("priceMax", event.target.value)} />
        </div>
      </div>

      <div className="filter-section filter-checks mt-[9px] border-t border-[#edf0f1] pt-[22px] flex flex-col gap-[12px] [&_label]:flex [&_label]:cursor-pointer [&_label]:items-start [&_label]:gap-[9px] [&_label]:text-[11px] [&_label]:font-[650] [&_label]:leading-[1.6] [&_label]:text-[#526977] [&_button]:mt-[3px] [&_button]:size-[13px] [&_button]:rounded-[2px] [&_button]:border-[#bbc6c8] [&_button]:shadow-none">
        <label><Checkbox id="has-price" checked={values.hasPrice} onCheckedChange={(checked) => onChange("hasPrice", checked === true)} /><span>Hanya yang memiliki harga</span></label>
        <label><Checkbox id="has-number" checked={values.hasNumber} onCheckedChange={(checked) => onChange("hasNumber", checked === true)} /><span>Hanya yang memiliki nomor part</span></label>
      </div>

      <div className="filter-actions mt-[14px] flex flex-col gap-[16px] border-t border-[#e9eff0] pt-[18px] text-center">
        <Button className="filter-submit inline-flex h-[43px] min-h-[43px] w-full items-center justify-between gap-[24px] border border-transparent rounded-[7px] px-[20px] font-[730] text-[13px] tracking-[-.015em] whitespace-nowrap bg-[var(--ink)] text-white hover:bg-[#1d3756] hover:shadow-[0_8px_23px_#0d233122] transition-colors cursor-pointer" type="submit">
          Terapkan filter <span aria-hidden="true">↗</span>
        </Button>
        <Button variant="link" className="reset-link h-auto min-h-0 p-0 border-0 bg-transparent shadow-none text-[11px] font-[760] text-[#62928a] hover:text-[#397b69] hover:underline cursor-pointer" type="button" onClick={onReset}>↺ Reset semua filter</Button>
      </div>
    </Card>
  )
}
