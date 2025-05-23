"use client"

import { Car, Users, Wrench, Building2, UserRound, DollarSign, LineChart, Truck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { StatCard } from "../../components/stat-card"
import { DashboardCard } from "../../components/dashboard-card"
import { NotificationsSidebar } from "../../components/notification-sidebar"
import Image from "next/image"

export default function DashboardContainer() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
       <header className="flex h-16 items-center justify-between  bg-background px-4 md:px-6 py-10">
        <div className="flex-1"></div>
        <div className="relative w-full max-w-2xl">
          <Image src={'/svgs/search.svg'} alt="" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" height={20} width={20}/>
          <Input
            type="search"
            placeholder="Search Dashboard"
            className="w-full border-gray-200 pl-9 pr-4 py-1 rounded-md h-14"
          />
        </div>
        <div className="flex items-center gap-4 ml-4 flex-1 justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="border relative"
            onClick={() => setNotificationsOpen(true)}
          >
            <Image src={'/svgs/noti.svg'} alt="" height={25} width={25}  />
         
          </Button>
          <Button variant="ghost" size="icon" className="border">
          <Image src={'/svgs/brightness.svg'} alt="" height={25} width={25} />
          </Button>
          <div className=" overflow-hidden rounded-full cursor-pointer">
            <Image src={'/svgs/ellipse.svg'}  alt="User avatar"  height={25} width={25} className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 ">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-[#7B57E0]">Automotive Dashboard</h1>
          <p className="text-base text-muted-foreground ">Welcome to CrainVision. Your automotive intelligence platform.</p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Vehicle Sales"
            value="1,284"
            icon={'/svgs/car.svg'}
            percentChange={14}
            previousPeriod="Previous month"
            valueColor="text-[#7B57E0]"
            height={40}
            width={40}
          />
          <StatCard
            title="Service Revenue"
            value="$842,589"
            icon={'/svgs/service.svg'}
            percentChange={15.2}
            previousPeriod="Previous month"
            valueColor="text-[#7B57E0]"
            height={28}
            width={28}
          />
          <StatCard
            title="Gross Profit"
            value="$3.2M"
            icon={'/svgs/gross.svg'}
            percentChange={-2.5}
            previousPeriod="Previous month"
            valueColor="text-[#7B57E0]"
            height={30}
            width={30}
          />
          <StatCard
            title="Customer Satisfaction"
            value="94.2%"
            icon={'/svgs/satisfaction.svg'}
            percentChange={1.1}
            previousPeriod="Previous month"
            valueColor="text-[#7B57E0]"
            height={35}
            width={35}
          />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold">Services</h2>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Vehicle Sales"
            description="New and used vehicle sales performance"
            icon={'svgs/s-car.svg'}
            height={70}
            width={70}
          />
          <DashboardCard
            title="Service Department"
            description="Service appointments and revenue"
            icon={'svgs/s-rench.svg'}
             height={70}
            width={70}
          />
          <DashboardCard
            title="Parts Inventory"
            description="Parts stock levels and orders"
            icon={'/svgs/system.svg'}
             height={70}
            width={70}
          />
          <DashboardCard
            title="Dealerships"
            description="Dealership performance and comparison"
            icon={'svgs/home.svg'}
             height={70}
            width={70}
          />
          <DashboardCard
            title="Customer CRM"
            description="Customer relationship management"
            icon={'/svgs/people.svg'}
             height={70}
            width={70}
          />
          <DashboardCard
            title="Financial Performance"
            description="Revenue, expenses and profitability"
            icon={'/svgs/doller.svg'}
             height={70}
            width={70}
          />
          <DashboardCard
            title="Market Analysis"
            description="Industry trends and market share"
            icon={'/svgs/s-wave.svg'}
             height={70}
            width={70}
          />
          <DashboardCard
            title="Fleet Management"
            description="Fleet sales and management"
            icon={'/svgs/s-truck.svg'}
              height={70}
            width={70}
          />
        </div>
      </main>

      {/* Notifications Sidebar */}
      <NotificationsSidebar open={notificationsOpen} onOpenChange={setNotificationsOpen} />
    </div>
  )
}
