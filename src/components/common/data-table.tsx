import { useMemo, useState, type ReactNode } from "react"
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
import { cn } from "@/lib/utils"

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
    <Card className="parts-table-card overflow-hidden bg-white border border-[#e2e9eb] rounded-[12px] shadow-[0_9px_26px_#12344308] gap-0 p-0 ring-0" role="region" aria-label={title}>
      <CardHeader className="parts-table-card-head flex items-center justify-between p-[22px_24px] max-[760px]:p-[16px_18px] border-b border-[#e9eff0]">
        <div>
          <p className="parts-table-eyebrow m-0 mb-[6px] text-[#8498a2] text-[9px] font-black tracking-[1.6px] uppercase">{eyebrow}</p>
          <CardTitle className="parts-table-title m-0 text-[#1e3547] text-[18px] font-extrabold tracking-[-.035em]" role="heading" aria-level={2}>{title}</CardTitle>
        </div>
        <Badge variant="secondary" className="parts-total-badge h-auto p-[7px_10px] border-0 rounded-[6px] bg-[#e8f4ef] text-[#397d6c] text-[10px] font-extrabold leading-[1.2] whitespace-nowrap">
          {formatCount(data.length)} data
        </Badge>
      </CardHeader>

      <CardContent className="parts-table-scroll overflow-x-auto p-0">
        <Table className="parts-data-table w-full border-collapse max-[900px]:min-w-[1080px]">
          <TableHeader className="bg-[#f3f6f6]">
            <TableRow className="border-0 hover:bg-[#f3f6f6]">
              {columns.map((column) => {
                const active = sort?.key === column.key
                const SortIcon = active
                  ? sort?.direction === "asc" ? ArrowUp : ArrowDown
                  : ArrowUpDown

                return (
                  <TableHead
                    key={column.key}
                    aria-sort={active ? sort?.direction === "asc" ? "ascending" : "descending" : "none"}
                    className="h-[48px] px-[6px] xl:px-[12px] text-[#788d98] text-[9px] font-[850] tracking-[.55px] uppercase whitespace-nowrap first:pl-[14px] xl:first:pl-[20px] last:pr-[14px] xl:last:pr-[20px] border-0"
                  >
                    <button
                      className="parts-sort-button inline-flex items-center gap-[7px] py-[8px] border-0 bg-transparent text-inherit font-inherit tracking-inherit uppercase cursor-pointer hover:text-[#388d7c] focus-visible:text-[#388d7c] focus-visible:outline-2 focus-visible:outline-[#65aa91] focus-visible:outline-offset-[3px] focus-visible:rounded-[3px] [&_svg]:size-[13px] [&_svg]:opacity-65"
                      type="button"
                      onClick={() => handleSort(column.key)}
                    >
                      <span className="uppercase tracking-[.55px] font-[850]">{column.label}</span>
                      <SortIcon aria-hidden="true" />
                    </button>
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.length === 0 ? (
              <TableRow>
                <TableCell className="parts-empty-cell h-[160px] text-center whitespace-normal text-[#718692]" colSpan={columns.length}>
                  <strong className="block mb-[6px] text-[#334d5d] text-[13px] font-bold">Tidak ada data yang cocok</strong>
                  <span className="block text-[11px]">Coba ubah kata kunci atau kurangi filter yang aktif.</span>
                </TableCell>
              </TableRow>
            ) : pageRows.map((row) => (
              <TableRow key={getRowKey(row)} className="border-0 transition-colors hover:bg-[#f8fbfa]">
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={cn(
                      "h-[68px] px-[6px] xl:px-[12px] py-[12px] border-t border-[#edf1f1] text-[#4d6070] text-[11px] align-middle whitespace-nowrap first:pl-[14px] xl:first:pl-[20px] last:pr-[14px] xl:last:pr-[20px]",
                      column.cellClassName,
                    )}
                  >
                    {column.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="parts-table-footer flex items-center justify-between gap-[12px] p-[10px_14px] border-t border-[#e9eff0] rounded-none bg-white max-[760px]:flex-col max-[760px]:items-stretch max-[760px]:gap-[8px] max-[760px]:p-[9px_8px]">
        <div className="parts-pagination-size flex items-center gap-[9px] text-[#667b88] text-[11px] max-[760px]:justify-center max-[760px]:flex-nowrap max-[760px]:gap-[6px] max-[760px]:text-[9px]">
          <label htmlFor="parts-page-size" className="whitespace-nowrap">Tampilkan per halaman</label>
          <Select
            value={String(rowsPerPage)}
            onValueChange={(value) => {
              setRowsPerPage(Number(value))
              setPage(1)
            }}
          >
            <SelectTrigger id="parts-page-size" className="parts-page-size-select w-[86px] h-[34px] px-[10px] pr-[25px] border border-[#e8e1d8] rounded-[9px] bg-white text-[#405363] shadow-[0_2px_5px_#26384a12] cursor-pointer max-[760px]:w-[62px] max-[760px]:h-[26px] max-[760px]:px-[7px] max-[760px]:pr-[17px] max-[760px]:text-[10px] [&_svg]:max-[760px]:size-[12px]" size="sm"><SelectValue /></SelectTrigger>
            <SelectContent align="end" className="parts-select-content p-[4px] border border-[#dfe8e9] rounded-[6px] bg-white shadow-[0_8px_20px_#18304418]">
              {[10, 25, 50, 100].map((size) => <SelectItem className="parts-select-item min-h-[32px] rounded-none text-[#30495a] text-[12px] data-[highlighted]:bg-[#edf5f1] data-[highlighted]:text-[#214c42]" key={size} value={String(size)}>{size}</SelectItem>)}
            </SelectContent>
          </Select>
          <span className="parts-pagination-total flex items-center gap-[7px] pl-[10px] border-l border-[#e4e9eb] whitespace-nowrap max-[760px]:gap-[5px] max-[760px]:pl-[7px]"><i className="hidden" aria-hidden="true" />Total {formatCount(sortedRows.length)} data</span>
        </div>
        <div className="parts-pagination-controls flex items-center gap-[9px] text-[#667b88] text-[11px] max-[760px]:justify-center max-[760px]:w-full max-[760px]:gap-[7px]">
          <span className="parts-pagination-page whitespace-nowrap max-[760px]:text-[9px]">Halaman {formatCount(currentPage)} dari {formatCount(totalPages)}</span>
          <nav className="parts-pagination flex items-center gap-[5px] max-[760px]:gap-[4px]" aria-label="Pagination daftar data">
            <Button variant="outline" size="icon-lg" type="button" aria-label="Halaman pertama" disabled={currentPage === 1} onClick={() => setPage(1)} className="w-[32px] h-[32px] border-[#eee7dd] rounded-[9px] bg-white text-[#6f6659] shadow-[0_2px_5px_#26384a10] hover:not-disabled:bg-[#faf8f4] hover:not-disabled:text-[#27394a] disabled:opacity-[.48] max-[760px]:w-[24px] max-[760px]:h-[24px] max-[760px]:rounded-[7px] [&_svg]:max-[760px]:size-[12px]">
              <ChevronsLeft aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon-lg" type="button" aria-label="Halaman sebelumnya" disabled={currentPage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} className="w-[32px] h-[32px] border-[#eee7dd] rounded-[9px] bg-white text-[#6f6659] shadow-[0_2px_5px_#26384a10] hover:not-disabled:bg-[#faf8f4] hover:not-disabled:text-[#27394a] disabled:opacity-[.48] max-[760px]:w-[24px] max-[760px]:h-[24px] max-[760px]:rounded-[7px] [&_svg]:max-[760px]:size-[12px]">
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon-lg" type="button" aria-label="Halaman selanjutnya" disabled={currentPage === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="w-[32px] h-[32px] border-[#eee7dd] rounded-[9px] bg-white text-[#6f6659] shadow-[0_2px_5px_#26384a10] hover:not-disabled:bg-[#faf8f4] hover:not-disabled:text-[#27394a] disabled:opacity-[.48] max-[760px]:w-[24px] max-[760px]:h-[24px] max-[760px]:rounded-[7px] [&_svg]:max-[760px]:size-[12px]">
              <ChevronRight aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon-lg" type="button" aria-label="Halaman terakhir" disabled={currentPage === totalPages} onClick={() => setPage(totalPages)} className="w-[32px] h-[32px] border-[#eee7dd] rounded-[9px] bg-white text-[#6f6659] shadow-[0_2px_5px_#26384a10] hover:not-disabled:bg-[#faf8f4] hover:not-disabled:text-[#27394a] disabled:opacity-[.48] max-[760px]:w-[24px] max-[760px]:h-[24px] max-[760px]:rounded-[7px] [&_svg]:max-[760px]:size-[12px]">
              <ChevronsRight aria-hidden="true" />
            </Button>
          </nav>
        </div>
      </CardFooter>
    </Card>
  )
}
