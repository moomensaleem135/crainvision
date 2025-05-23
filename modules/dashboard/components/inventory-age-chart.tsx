"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "0-15 DAYS", value: 650 },
  { name: "16-30 DAYS", value: 1050 },
  { name: "31-45 DAYS", value: 520 },
  { name: "46-60 DAYS", value: 1100 },
  { name: "61-90 DAYS", value: 780 },
  { name: "90+ DAYS", value: 980 },
]

export function InventoryAgeChart() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-600">Inventory Age Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">Number of vehicles by days in inventory</p>
      </CardHeader>
      <CardContent>
        <div className="h-60 md:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 5 }} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => {
                  // On small screens, abbreviate the labels
                  if (window.innerWidth < 500) {
                    return value.split(" ")[0] // Just show the days number
                  }
                  return value
                }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#7B57E0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
