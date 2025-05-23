import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"

interface StatCardProps {
  title: string
  value: string
  icon: string
  percentChange: number
  previousPeriod: string
  valueColor?: string
  height?: number
  width?: number
}

export function StatCard({
  title,
  value,
  icon: Icon,
  percentChange,
  previousPeriod,
  valueColor = "text-primary",
  height = 30,
  width = 30,
}: StatCardProps) {
  const isPositive = percentChange >= 0
console.log("Icon", Icon);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <Image src={Icon} alt="" height={height} width={width}  />
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
