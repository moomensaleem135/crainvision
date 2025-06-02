"use client"

import type { ColumnDef } from "@tanstack/react-table"

export interface Customer {
  customerNumber: string
  customerName: string
  notes: string
  dealerName: string
  age: number
  count: number
  amount: number
  days1To7: number
  days8To14: number
  days15Plus: number
  bankName: string
  dealDate: string
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
    header: "Customer #",
    cell: ({ getValue }) => getValue(),
    aggregatedCell: () => "", // Empty for grouped rows
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ getValue }) => getValue(),
    aggregatedCell: () => "", // Empty for grouped rows
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ getValue }) => getValue(),
    aggregatedCell: ({ row }) => {
      // Calculate TOTAL age for the group (sum, not average)
      const subRows = row.subRows
      if (subRows.length === 0) return ""
      const totalAge = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).age, 0)
      return totalAge
    },
  },
  {
    accessorKey: "count",
    header: "Count",
    cell: ({ getValue }) => getValue(),
    aggregatedCell: ({ row }) => {
      // Calculate total count for the group
      const subRows = row.subRows
      if (subRows.length === 0) return ""
      const totalCount = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).count, 0)
      return totalCount
    },
  },
  {
    accessorKey: "amount",
    header: "Total Amount",
    cell: ({ getValue }) => {
      const amount = getValue() as number
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)
    },
    aggregatedCell: ({ row }) => {
      // Calculate total amount for the group
      const subRows = row.subRows
      if (subRows.length === 0) return ""
      const total = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).amount, 0)
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(total)
    },
  },
  {
    accessorKey: "days1To7",
    header: "1-7 Days",
    cell: ({ getValue }) => {
      const amount = getValue() as number
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)
    },
    aggregatedCell: ({ row }) => {
      const subRows = row.subRows
      if (subRows.length === 0) return ""
      const total = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).days1To7, 0)
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(total)
    },
  },
  {
    accessorKey: "days8To14",
    header: "8-14 Days",
    cell: ({ getValue }) => {
      const amount = getValue() as number
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)
    },
    aggregatedCell: ({ row }) => {
      const subRows = row.subRows
      if (subRows.length === 0) return ""
      const total = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).days8To14, 0)
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(total)
    },
  },
  {
    accessorKey: "days15Plus",
    header: "15+ Days",
    cell: ({ getValue }) => {
      const amount = getValue() as number
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)
    },
    aggregatedCell: ({ row }) => {
      const subRows = row.subRows
      if (subRows.length === 0) return ""
      const total = subRows.reduce((sum, subRow) => sum + (subRow.original as Customer).days15Plus, 0)
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(total)
    },
  },
]
