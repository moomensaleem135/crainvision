import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardWelcome } from "@/components/dashboard-welcome"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardWelcome />
      <DashboardCards />
    </div>
  )
}
