"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "JAN", labor: 10000, parts: 8000, warranty: 5000 },
  { name: "FEB", labor: 15000, parts: 12000, warranty: 7000 },
  { name: "MAR", labor: 25000, parts: 18000, warranty: 12000 },
  { name: "APR", labor: 35000, parts: 22000, warranty: 15000 },
  { name: "MAY", labor: 30000, parts: 20000, warranty: 13000 },
  { name: "JUN", labor: 27000, parts: 18000, warranty: 11000 },
  { name: "JUL", labor: 22000, parts: 15000, warranty: 9000 },
  { name: "AUG", labor: 19000, parts: 13000, warranty: 8000 },
  { name: "SEP", labor: 23000, parts: 17000, warranty: 10000 },
  { name: "OCT", labor: 28000, parts: 20000, warranty: 12000 },
  { name: "NOV", labor: 33000, parts: 23000, warranty: 14000 },
  { name: "DEC", labor: 28000, parts: 19000, warranty: 11000 },
]

export function ServiceRevenueChart() {
  return (
    <Card className="col-span-full">
      <CardContent className="p-0">
        <div className="px-6 pt-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-purple-600">Service Revenue Trend</h3>
              <p className="text-sm text-muted-foreground">Monthly service revenue over the last 12 months</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-[#7B57E0]"></div>
                <span className="text-xs">Labor</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-black"></div>
                <span className="text-xs">Parts</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-[#FFA500]"></div>
                <span className="text-xs">Warranty</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                dy={10}
                tick={{ fontSize: 12, fill: "#6B7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                width={60}
                tickFormatter={(value) => {
                  if (value === 0) return "0"
                  if (value >= 1000) return `$${value / 1000}K`
                  return `$${value}`
                }}
                tickMargin={5}
              />
              <Tooltip formatter={(value) => [`$${value}`, ""]} labelFormatter={(label) => `${label}`} />
              <Line
                type="monotone"
                dataKey="labor"
                stroke="#7B57E0"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                name="Labor"
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="parts"
                stroke="#333333"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                name="Parts"
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="warranty"
                stroke="#FFA500"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                name="Warranty"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
