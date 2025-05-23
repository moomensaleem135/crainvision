import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  percentChange: number
  previousPeriod: string
  iconColor?: string
  valueColor?: string
}

export function StatCard({
  title,
  value,
  icon: Icon,
  percentChange,
  previousPeriod,
  iconColor = "text-primary",
  valueColor = "text-primary",
}: StatCardProps) {
  const isPositive = percentChange >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        <div className="mt-1 flex items-center text-xs">
          <span className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? "↑" : "↓"} {Math.abs(percentChange)}%
          </span>
          <span className="ml-1 text-muted-foreground">vs. {previousPeriod}</span>
        </div>
      </CardContent>
    </Card>
  )
}
