import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface ServiceStatCardProps {
  title: string
  value: string
  icon: LucideIcon
  percentChange?: number
  previousPeriod?: string
  iconColor?: string
  valueColor?: string
  trend?: "up" | "down" | "neutral"
}

export function ServiceStatCard({
  title,
  value,
  icon: Icon,
  percentChange,
  previousPeriod,
  iconColor = "text-purple-500",
  valueColor = "text-purple-600",
  trend = "neutral",
}: ServiceStatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">{title}</p>
            <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
            {percentChange !== undefined && (
              <div className="flex items-center space-x-1">
                <span
                  className={`text-xs ${trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500"}`}
                >
                  {trend === "up" ? "↑" : trend === "down" ? "↓" : ""} {Math.abs(percentChange)}% vs {previousPeriod}
                </span>
              </div>
            )}
          </div>
          <div className={`p-2 rounded-full ${iconColor === "text-purple-500" ? "bg-purple-100" : "bg-blue-100"}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
