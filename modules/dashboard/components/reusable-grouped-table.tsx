"use client"
import {
  useReactTable,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  type ColumnDef,
  type Row,
} from "@tanstack/react-table"
import type { ExpandedState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"

interface GroupedTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  groupBy?: string
  onRowClick?: (row: Row<T>) => void
}

export function GroupedTable<T>({ data, columns, groupBy, onRowClick }: GroupedTableProps<T>) {
  const [grouping, setGrouping] = useState<string[]>(groupBy ? [groupBy] : [])
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      grouping,
      expanded,
    },
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    enableGrouping: true,
  })

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-brand text-white hover:bg-brand">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.flatMap((row, index) => {
            const isGroup = row.getIsGrouped()
            const subHeader = (
              <TableRow
                key={`subheader-${row.id}`}
                className="bg-muted/10 font-semibold text-sm text-muted-foreground"
              >
                {row.getVisibleCells().map((cell, idx) => {
                  const colId = cell.column.id
                  let label = ""

                  switch (colId) {
                    case "customerNumber":
                      label = "Customer #"
                      break
                    case "customerName":
                      label = "Customer Name"
                      break
                    case "notes":
                      label = "Notes"
                      break
                    case "age":
                      label = "Age"
                      break
                    case "count":
                      label = ""
                      break
                    case "numericAmount":
                      label = "Total Amount"
                      break
                    case "numericDays1To7":
                      label = "1-7 Days"
                      break
                    case "numericDays8To14":
                      label = "8-14 Days"
                      break
                    case "numericDays15Plus":
                      label = "15+ Days"
                      break
                    default:
                      label = ""
                  }

                  return <TableCell key={`subheader-cell-${row.id}-${idx}`}>{label}</TableCell>
                })}
              </TableRow>
            )

            return [
              <TableRow
                key={`row-${row.id}`}
                className={`${row.getIsGrouped()
                    ? "bg-muted/50 font-medium cursor-pointer hover:bg-muted/70"
                    : "hover:bg-muted/30"
                  } ${index % 2 === 1 ? "bg-brand-muted" : "bg-background"}`}
                onClick={() => {
                  if (row.getIsGrouped()) {
                    row.toggleExpanded()
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    onClick={() => {
                      if (!row.getIsGrouped() && cell.column.id === "customerNumber" && onRowClick) {
                        onRowClick(row)
                      }
                    }}
                    className={cell.column.id === "customerNumber" ? "text-blue-600 underline cursor-pointer" : ""}
                  >
                    {cell.getIsGrouped() ? (
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                          {row.getIsExpanded() ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())} ({row.subRows.length})
                      </div>
                    ) : cell.getIsAggregated() ? (
                      flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())
                    ) : cell.getIsPlaceholder() ? null : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>,
              ...(row.getIsGrouped() && row.getIsExpanded() ? [subHeader] : [])
            ]
          })}
        </TableBody>
      </Table>
    </Card>
  )
}
