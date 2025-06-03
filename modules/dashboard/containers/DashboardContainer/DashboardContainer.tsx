"use client";

import { useEffect, useState } from "react";
import { StatCard } from "../../components/stat-card";
import { DashboardCard } from "../../components/dashboard-card";
import InventoryDashboardContainer from "../InventoryDashboardContainer/InventoryDashboardContainer";
import ServiceDashboardContainer from "../ServiceDashboardContainer/ServiceDashboardContainer";
import CIPDashboardContainer from "../CIPDashboardContainer/CIPDashboardContainer";

export default function DashboardContainer() {
  const [selectedDashboard, setSelectedDashboard] = useState("automative");

  // useEffect(() => {
  //   const savedDashboard = localStorage.getItem("selectedDashboard");
  //   if (savedDashboard) {
  //     setSelectedDashboard(savedDashboard);
  //   }
  // }, []);

  const renderDashboard = () => {
    switch (selectedDashboard) {
      case "inventory":
        return <InventoryDashboardContainer />;
      case "service":
        return <ServiceDashboardContainer />;
        case "cip":
        return <CIPDashboardContainer />;
      default:
        return (
          <div className="flex min-h-screen flex-col">
            <main className="flex-1 p-4 md:p-6 ">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-brand">
                  Automotive Dashboard
                </h1>
                <p className="text-base text-muted-foreground ">
                  Welcome to CrainVision. Your automotive intelligence platform.
                </p>
              </div>

              <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Total Vehicle Sales"
                  value="1,284"
                  icon={"/svgs/car.svg"}
                  percentChange={14}
                  previousPeriod="Previous month"
                  valueColor="text-brand"
                  height={40}
                  width={40}
                />
                <StatCard
                  title="Service Revenue"
                  value="$842,589"
                  icon={"/svgs/service.svg"}
                  percentChange={15.2}
                  previousPeriod="Previous month"
                  valueColor="text-brand"
                  height={28}
                  width={28}
                />
                <StatCard
                  title="Gross Profit"
                  value="$3.2M"
                  icon={"/svgs/gross.svg"}
                  percentChange={-2.5}
                  previousPeriod="Previous month"
                  valueColor="text-brand"
                  height={30}
                  width={30}
                />
                <StatCard
                  title="Customer Satisfaction"
                  value="94.2%"
                  icon={"/svgs/satisfaction.svg"}
                  percentChange={1.1}
                  previousPeriod="Previous month"
                  valueColor="text-brand"
                  height={35}
                  width={35}
                />
              </div>

              <div className="mb-4">
                <h2 className="text-xl font-bold">Services</h2>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                  title="Vehicle Sales"
                  description="New and used vehicle sales performance"
                  icon={"svgs/s-car.svg"}
                  height={70}
                  width={70}
                />
                <DashboardCard
                  title="Service Department"
                  description="Service appointments and revenue"
                  icon={"svgs/s-rench.svg"}
                  height={70}
                  width={70}
                />
                <DashboardCard
                  title="Parts Inventory"
                  description="Parts stock levels and orders"
                  icon={"/svgs/system.svg"}
                  height={70}
                  width={70}
                />
                <DashboardCard
                  title="Dealerships"
                  description="Dealership performance and comparison"
                  icon={"svgs/home.svg"}
                  height={70}
                  width={70}
                />
                <DashboardCard
                  title="Customer CRM"
                  description="Customer relationship management"
                  icon={"/svgs/people.svg"}
                  height={70}
                  width={70}
                />
                <DashboardCard
                  title="Financial Performance"
                  description="Revenue, expenses and profitability"
                  icon={"/svgs/doller.svg"}
                  height={70}
                  width={70}
                />
                <DashboardCard
                  title="Market Analysis"
                  description="Industry trends and market share"
                  icon={"/svgs/s-wave.svg"}
                  height={70}
                  width={70}
                />
                <DashboardCard
                  title="Fleet Management"
                  description="Fleet sales and management"
                  icon={"/svgs/s-truck.svg"}
                  height={70}
                  width={70}
                />
              </div>
            </main>
          </div>
        );
    }
  };

  return <div className="flex min-h-screen flex-col">{renderDashboard()}</div>;
}
