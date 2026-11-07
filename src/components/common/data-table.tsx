import { useMemo, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface DataTableColumn<T> {
  key: string
  label: string
  sortValue: (row: T) => string | number | null
  render: (row: T) => ReactNode
  cellClassName?: string
}

interface DataTableProps<T> {
  data: readonly T[]
  columns: readonly DataTableColumn<T>[]
  getRowKey: (row: T) => string | number
  title: string
  eyebrow?: string
  pageSize?: number
  formatCount?: (count: number) => string
}

function compareValues(left: string | number | null, right: string | number | null) {
  if (left === null || left === "") return right === null || right === "" ? 0 : 1
  if (right === null || right === "") return -1
  if (typeof left === "number" && typeof right === "number") return left - right
  return String(left).localeCompare(String(right), "id", { numeric: true, sensitivity: "base" })
}

export function DataTable<T>({
  data,
  columns,
  getRowKey,
  title,
  eyebrow = "DATA TABLE",
  pageSize = 10,
  formatCount = (count) => count.toLocaleString("id-ID"),
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(pageSize)

  const sortedRows = useMemo(() => {
    if (!sort) return data
    const column = columns.find((item) => item.key === sort.key)
    if (!column) return data
    return [...data].sort((a, b) => {
      const left = column.sortValue(a)
      const right = column.sortValue(b)
      const leftIsEmpty = left === null || left === ""
      const rightIsEmpty = right === null || right === ""
      if (leftIsEmpty !== rightIsEmpty) return leftIsEmpty ? 1 : -1
      const result = compareValues(left, right)
      return result * (sort.direction === "asc" ? 1 : -1)
    })
  }, [columns, data, sort])

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / rowsPerPage))
  const currentPage = Math.min(page, totalPages)
  const pageRows = sortedRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  function handleSort(key: string) {
    setSort((current) => ({
      key,
      direction: current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }))
    setPage(1)
  }

  return (
    <Card className={cn(`
      parts-table-card gap-0 py-0 ring-0 overflow-hidden
      bg-[#fff] [border:1px_solid_#e2e9eb] rounded-[12px] shadow-[0_9px_26px_#12344308] p-0
    `)} role="region" aria-label={title}>
      <CardHeader className={cn(`
        parts-table-card-head flex items-center justify-between p-[22px_24px]
        [border-bottom:1px_solid_#e9eff0] [&_h2]:m-0 [&_h2]:text-[#1e3547] [&_h2]:text-[18px] [&_h2]:font-extrabold
        [&_h2]:tracking-[-.035em]
      `)}>
        <div>
          <p className={cn(`
            parts-table-eyebrow m-[0_0_6px] text-[#8498a2] text-[9px] font-black
            tracking-[1.6px]
          `)}>{eyebrow}</p>
          <CardTitle className={cn(`
            parts-table-title m-0 text-[#1e3547] text-[18px] font-extrabold
            tracking-[-.035em]
          `)} role="heading" aria-level={2}>{title}</CardTitle>
        </div>
        <Badge variant="secondary" className={cn(`
          parts-total-badge h-auto p-[7px_10px] [border:0] rounded-[6px]
          bg-[#e8f4ef] text-[#397d6c] text-[10px] font-extrabold leading-[1.2]
          whitespace-nowrap
        `)}>{formatCount(data.length)} data</Badge>
      </CardHeader>

      <CardContent className={cn(`
        parts-table-scroll p-0 overflow-x-auto
      `)}>
        <Table className={cn(`
          parts-data-table min-w-[1120px] border-collapse [&_thead]:bg-[#f3f6f6] [&_th]:h-[48px]
          [&_th]:p-[0_14px] [&_th]:text-[#788d98] [&_th]:text-[9px] [&_th]:font-[850] [&_th]:tracking-[.55px]
          [&_th]:uppercase [&_th]:whitespace-nowrap [&_th:first-child]:pl-[22px] [&_td:first-child]:pl-[22px] [&_td]:h-[68px]
          [&_td]:p-[12px_14px] [&_td]:[border-top:1px_solid_#edf1f1] [&_td]:text-[#4d6070] [&_td]:text-[11px] [&_td]:align-middle
          [&_td]:whitespace-nowrap [&_tbody_tr]:transition-[background_.15s_ease] [&_tbody_tr:hover]:bg-[#f8fbfa] max-[760px]:min-w-[1080px]
        `)}>
          <TableHeader>
            <TableRow>
              {columns.map((column) => {
                const active = sort?.key === column.key
                const SortIcon = active
                  ? sort?.direction === "asc" ? ArrowUp : ArrowDown
                  : ArrowUpDown

                return (
                  <TableHead
                    key={column.key}
                    aria-sort={active ? sort?.direction === "asc" ? "ascending" : "descending" : "none"}
                  >
                    <button className={cn(`
                      parts-sort-button inline-flex items-center gap-[7px] p-[8px_0]
                      [border:0] bg-transparent text-inherit [font:inherit] tracking-[inherit]
                      normal-case cursor-pointer [&:hover]:text-[#388d7c] [&:focus-visible]:text-[#388d7c] [&:focus-visible]:[outline:2px_solid_#65aa91]
                      [&:focus-visible]:outline-offset-[3px] [&:focus-visible]:rounded-[3px] [&_svg]:w-[13px] [&_svg]:h-[13px] [&_svg]:opacity-[.65]
                    `)} type="button" onClick={() => handleSort(column.key)}>
                      {column.label}<SortIcon aria-hidden="true" />
                    </button>
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.length === 0 ? (
              <TableRow>
                <TableCell className={cn(`
                  parts-empty-cell h-[160px] text-center whitespace-normal text-[#718692]
                  [&_strong]:block [&_span]:block [&_strong]:mb-[6px] [&_strong]:text-[#334d5d] [&_strong]:text-[13px]
                  [&_span]:text-[11px]
                `)} colSpan={columns.length}>
                  <strong>Tidak ada data yang cocok</strong>
                  <span>Coba ubah kata kunci atau kurangi filter yang aktif.</span>
                </TableCell>
              </TableRow>
            ) : pageRows.map((row) => (
              <TableRow key={getRowKey(row)}>
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.cellClassName}>
                    {column.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className={cn(`
        parts-table-footer flex items-center justify-between gap-[12px]
        p-[10px_14px] [border-top:1px_solid_#e9eff0] rounded-none bg-[#fff] max-[760px]:items-stretch
        max-[760px]:flex-col max-[760px]:p-[9px_8px] max-[760px]:gap-[8px]
      `)}>
        <div className={cn(`
          parts-pagination-size flex items-center gap-[9px] text-[#667b88]
          text-[11px] [&_label]:whitespace-nowrap [&_[data-slot=select-trigger]]:w-[86px] [&_[data-slot=select-trigger]]:h-[34px] [&_[data-slot=select-trigger]]:p-[0_25px_0_10px]
          [&_[data-slot=select-trigger]]:[border:1px_solid_#e8e1d8] [&_[data-slot=select-trigger]]:rounded-[9px] [&_[data-slot=select-trigger]]:bg-[#fff] [&_[data-slot=select-trigger]]:text-[#405363] [&_[data-slot=select-trigger]]:[font:inherit]
          [&_[data-slot=select-trigger]]:shadow-[0_2px_5px_#26384a12] [&_[data-slot=select-trigger]]:cursor-pointer max-[760px]:[&_[data-slot=select-trigger]]:w-[62px] max-[760px]:flex-nowrap max-[760px]:gap-[6px]
          max-[760px]:[&_[data-slot=select-trigger]]:h-[26px] max-[760px]:justify-center max-[760px]:text-[9px] max-[760px]:[&_[data-slot=select-trigger]]:p-[0_17px_0_7px] max-[760px]:[&_[data-slot=select-trigger]]:text-[10px]
          max-[760px]:[&_[data-slot=select-trigger]_svg]:w-[12px] max-[760px]:[&_[data-slot=select-trigger]_svg]:h-[12px]
        `)}>
          <label htmlFor="parts-page-size">Tampilkan per halaman</label>
          <Select
            value={String(rowsPerPage)}
            onValueChange={(value) => {
              setRowsPerPage(Number(value))
              setPage(1)
            }}
          >
            <SelectTrigger id="parts-page-size" className={cn(`
              parts-page-size-select w-[86px] max-[760px]:w-[62px] max-[760px]:h-[26px] max-[760px]:p-[0_17px_0_7px]
              max-[760px]:text-[10px]
            `)} size="sm"><SelectValue /></SelectTrigger>
            <SelectContent align="end" className={cn(`
              parts-select-content p-[4px] [border:1px_solid_#dfe8e9] rounded-[6px] bg-[#fff]
              shadow-[0_8px_20px_#18304418]
            `)}>
              {[10, 25, 50, 100].map((size) => <SelectItem className={cn(`
                parts-select-item min-h-[32px] rounded-none text-[#30495a] text-[12px]
                [&[data-highlighted]]:bg-[#edf5f1] [&[data-highlighted]]:text-[#214c42]
              `)} key={size} value={String(size)}>{size}</SelectItem>)}
            </SelectContent>
          </Select>
          <span className={cn(`
            parts-pagination-total flex items-center gap-[7px] pl-[10px]
            [border-left:1px_solid_#e4e9eb] whitespace-nowrap [&_i]:hidden max-[760px]:gap-[5px] max-[760px]:pl-[7px]
          `)}><i aria-hidden="true" />Total {formatCount(sortedRows.length)} data</span>
        </div>
        <div className={cn(`
          parts-pagination-controls flex items-center gap-[9px] text-[#667b88]
          text-[11px] max-[760px]:justify-center max-[760px]:w-full max-[760px]:gap-[7px]
        `)}>
          <span className={cn(`
            parts-pagination-page whitespace-nowrap max-[760px]:text-[9px]
          `)}>Halaman {formatCount(currentPage)} dari {formatCount(totalPages)}</span>
          <nav className={cn(`
            parts-pagination flex items-center gap-[5px] [&_button]:w-[32px]
            [&_button]:h-[32px] [&_button]:border-[#eee7dd] [&_button]:rounded-[9px] [&_button]:bg-[#fff] [&_button]:text-[#6f6659]
            [&_button]:shadow-[0_2px_5px_#26384a10] [&_button:hover:not(:disabled)]:bg-[#faf8f4] [&_button:hover:not(:disabled)]:text-[#27394a] [&_button:disabled]:opacity-[.48] max-[760px]:gap-[4px]
            max-[760px]:[&_button]:w-[24px] max-[760px]:[&_button]:h-[24px] max-[760px]:[&_button]:rounded-[7px] max-[760px]:[&_button_svg]:w-[12px] max-[760px]:[&_button_svg]:h-[12px]
          `)} aria-label="Pagination daftar data">
            <Button variant="outline" size="icon-lg" type="button" aria-label="Halaman pertama" disabled={currentPage === 1} onClick={() => setPage(1)}>
              <ChevronsLeft aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon-lg" type="button" aria-label="Halaman sebelumnya" disabled={currentPage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon-lg" type="button" aria-label="Halaman selanjutnya" disabled={currentPage === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>
              <ChevronRight aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon-lg" type="button" aria-label="Halaman terakhir" disabled={currentPage === totalPages} onClick={() => setPage(totalPages)}>
              <ChevronsRight aria-hidden="true" />
            </Button>
          </nav>
        </div>
      </CardFooter>
    </Card>
  )
}
