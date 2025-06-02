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
        <TableHeader >
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
          {table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={row.id}
              className={`${ row.getIsGrouped() ? "bg-muted/50 font-medium cursor-pointer hover:bg-muted/70" : "cursor-pointer hover:bg-muted/30"} ${index % 2 === 1 ? "bg-brand-muted" : "bg-background"} ` }
              onClick={() => {
                if (row.getIsGrouped()) {
                  row.toggleExpanded()
                } else if (onRowClick) {
                  onRowClick(row)
                }
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
