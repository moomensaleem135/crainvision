import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface InventoryStatCardProps {
  title: string
  value: string
  icon: LucideIcon
  percentChange?: number
  previousPeriod?: string
  iconColor?: string
  valueColor?: string
}

export function InventoryStatCard({
  title,
  value,
  icon: Icon,
  percentChange,
  previousPeriod,
  iconColor = "text-purple-500",
  valueColor = "text-purple-600",
}: InventoryStatCardProps) {
  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 md:space-y-2">
            <p className="text-xs md:text-sm font-medium text-muted-foreground">{title}</p>
            <p className={`text-xl md:text-2xl font-bold ${valueColor}`}>{value}</p>
            {percentChange !== undefined && (
              <div className="flex items-center space-x-1">
                <span className={`text-xs ${percentChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {percentChange >= 0 ? "↗" : "↘"} {Math.abs(percentChange)}%
                </span>
                <span className="text-xs text-muted-foreground">vs {previousPeriod}</span>
              </div>
            )}
          </div>
          <div className={`p-2 md:p-3 rounded-full bg-purple-100 ${iconColor}`}>
            <Icon className="h-5 w-5 md:h-6 md:w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
