import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface DashboardCardProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor?: string
  iconBgColor?: string
}

export function DashboardCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
}: DashboardCardProps) {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-base font-medium">{title}</h3>
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBgColor}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
