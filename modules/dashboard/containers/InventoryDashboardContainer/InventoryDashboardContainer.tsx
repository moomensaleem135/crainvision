"use client"

import { Package, Clock, TrendingUp, DollarSign } from "lucide-react"
import { InventoryStatCard } from "../../components/inventory-stat-card"
import { InventoryAgeChart } from "../../components/inventory-age-chart"
import { InventoryStockTable } from "../../components/inventory-stock-table"

export default function InventoryDashboardContainer() {
  return (
    <main className="flex-1 p-4 md:p-6 max-w-full">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-purple-600">Inventory Management Dashboard</h1>
        <p className="text-sm text-muted-foreground">Track vehicle inventory, stock levels, and aging analysis</p>
      </div>

      <div className="mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <InventoryStatCard
          title="Total Inventory"
          value="2,847"
          icon={Package}
          percentChange={10}
          previousPeriod="Previous month"
          iconColor="text-blue-500"
          valueColor="text-blue-600"
        />
        <InventoryStatCard
          title="Avg Days in Stock"
          value="45"
          icon={Clock}
          percentChange={-5}
          previousPeriod="Previous month"
          iconColor="text-orange-500"
          valueColor="text-orange-600"
        />
        <InventoryStatCard
          title="Incoming Vehicles"
          value="187"
          icon={TrendingUp}
          percentChange={15}
          previousPeriod="Previous month"
          iconColor="text-green-500"
          valueColor="text-green-600"
        />
        <InventoryStatCard
          title="Inventory Value"
          value="$98.4M"
          icon={DollarSign}
          percentChange={8}
          previousPeriod="Previous month"
          iconColor="text-purple-500"
          valueColor="text-purple-600"
        />
      </div>

      <div className="grid gap-6">
        <InventoryAgeChart />
        <InventoryStockTable />
      </div>
    </main>
  )
}
