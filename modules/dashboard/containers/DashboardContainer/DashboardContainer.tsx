"use client"

import { Car, Users, Wrench, Building2, UserRound, DollarSign, LineChart, Truck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { StatCard } from "../../components/stat-card"
import { DashboardCard } from "../../components/dashboard-card"
import { NotificationsSidebar } from "../../components/notification-sidebar"

export default function DashboardContainer() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
       <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex-1"></div>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Dashboard"
            className="w-full border-gray-200 pl-9 pr-4 py-2 rounded-md"
          />
        </div>
        <div className="flex items-center gap-4 ml-4 flex-1 justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative"
            onClick={() => setNotificationsOpen(true)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <span className="sr-only">Toggle theme</span>
          </Button>
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img src="/diverse-avatars.png" alt="User avatar" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-purple-600">Automotive Dashboard</h1>
          <p className="text-muted-foreground">Welcome to CrainVision. Your automotive intelligence platform.</p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Vehicle Sales"
            value="1,284"
            icon={Car}
            percentChange={14}
            previousPeriod="Previous month"
            iconColor="text-blue-500"
            valueColor="text-blue-600"
          />
          <StatCard
            title="Service Revenue"
            value="$842,589"
            icon={Wrench}
            percentChange={15.2}
            previousPeriod="Previous month"
            iconColor="text-purple-500"
            valueColor="text-purple-600"
          />
          <StatCard
            title="Gross Profit"
            value="$3.2M"
            icon={DollarSign}
            percentChange={-2.5}
            previousPeriod="Previous month"
            iconColor="text-blue-500"
            valueColor="text-blue-600"
          />
          <StatCard
            title="Customer Satisfaction"
            value="94.2%"
            icon={Users}
            percentChange={1.1}
            previousPeriod="Previous month"
            iconColor="text-purple-500"
            valueColor="text-purple-600"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold">Choose Dashboards</h2>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Vehicle Sales"
            description="New and used vehicle sales performance"
            icon={Car}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <DashboardCard
            title="Service Department"
            description="Service appointments and revenue"
            icon={Wrench}
            iconColor="text-red-600"
            iconBgColor="bg-red-100"
          />
          <DashboardCard
            title="Parts Inventory"
            description="Parts stock levels and orders"
            icon={Car}
            iconColor="text-amber-600"
            iconBgColor="bg-amber-100"
          />
          <DashboardCard
            title="Dealerships"
            description="Dealership performance and comparison"
            icon={Building2}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <DashboardCard
            title="Customer CRM"
            description="Customer relationship management"
            icon={UserRound}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <DashboardCard
            title="Financial Performance"
            description="Revenue, expenses and profitability"
            icon={DollarSign}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <DashboardCard
            title="Market Analysis"
            description="Industry trends and market share"
            icon={LineChart}
            iconColor="text-cyan-600"
            iconBgColor="bg-cyan-100"
          />
          <DashboardCard
            title="Fleet Management"
            description="Fleet sales and management"
            icon={Truck}
            iconColor="text-slate-600"
            iconBgColor="bg-slate-100"
          />
        </div>
      </main>

      {/* Notifications Sidebar */}
      <NotificationsSidebar open={notificationsOpen} onOpenChange={setNotificationsOpen} />
    </div>
  )
}
