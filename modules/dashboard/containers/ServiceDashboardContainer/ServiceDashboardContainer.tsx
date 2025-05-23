"use client"

import { Calendar, Clock, DollarSign, Star } from "lucide-react"
import { ServiceStatCard } from "../../components/service-stat-card"
import { ServiceRevenueChart } from "../../components/service-revenue-chart"
import { ServiceAppointmentsTable } from "../../components/service-appointments-table"

export default function ServiceDashboardContainer() {
  return (
    <main className="flex-1 p-4 md:p-6 overflow-hidden">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-purple-600">Service Department Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Monitor service operations, appointments, and technician performance
        </p>
      </div>

      <div className="mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <ServiceStatCard
          title="Today's Appointments"
          value="47"
          icon={Calendar}
          percentChange={1}
          previousPeriod="yesterday"
          iconColor="text-purple-500"
          valueColor="text-purple-600"
          trend="up"
        />
        <ServiceStatCard
          title="Service Revenue"
          value="$842,589"
          icon={DollarSign}
          percentChange={15.2}
          previousPeriod="Previous month"
          iconColor="text-purple-500"
          valueColor="text-purple-600"
          trend="up"
        />
        <ServiceStatCard
          title="Avg. Service Time"
          value="2.4h"
          icon={Clock}
          percentChange={2}
          previousPeriod="last month"
          iconColor="text-purple-500"
          valueColor="text-purple-600"
          trend="down"
        />
        <ServiceStatCard
          title="Customer Satisfaction"
          value="4.8/5"
          icon={Star}
          percentChange={1}
          previousPeriod="Previous month"
          iconColor="text-purple-500"
          valueColor="text-purple-600"
          trend="up"
        />
      </div>

      <div className="grid gap-6">
        <ServiceRevenueChart />
        <div className="overflow-hidden">
          <ServiceAppointmentsTable />
        </div>
      </div>
    </main>
  )
}
