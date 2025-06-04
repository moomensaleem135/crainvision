"use client"

import type { ColumnDef } from "@tanstack/react-table"

export interface Customer {
  customerNumber: string
  customerName: string
  dealerName: string
  age: number
  count: number
  bankName: string | null
  dealDate: string
  numericDays1To7: number
  numericDays8To14: number
  numericDays15Plus: number
  numericAmount: number
  days1To7: string
  days8To14: string
  days15Plus: string
  amount: string
}

const formatCurrencyWithParens = (value: number) => {
  const abs = Math.abs(value)
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(abs)

  return value < 0 ? `(${formatted})` : formatted
}

export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "dealerName",
    header: "Dealer Name",
    cell: ({ row, getValue }) => {
      return <div className="font-medium">{getValue() as string}</div>
    },
    enableGrouping: true,
  },
  {
    accessorKey: "customerNumber",
    header: () => null,
    cell: ({ getValue }) => getValue(),
    aggregatedCell: () => "",
  },
  {
    accessorKey: "customerName",
    header: () => null,
    cell: ({ getValue }) => getValue(),
    aggregatedCell: () => "",
  },
  // {
  //   accessorKey: "notes",
  //   header: () => null, // Hides from main header
  //   cell: ({ row }) => {
  //     // Only show button on sub-rows (not group rows)
  //     if (row.getIsGrouped()) return null
  
  //     return (
  //       <button
  //         className="text-blue-600 underline hover:text-blue-800 text-sm"
  //         onClick={() => {
  //           const customer = row.original as Customer
  //           alert(`Add Note for ${customer.customerName} (${customer.customerNumber})`)
  //           // Or trigger a modal, toast, drawer, etc.
  //         }}
  //       >
  //         Add Note
  //       </button>
  //     )
  //   },
  //   aggregatedCell: () => "",
  // },
  {
    accessorKey: "notes",
    header: () => null,
    cell: ({ row }) => {
      if (row.getIsGrouped()) return null
      const customer = row.original as Customer
  
      return (
        <button
          className="text-blue-600 underline hover:text-blue-800 text-sm"
          onClick={() => {
            if (typeof window !== "undefined") {
              const event = new CustomEvent("open-note-modal", { detail: customer.customerNumber })
              window.dispatchEvent(event)
            }
          }}
        >
          Add Note
        </button>
      )
    },
    aggregatedCell: () => "",
  },  
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ getValue }) => getValue(),
    aggregatedCell: ({ row }) => {
      const subRows = row.subRows
      if (subRows.length === 0) return ""
      const totalAge = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).age, 0)
      return totalAge
    },
  },
  // {
  //   accessorKey: "count",
  //   header: "Count",
  //   cell: ({ getValue }) => getValue(),
  //   aggregatedCell: ({ row }) => {
  //     const subRows = row.subRows
  //     if (subRows.length === 0) return ""
  //     const totalCount = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).count, 0)
  //     return totalCount
  //   },
  // },
  {
    accessorKey: "count",
    header: "Count",
    cell: ({ row }) => {
      // Hide value for individual rows (non-grouped)
      return row.getIsGrouped() ? null : ""
    },
    aggregatedCell: ({ row }) => {
      const subRows = row.subRows
      if (subRows.length === 0) return ""
      const totalCount = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).count, 0)
      return totalCount
    },
  },
  
  {
    accessorKey: "numericAmount",
    header: "Total Amount",
    cell: ({ getValue }) => formatCurrencyWithParens(getValue() as number),
    aggregatedCell: ({ row }) => {
      const subRows = row.subRows
      if (subRows.length === 0) return ""
      const total = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).numericAmount, 0)
      return formatCurrencyWithParens(total)
    },
  },
  {
    accessorKey: "numericDays1To7",
    header: "1-7 Days",
    cell: ({ getValue }) => formatCurrencyWithParens(getValue() as number),
    aggregatedCell: ({ row }) => {
      const subRows = row.subRows
      if (subRows.length === 0) return ""
      const total = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).numericDays1To7, 0)
      return formatCurrencyWithParens(total)
    },
  },
  {
    accessorKey: "numericDays8To14",
    header: "8-14 Days",
    cell: ({ getValue }) => formatCurrencyWithParens(getValue() as number),
    aggregatedCell: ({ row }) => {
      const subRows = row.subRows
      if (subRows.length === 0) return ""
      const total = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).numericDays8To14, 0)
      return formatCurrencyWithParens(total)
    },
  },
  {
    accessorKey: "numericDays15Plus",
    header: "15+ Days",
    cell: ({ getValue }) => formatCurrencyWithParens(getValue() as number),
    aggregatedCell: ({ row }) => {
      const subRows = row.subRows
      if (subRows.length === 0) return ""
      const total = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).numericDays15Plus, 0)
      return formatCurrencyWithParens(total)
    },
  },
]
