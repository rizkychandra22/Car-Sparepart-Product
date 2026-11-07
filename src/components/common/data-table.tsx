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
    <Card className="parts-table-card gap-0 py-0 ring-0" role="region" aria-label={title}>
      <CardHeader className="parts-table-card-head">
        <div>
          <p className="parts-table-eyebrow">{eyebrow}</p>
          <CardTitle className="parts-table-title" role="heading" aria-level={2}>{title}</CardTitle>
        </div>
        <Badge variant="secondary" className="parts-total-badge">{formatCount(data.length)} data</Badge>
      </CardHeader>

      <CardContent className="parts-table-scroll p-0">
        <Table className="parts-data-table">
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
                    <button className="parts-sort-button" type="button" onClick={() => handleSort(column.key)}>
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
                <TableCell className="parts-empty-cell" colSpan={columns.length}>
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

      <CardFooter className="parts-table-footer">
        <div className="parts-pagination-size">
          <label htmlFor="parts-page-size">Tampilkan per halaman</label>
          <Select
            value={String(rowsPerPage)}
            onValueChange={(value) => {
              setRowsPerPage(Number(value))
              setPage(1)
            }}
          >
            <SelectTrigger id="parts-page-size" className="parts-page-size-select" size="sm"><SelectValue /></SelectTrigger>
            <SelectContent align="end" className="parts-select-content">
              {[10, 25, 50, 100].map((size) => <SelectItem className="parts-select-item" key={size} value={String(size)}>{size}</SelectItem>)}
            </SelectContent>
          </Select>
          <span className="parts-pagination-total"><i aria-hidden="true" />Total {formatCount(sortedRows.length)} data</span>
        </div>
        <div className="parts-pagination-controls">
          <span className="parts-pagination-page">Halaman {formatCount(currentPage)} dari {formatCount(totalPages)}</span>
          <nav className="parts-pagination" aria-label="Pagination daftar data">
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
