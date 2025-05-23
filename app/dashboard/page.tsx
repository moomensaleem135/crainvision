
import { DashboardSidebar } from "@/modules/dashboard/components/dashboard-sidebar"
import { DashboardContainer } from "@/modules/dashboard/containers/containers"
import DashbaordLayout from "./layout"

export default function DashboardPage() {
  return (

    <div className="flex min-h-screen">
      <DashboardSidebar />
      <DashbaordLayout><DashboardContainer /></DashbaordLayout>
    </div>
  )
}
